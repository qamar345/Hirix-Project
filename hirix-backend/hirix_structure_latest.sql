-- Latest DB Structure Export
-- Exported on: 2026-07-25T17:53:08.169Z

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `applicants`;
CREATE TABLE `applicants` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `job_seeker_id` int(255) NOT NULL,
  `employee_id` int(255) NOT NULL,
  `job_id` int(255) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'applied',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_employee_id` (`employee_id`),
  KEY `fk_job_id` (`job_id`),
  KEY `fk_jobseeker_id` (`job_seeker_id`),
  CONSTRAINT `fk_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `user_accounts` (`id`),
  CONSTRAINT `fk_job_id` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`),
  CONSTRAINT `fk_jobseeker_id` FOREIGN KEY (`job_seeker_id`) REFERENCES `user_accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `tags` text DEFAULT NULL,
  `focus_keyword` varchar(100) DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `canonical_url` varchar(255) DEFAULT NULL,
  `og_image` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Draft',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `companies`;
CREATE TABLE `companies` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `user_account_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `categories` varchar(100) NOT NULL,
  `website_link` varchar(255) NOT NULL,
  `About` varchar(500) NOT NULL,
  `Contact` int(100) NOT NULL,
  `E_mail` varchar(100) NOT NULL,
  `total_members` int(100) NOT NULL,
  `images` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_linkedin_verified` tinyint(1) DEFAULT 0,
  `linkedin_company_id` varchar(100) DEFAULT NULL,
  `linkedin_verified_at` datetime DEFAULT NULL,
  `is_email_verified` tinyint(1) DEFAULT 0,
  `email_verification_token` varchar(255) DEFAULT NULL,
  `status_delete` tinyint(1) DEFAULT 1,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `Ntn` varchar(100) DEFAULT NULL,
  `founded_in` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_useraccounts_id` (`user_account_id`),
  CONSTRAINT `fk_useraccounts_id` FOREIGN KEY (`user_account_id`) REFERENCES `user_accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `companies_social_networks`;
CREATE TABLE `companies_social_networks` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `companies_id` int(255) NOT NULL,
  `twitter` varchar(100) NOT NULL,
  `facebook` varchar(100) NOT NULL,
  `instagram` varchar(100) NOT NULL,
  `youtube` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `linkedIn` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_social` (`companies_id`),
  CONSTRAINT `fk_social` FOREIGN KEY (`companies_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `freeze_users`;
CREATE TABLE `freeze_users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `user_id` int(255) NOT NULL,
  `reason` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_freeze` (`user_id`),
  CONSTRAINT `fk_freeze` FOREIGN KEY (`user_id`) REFERENCES `user_accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `job_required_skills`;
CREATE TABLE `job_required_skills` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `job_id` int(255) NOT NULL,
  `skillset_id` int(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_job_skills` (`job_id`),
  KEY `fk_job` (`skillset_id`),
  CONSTRAINT `fk_job` FOREIGN KEY (`skillset_id`) REFERENCES `skillset` (`id`),
  CONSTRAINT `fk_job_skills` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `employee_id` int(255) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `job_type` varchar(100) NOT NULL,
  `career_level` varchar(100) NOT NULL,
  `Experience` varchar(100) NOT NULL,
  `qualification` varchar(100) NOT NULL,
  `available_seats` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `currency` varchar(100) NOT NULL,
  `minimum_currency` varchar(100) NOT NULL,
  `maximum_currency` varchar(100) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `time` varchar(100) NOT NULL,
  `salary` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'Pending',
  `required_skills` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `job_category` varchar(255) DEFAULT NULL,
  `job_subcategory` varchar(255) DEFAULT NULL,
  `workplace_type` varchar(100) DEFAULT NULL,
  `Rate` varchar(100) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Url` varchar(255) DEFAULT NULL,
  `Phone` varchar(100) DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `ApplyType` varchar(100) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_jobs_id` (`employee_id`),
  CONSTRAINT `fk_jobs_id` FOREIGN KEY (`employee_id`) REFERENCES `user_accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `jobseeker_skills`;
CREATE TABLE `jobseeker_skills` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `job_seeker_id` int(255) NOT NULL,
  `skillset_id` int(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_skill_set` (`skillset_id`),
  KEY `fk_user_skills` (`job_seeker_id`),
  CONSTRAINT `fk_skill_set` FOREIGN KEY (`skillset_id`) REFERENCES `skillset` (`id`),
  CONSTRAINT `fk_user_skills` FOREIGN KEY (`job_seeker_id`) REFERENCES `user_accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `sender_id` int(255) NOT NULL,
  `receiver_id` int(255) NOT NULL,
  `message` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_message_user1` (`sender_id`),
  KEY `fk_message_user2` (`receiver_id`),
  CONSTRAINT `fk_message_user1` FOREIGN KEY (`sender_id`) REFERENCES `user_accounts` (`id`),
  CONSTRAINT `fk_message_user2` FOREIGN KEY (`receiver_id`) REFERENCES `user_accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `job_seeker_id` int(255) NOT NULL,
  `review` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_review` (`job_seeker_id`),
  CONSTRAINT `fk_review` FOREIGN KEY (`job_seeker_id`) REFERENCES `user_accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `site_configs`;
CREATE TABLE `site_configs` (
  `config_key` varchar(100) NOT NULL,
  `config_value` text NOT NULL,
  PRIMARY KEY (`config_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `skillset`;
CREATE TABLE `skillset` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `skills` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `user_accounts`;
CREATE TABLE `user_accounts` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `role` varchar(255) NOT NULL,
  `phone` int(20) NOT NULL,
  `qualification` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `profile_status` tinyint(1) DEFAULT NULL,
  `account_status` tinyint(1) NOT NULL DEFAULT 1,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `user_details`;
CREATE TABLE `user_details` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `user_id` int(255) NOT NULL,
  `skillset` varchar(255) NOT NULL,
  `phone` int(20) NOT NULL,
  `qualification` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_details` (`user_id`),
  CONSTRAINT `fk_details` FOREIGN KEY (`user_id`) REFERENCES `user_accounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `verifyemail`;
CREATE TABLE `verifyemail` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isVerified` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SET FOREIGN_KEY_CHECKS = 1;
