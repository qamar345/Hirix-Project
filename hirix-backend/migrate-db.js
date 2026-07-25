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
  { name: "city", definition: "VARCHAR(255) NULL" }
];

const companyColumnsToAdd = [
  { name: "is_linkedin_verified", definition: "TINYINT(1) DEFAULT 0" },
  { name: "linkedin_company_id", definition: "VARCHAR(100) DEFAULT NULL" },
  { name: "linkedin_verified_at", definition: "DATETIME DEFAULT NULL" }
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
