const { conn_sql } = require("./config/connection");

const columnsToAdd = [
  { name: "job_category", definition: "VARCHAR(255) NULL" },
  { name: "job_subcategory", definition: "VARCHAR(255) NULL" },
  { name: "workplace_type", definition: "VARCHAR(100) NULL" },
  { name: "Rate", definition: "VARCHAR(100) NULL" },
  { name: "Email", definition: "VARCHAR(255) NULL" },
  { name: "Url", definition: "VARCHAR(255) NULL" },
  { name: "Phone", definition: "VARCHAR(100) NULL" },
  { name: "expiry_date", definition: "DATE NULL" },
  { name: "ApplyType", definition: "VARCHAR(100) NULL" },
  { name: "province", definition: "VARCHAR(255) NULL" },
  { name: "city", definition: "VARCHAR(255) NULL" },
  // Internship-only detail fields (job_type = "Internship"). NULL for
  // every other job type.
  { name: "internship_type", definition: "VARCHAR(20) NULL" },
  { name: "internship_purpose", definition: "VARCHAR(20) NULL" },
  { name: "internship_duration", definition: "VARCHAR(10) NULL" },
  { name: "internship_duration_unit", definition: "VARCHAR(10) NULL" },
  { name: "internship_certificate", definition: "VARCHAR(5) NULL" }
];

const companyColumnsToAdd = [
  { name: "is_linkedin_verified", definition: "TINYINT(1) DEFAULT 0" },
  { name: "linkedin_company_id", definition: "VARCHAR(100) DEFAULT NULL" },
  { name: "linkedin_verified_at", definition: "DATETIME DEFAULT NULL" },
  { name: "is_email_verified", definition: "TINYINT(1) DEFAULT 0" },
  { name: "email_verification_token", definition: "VARCHAR(255) DEFAULT NULL" },
  { name: "status_delete", definition: "TINYINT(1) DEFAULT 1" },
  { name: "province", definition: "VARCHAR(255) DEFAULT NULL" },
  { name: "city", definition: "VARCHAR(255) DEFAULT NULL" },
  { name: "Ntn", definition: "VARCHAR(100) DEFAULT NULL" },
  { name: "founded_in", definition: "VARCHAR(100) DEFAULT NULL" },
  { name: "status", definition: "VARCHAR(100) DEFAULT 'Pending'" }
];

async function queryPromise(sql, params = []) {
  return new Promise((resolve, reject) => {
    conn_sql.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

async function migrateSchema() {
  console.log("Checking database schema for missing columns...");
  
  // 1. Migrate Jobs
  const jobsFields = await queryPromise("DESCRIBE `jobs`");
  const existingJobsColumns = jobsFields.map(f => f.Field);
  
  for (const col of columnsToAdd) {
    if (!existingJobsColumns.includes(col.name)) {
      console.log(`Adding missing column to jobs: ${col.name}`);
      await queryPromise(`ALTER TABLE \`jobs\` ADD COLUMN \`${col.name}\` ${col.definition}`);
    }
  }

  // 2. Migrate Companies
  const companyFields = await queryPromise("DESCRIBE `companies`");
  const existingCompanyColumns = companyFields.map(f => f.Field);
  
  for (const col of companyColumnsToAdd) {
    if (!existingCompanyColumns.includes(col.name)) {
      console.log(`Adding missing column to companies: ${col.name}`);
      await queryPromise(`ALTER TABLE \`companies\` ADD COLUMN \`${col.name}\` ${col.definition}`);
    }
  }

  // 2b. Phone/contact numbers were stored as INT, which silently clamps any
  // value over 2,147,483,647 (and can't hold a leading "0") to that exact
  // number instead of erroring - e.g. "03117305346" overflows and gets
  // stored as 2147483647. Convert both columns to VARCHAR so real phone
  // numbers survive intact. This does not recover values that already got
  // clamped - those accounts will need to re-enter their phone number.
  const userAccountsFields = await queryPromise("DESCRIBE `user_accounts`");
  const phoneFieldInfo = userAccountsFields.find(f => f.Field === "phone");
  if (phoneFieldInfo && phoneFieldInfo.Type.toLowerCase().includes("int")) {
    console.log("Modifying phone column type in user_accounts to VARCHAR(20)...");
    await queryPromise("ALTER TABLE `user_accounts` MODIFY COLUMN `phone` VARCHAR(20) NULL");
  }

  const companyContactFieldInfo = companyFields.find(f => f.Field === "Contact");
  if (companyContactFieldInfo && companyContactFieldInfo.Type.toLowerCase().includes("int")) {
    console.log("Modifying Contact column type in companies to VARCHAR(20)...");
    await queryPromise("ALTER TABLE `companies` MODIFY COLUMN `Contact` VARCHAR(20) NULL");
  }

  // 2c. user_accounts.email had no DB-level uniqueness - signup only did a
  // check-then-insert, so two concurrent signups with the same address could
  // both succeed and leave two account rows sharing one email (breaking
  // login/reset, which assume a single match). Add the missing unique key.
  // If duplicate emails already exist from before this fix, the ALTER will
  // fail with ER_DUP_ENTRY - that's surfaced via the startup log so the
  // duplicates can be resolved manually rather than silently skipped.
  const userAccountsIndexes = await queryPromise("SHOW INDEX FROM `user_accounts` WHERE Key_name = 'email'");
  if (userAccountsIndexes.length === 0) {
    console.log("Adding unique key on user_accounts.email...");
    try {
      await queryPromise("ALTER TABLE `user_accounts` ADD UNIQUE KEY `email` (`email`)");
    } catch (err) {
      console.error("Could not add unique key on user_accounts.email (likely duplicate emails already exist - resolve them manually):", err.message);
    }
  }

  // 3. Migrate VerifyEmail
  const verifyemailFields = await queryPromise("DESCRIBE `verifyemail`");
  const existingVerifyemailColumns = verifyemailFields.map(f => f.Field);

  // Change token column type to VARCHAR(255) to accommodate UUID strings
  const tokenFieldInfo = verifyemailFields.find(f => f.Field === "token");
  if (tokenFieldInfo && tokenFieldInfo.Type.toLowerCase().includes("int")) {
    console.log("Modifying token column type in verifyemail to VARCHAR(255)...");
    await queryPromise("ALTER TABLE `verifyemail` MODIFY COLUMN `token` VARCHAR(255) NOT NULL");
  }

  // Add isVerified column if it doesn't exist
  if (!existingVerifyemailColumns.includes("isVerified")) {
    console.log("Adding isVerified column to verifyemail...");
    await queryPromise("ALTER TABLE `verifyemail` ADD COLUMN `isVerified` TINYINT(1) DEFAULT 0");
  }

  // Add expires_at column so password-reset codes can be time-limited
  if (!existingVerifyemailColumns.includes("expires_at")) {
    console.log("Adding expires_at column to verifyemail...");
    await queryPromise("ALTER TABLE `verifyemail` ADD COLUMN `expires_at` DATETIME NULL");
  }

  // 3b. Admin-managed "Manager" sub-accounts. This table was previously
  // targeted by AddManager/GetManagers/ActiveManagers/InactiveManagers but
  // never actually created anywhere - those endpoints failed with an
  // "unknown table" error, and there was no login route for a manager at
  // all. Creating it here (with password + status) and adding a real login
  // route makes the feature actually work end-to-end.
  await queryPromise(`
    CREATE TABLE IF NOT EXISTS \`admin-account\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`FirstName\` VARCHAR(100) NOT NULL,
      \`email\` VARCHAR(100) NOT NULL,
      \`password\` VARCHAR(255) NOT NULL,
      \`role\` VARCHAR(50) NOT NULL DEFAULT 'manager',
      \`phone\` VARCHAR(20) DEFAULT NULL,
      \`City\` VARCHAR(100) DEFAULT NULL,
      \`province\` VARCHAR(100) DEFAULT NULL,
      \`status\` VARCHAR(20) NOT NULL DEFAULT 'Active',
      \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
      \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY \`email\` (\`email\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // 3c. Managers get the same "Settings" page as admin (profile photo +
  // password), which needs an image column - admin-account didn't have one.
  const adminAccountFields = await queryPromise("DESCRIBE \`admin-account\`");
  if (!adminAccountFields.some(f => f.Field === "image")) {
    console.log("Adding image column to admin-account...");
    await queryPromise("ALTER TABLE \`admin-account\` ADD COLUMN \`image\` VARCHAR(255) DEFAULT NULL");
  }

  // 4. Migrate Companies Social Networks
  const socialFields = await queryPromise("DESCRIBE `companies_social_networks`");
  const existingSocialColumns = socialFields.map(f => f.Field);
  if (!existingSocialColumns.includes("linkedIn")) {
    console.log("Adding missing column to companies_social_networks: linkedIn");
    await queryPromise("ALTER TABLE `companies_social_networks` ADD COLUMN `linkedIn` VARCHAR(100) DEFAULT NULL");
  }
  
  // 5. Migrate Site Configs Table
  await queryPromise(`
    CREATE TABLE IF NOT EXISTS \`site_configs\` (
      \`config_key\` VARCHAR(100) PRIMARY KEY,
      \`config_value\` TEXT NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Insert default values if site_configs is empty
  const configsCount = await queryPromise("SELECT COUNT(*) as count FROM `site_configs`");
  if (configsCount[0].count === 0) {
    console.log("Seeding default site configurations...");
    const defaultConfigs = [
      ["site_email", "info@hirix.pk"],
      ["site_phone", "+92 300 1234567"],
      ["footer_address", "Office 12, Ground Floor, Ezitech Solutions, Pakistan"],
      ["site_title", "Hirix Pakistan \u2013 Find Jobs & Hire Talent"],
      ["site_meta_description", "Hirix is Pakistan's leading job portal. Search thousands of jobs or post a vacancy and hire top talent today."],
      ["social_links", JSON.stringify([
        { platform: "Facebook", url: "https://facebook.com" },
        { platform: "LinkedIn", url: "https://linkedin.com" },
        { platform: "Instagram", url: "https://instagram.com" }
      ])],
      ["gtm_id", ""],
      ["pixel_id", ""],
      ["gsc_verification", ""]
    ];
    for (const [key, val] of defaultConfigs) {
      await queryPromise("INSERT INTO `site_configs` (`config_key`, `config_value`) VALUES (?, ?)", [key, val]);
    }
  }

  // 6. Migrate Blogs Table
  await queryPromise(`
    CREATE TABLE IF NOT EXISTS \`blogs\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`title\` VARCHAR(255) NOT NULL,
      \`slug\` VARCHAR(255) UNIQUE NOT NULL,
      \`content\` LONGTEXT NOT NULL,
      \`cover_image\` VARCHAR(255) DEFAULT NULL,
      \`category\` VARCHAR(100) DEFAULT NULL,
      \`tags\` TEXT DEFAULT NULL,
      \`focus_keyword\` VARCHAR(100) DEFAULT NULL,
      \`seo_title\` VARCHAR(255) DEFAULT NULL,
      \`meta_description\` TEXT DEFAULT NULL,
      \`canonical_url\` VARCHAR(255) DEFAULT NULL,
      \`og_image\` VARCHAR(255) DEFAULT NULL,
      \`status\` VARCHAR(50) DEFAULT 'Draft',
      \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
      \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // 7. Migrate Job Categories Table
  await queryPromise(`
    CREATE TABLE IF NOT EXISTS \`job_categories\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`name\` VARCHAR(100) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // 8. Migrate Job Subcategories Table
  await queryPromise(`
    CREATE TABLE IF NOT EXISTS \`job_subcategories\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`category_id\` INT NOT NULL,
      \`name\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`category_id\`) REFERENCES \`job_categories\` (\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Seed Categories & Subcategories
  const catCount = await queryPromise("SELECT COUNT(*) as count FROM `job_categories`");
  if (catCount[0].count === 0) {
    console.log("Seeding default job categories and subcategories...");
    await queryPromise("INSERT INTO `job_categories` (`id`, `name`) VALUES (1, 'Information Technology & Software'), (2, 'Sales & Marketing'), (3, 'Finance & Accounting'), (4, 'Human Resources (HR)'), (5, 'Creative Arts & Design')");
    
    const subCategories = [
      [1, 'Frontend Web Development'],
      [1, 'Backend Web Development'],
      [1, 'Mobile App Development'],
      [1, 'DevOps & Cloud Computing'],
      [1, 'Data Science & AI'],
      [2, 'Social Media Marketing'],
      [2, 'Search Engine Optimization (SEO)'],
      [2, 'Business Development & Sales'],
      [3, 'Corporate Accounting'],
      [3, 'Financial Analysis'],
      [3, 'Audit & Compliance'],
      [4, 'Talent Acquisition & Recruiting'],
      [4, 'HR Operations & Generalist'],
      [5, 'UI/UX Design'],
      [5, 'Graphic Design & Branding'],
      [5, 'Video Editing & Animation']
    ];
    
    for (const [catId, name] of subCategories) {
      await queryPromise("INSERT INTO `job_subcategories` (`category_id`, `name`) VALUES (?, ?)", [catId, name]);
    }
  }

  // Seed default skills
  const skillsCount = await queryPromise("SELECT COUNT(*) as count FROM `skillset`");
  if (skillsCount[0].count <= 4) {
    console.log("Seeding default skills in skillset table...");
    const defaultSkills = [
      'HTML5', 'CSS3', 'JavaScript', 'PHP', 'React.js', 'Node.js', 
      'Python', 'Django', 'Flutter', 'React Native', 'AWS', 'Docker', 
      'Kubernetes', 'SQL', 'MongoDB', 'UI/UX Design', 'Figma', 
      'Graphic Design', 'Search Engine Optimization (SEO)', 'Content Writing'
    ];
    for (const skill of defaultSkills) {
      await queryPromise("INSERT INTO `skillset` (`skills`) VALUES (?) ON DUPLICATE KEY UPDATE `skills` = `skills`", [skill]);
    }
  }

  // 9. Candidate "Profile Settings" page (basic info / education / experience
  // / projects / awards) reads and writes user_accounts.province,
  // user_details' CurrentPosition/Category/etc columns, and 4 dedicated
  // tables - none of which existed, so every load/save on that page 500'd.
  const userAccountsFields2 = await queryPromise("DESCRIBE `user_accounts`");
  if (!userAccountsFields2.some(f => f.Field === "province")) {
    console.log("Adding province column to user_accounts...");
    await queryPromise("ALTER TABLE `user_accounts` ADD COLUMN `province` VARCHAR(255) NULL");
  }

  const userDetailsFields = await queryPromise("DESCRIBE `user_details`");
  const existingUserDetailsColumns = userDetailsFields.map(f => f.Field);
  const userDetailsColumnsToAdd = [
    { name: "CurrentPosition", definition: "VARCHAR(255) NULL" },
    { name: "Category", definition: "VARCHAR(255) NULL" },
    { name: "Description", definition: "TEXT NULL" },
    { name: "DOP", definition: "DATE NULL" },
    { name: "Age", definition: "VARCHAR(10) NULL" },
    { name: "Gender", definition: "VARCHAR(20) NULL" },
    { name: "Language", definition: "VARCHAR(255) NULL" },
    { name: "Experience", definition: "VARCHAR(50) NULL" },
    { name: "offer_salary", definition: "VARCHAR(50) NULL" },
    { name: "Salary_type", definition: "VARCHAR(50) NULL" },
    { name: "Currency", definition: "VARCHAR(20) NULL" },
    { name: "LinkedIn", definition: "VARCHAR(255) NULL" },
  ];
  for (const col of userDetailsColumnsToAdd) {
    if (!existingUserDetailsColumns.includes(col.name)) {
      console.log(`Adding missing column to user_details: ${col.name}`);
      await queryPromise(`ALTER TABLE \`user_details\` ADD COLUMN \`${col.name}\` ${col.definition}`);
    }
  }

  await queryPromise(`
    CREATE TABLE IF NOT EXISTS \`user_qualification\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`user_id\` INT NOT NULL,
      \`degree_title\` VARCHAR(255) DEFAULT NULL,
      \`institute_name\` VARCHAR(255) DEFAULT NULL,
      \`field_of_study\` VARCHAR(255) DEFAULT NULL,
      \`start_year\` INT DEFAULT NULL,
      \`end_year\` INT DEFAULT NULL,
      \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (\`user_id\`) REFERENCES \`user_accounts\` (\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await queryPromise(`
    CREATE TABLE IF NOT EXISTS \`user_experience\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`user_id\` INT NOT NULL,
      \`job_title\` VARCHAR(255) DEFAULT NULL,
      \`company_name\` VARCHAR(255) DEFAULT NULL,
      \`start_date\` INT DEFAULT NULL,
      \`end_date\` INT DEFAULT NULL,
      \`description\` TEXT DEFAULT NULL,
      \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (\`user_id\`) REFERENCES \`user_accounts\` (\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await queryPromise(`
    CREATE TABLE IF NOT EXISTS \`user_projects\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`user_id\` INT NOT NULL,
      \`title\` VARCHAR(255) DEFAULT NULL,
      \`link\` VARCHAR(255) DEFAULT NULL,
      \`description\` TEXT DEFAULT NULL,
      \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (\`user_id\`) REFERENCES \`user_accounts\` (\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await queryPromise(`
    CREATE TABLE IF NOT EXISTS \`user_awards\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`user_id\` INT NOT NULL,
      \`title\` VARCHAR(255) DEFAULT NULL,
      \`description\` TEXT DEFAULT NULL,
      \`awarded_by\` VARCHAR(255) DEFAULT NULL,
      \`award_date\` DATE DEFAULT NULL,
      \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (\`user_id\`) REFERENCES \`user_accounts\` (\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  console.log("Migration complete!");
}

if (require.main === module) {
  migrateSchema()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Migration failed:", err);
      process.exit(1);
    });
}

module.exports = { migrateSchema };
