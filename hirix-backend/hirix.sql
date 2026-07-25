-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2024 at 07:20 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hirix`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin-account`
--

CREATE TABLE `admin-account` (
  `id` int(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(15) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin-account`
--

INSERT INTO `admin-account` (`id`, `name`, `image`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'nimra', '', 'admin@gmail.com', '777', '2024-10-29 15:18:43', '2024-12-09 15:27:32');

-- --------------------------------------------------------

--
-- Table structure for table `applicants`
--

CREATE TABLE `applicants` (
  `id` int(255) NOT NULL,
  `job_seeker_id` int(255) NOT NULL,
  `employee_id` int(255) NOT NULL,
  `job_id` int(255) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'applied',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applicants`
--

INSERT INTO `applicants` (`id`, `job_seeker_id`, `employee_id`, `job_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 'Rejected', '2024-11-05 14:42:24', '2024-11-05 15:00:44'),
(2, 1, 1, 2, 'applied', '2024-11-05 16:57:30', '2024-11-05 16:57:30'),
(3, 2, 2, 2, 'applied', '2024-11-12 16:17:04', '2024-11-12 16:17:04'),
(7, 1, 2, 4, 'applied', '2024-12-02 15:54:48', '2024-12-02 15:54:48'),
(8, 2, 2, 4, 'applied', '2024-12-02 16:27:29', '2024-12-02 16:27:29'),
(9, 1, 2, 4, 'applied', '2024-12-02 16:28:47', '2024-12-02 16:28:47');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(255) NOT NULL,
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
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `user_account_id`, `name`, `categories`, `website_link`, `About`, `Contact`, `E_mail`, `total_members`, `images`, `location`, `created_at`, `updated_at`) VALUES
(1, 1, 'eziinstitute', 'web development', 'www.website.pk', 'kjhnbgvfecdsghjmyhtbgfd', 13876543, 'ezitech@gmail.com', 20, '', 'rawalpindi', '2024-11-12 15:17:25', '2024-11-14 15:28:27'),
(2, 1, 'Company Ezitech', 'company of software', 'www.company.pk', 'just checking...', 9876543, 'company@gmail.com', 5, 'kjj.jpg', 'islamabad', '2024-11-12 15:22:43', '2024-12-04 14:12:12'),
(3, 2, 'Company Ezitech', 'company of software', 'www.company.pk', 'just checking...', 9876543, 'company@gmail.com', 5, 'kjj.jpg', 'islamabad', '2024-12-02 16:01:15', '2024-12-04 14:08:55'),
(4, 2, 'eziitech institute', 'Software Company', 'www.ezitech.com', 'fbfhjefepoiuytrewsdfghjklcx', 9876543, 'ezitach@gmail.com', 10, 'hty.jpg', 'rawalpindi', '2024-12-02 16:02:58', '2024-12-02 16:02:58');

-- --------------------------------------------------------

--
-- Table structure for table `companies_social_networks`
--

CREATE TABLE `companies_social_networks` (
  `id` int(255) NOT NULL,
  `companies_id` int(255) NOT NULL,
  `twitter` varchar(100) NOT NULL,
  `facebook` varchar(100) NOT NULL,
  `instagram` varchar(100) NOT NULL,
  `youtube` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companies_social_networks`
--

INSERT INTO `companies_social_networks` (`id`, `companies_id`, `twitter`, `facebook`, `instagram`, `youtube`, `created_at`, `updated_at`) VALUES
(1, 1, 'www.twittereziitech.pk', 'www.facebook.pk', 'www.instagram.pk', 'youtube.pk', '2024-11-12 15:20:51', '2024-11-12 15:20:51'),
(2, 2, 'companytwitter.pk', 'companyfacebook.pk', 'companyinstagram.pk', 'companyyoutube.pk', '2024-11-12 15:24:00', '2024-12-04 14:12:12'),
(3, 4, 'twitterezitach', 'facebookezitach', 'instaezitach', 'youtubeezitach', '2024-12-02 16:02:58', '2024-12-02 16:02:58');

-- --------------------------------------------------------

--
-- Table structure for table `freeze_users`
--

CREATE TABLE `freeze_users` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `reason` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `freeze_users`
--

INSERT INTO `freeze_users` (`id`, `user_id`, `reason`, `created_at`, `updated_at`) VALUES
(1, 1, 'scamming', '2024-11-28 17:01:19', '2024-11-28 17:01:19'),
(2, 1, 'just checking...', '2024-12-03 10:53:25', '2024-12-03 10:53:25'),
(3, 2, 'just checking how its work', '2024-12-09 15:33:41', '2024-12-09 15:33:41');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(255) NOT NULL,
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
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `employee_id`, `title`, `description`, `job_type`, `career_level`, `Experience`, `qualification`, `available_seats`, `gender`, `currency`, `minimum_currency`, `maximum_currency`, `company_name`, `time`, `salary`, `status`, `required_skills`, `location`, `created_at`, `updated_at`) VALUES
(1, 1, 'backend End', 'wertyuiolkjhgfdszxcvbn', 'onsite', '', '', '', '', '', '', '', '', '', '2:00_5:00', '10,000', '0', 'html, css, javascript', '', '2024-10-29 17:00:14', '2024-10-29 17:00:14'),
(2, 1, 'app', 'just checking...', 'remote', 'intern', 'not required', 'BSCS', '5', 'female', 'pk', '1000', '5000', 'ezitach', '2:00-5:00', '4000', 'Closed', 'c, c++', 'rawalpindi', '2024-10-30 14:31:18', '2024-10-30 14:31:18'),
(4, 2, 'Javascript', 'this is an intership', 'onsite', 'advance', '2 years', 'BSCS', '5', 'female', 'pk', '', '', '', '1:00_4:00', '1000', 'Closed', 'css', 'rawalpindi', '2024-11-05 14:20:51', '2024-11-05 14:20:51'),
(5, 1, 'Web development', 'this is website.', 'onsite', 'master', '2 years', 'BSCS', '5', 'female', 'pk', '10,000', '20,000', 'xyz', '2:00_5:00', '15,000', 'Pending', 'php', 'islamabad', '2024-11-15 14:27:34', '2024-11-15 14:27:34');

-- --------------------------------------------------------

--
-- Table structure for table `jobseeker_skills`
--

CREATE TABLE `jobseeker_skills` (
  `id` int(255) NOT NULL,
  `job_seeker_id` int(255) NOT NULL,
  `skillset_id` int(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobseeker_skills`
--

INSERT INTO `jobseeker_skills` (`id`, `job_seeker_id`, `skillset_id`, `created_at`, `updated_at`) VALUES
(4, 2, 3, '2024-11-22 12:22:22', '2024-11-22 12:22:22'),
(5, 1, 1, '2024-11-22 12:50:10', '2024-11-22 12:50:10'),
(6, 2, 4, '2024-11-22 12:53:15', '2024-11-22 12:53:15'),
(7, 9, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 9, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 10, 1, '2024-11-28 15:06:17', '2024-11-28 15:06:17'),
(10, 10, 3, '2024-11-28 15:06:17', '2024-11-28 15:06:17'),
(11, 11, 4, '2024-11-28 15:24:43', '2024-11-28 15:24:43'),
(12, 12, 1, '2024-11-28 15:26:16', '2024-11-28 15:26:16'),
(13, 12, 2, '2024-11-28 15:26:16', '2024-11-28 15:26:16'),
(14, 13, 1, '2024-11-28 15:47:59', '2024-11-28 15:47:59'),
(15, 13, 2, '2024-11-28 15:47:59', '2024-11-28 15:47:59'),
(16, 13, 3, '2024-11-28 15:47:59', '2024-11-28 15:47:59'),
(18, 2, 1, '2024-12-05 14:42:10', '2024-12-05 14:42:10'),
(19, 1, 3, '2024-12-05 14:44:03', '2024-12-05 14:44:03'),
(20, 1, 2, '2024-12-05 15:05:44', '2024-12-05 15:05:44');

-- --------------------------------------------------------

--
-- Table structure for table `job_required_skills`
--

CREATE TABLE `job_required_skills` (
  `id` int(255) NOT NULL,
  `job_id` int(255) NOT NULL,
  `skillset_id` int(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_required_skills`
--

INSERT INTO `job_required_skills` (`id`, `job_id`, `skillset_id`, `created_at`, `updated_at`) VALUES
(6, 1, 3, '2024-11-22 16:23:42', '2024-11-22 16:23:42'),
(7, 4, 1, '2024-11-22 16:51:11', '2024-11-22 16:51:11'),
(8, 5, 4, '2024-11-22 16:54:07', '2024-11-22 16:54:07'),
(9, 2, 1, '2024-12-03 14:20:50', '2024-12-03 14:20:50');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(255) NOT NULL,
  `sender_id` int(255) NOT NULL,
  `receiver_id` int(255) NOT NULL,
  `message` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `message`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'this website is working.', '2024-11-14 13:38:43', '2024-11-14 13:38:43'),
(3, 1, 2, 'wow its woking...', '2024-11-14 17:03:48', '2024-11-14 17:03:48'),
(4, 2, 2, 'just checking', '2024-12-03 14:31:38', '2024-12-03 14:31:38');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(100) NOT NULL,
  `job_seeker_id` int(255) NOT NULL,
  `review` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `job_seeker_id`, `review`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'just checking...', 0, '2024-11-08 11:14:11', '2024-12-03 11:29:34');

-- --------------------------------------------------------

--
-- Table structure for table `skillset`
--

CREATE TABLE `skillset` (
  `id` int(255) NOT NULL,
  `skills` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skillset`
--

INSERT INTO `skillset` (`id`, `skills`, `created_at`, `updated_at`) VALUES
(1, 'html', '2024-11-08 12:19:26', '2024-11-08 12:19:26'),
(2, 'css', '2024-11-08 12:19:43', '2024-11-08 12:19:43'),
(3, 'javascript', '2024-11-08 12:20:07', '2024-11-08 12:57:24'),
(4, 'php', '2024-11-12 14:48:52', '2024-11-12 14:48:52');

-- --------------------------------------------------------

--
-- Table structure for table `user_accounts`
--

CREATE TABLE `user_accounts` (
  `id` int(255) NOT NULL,
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
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_accounts`
--

INSERT INTO `user_accounts` (`id`, `first_name`, `last_name`, `username`, `image`, `email`, `password`, `role`, `phone`, `qualification`, `location`, `profile_status`, `account_status`, `is_verified`, `created_at`, `updated_at`) VALUES
(1, '', '', 'employee', 'hfd.jpg', 'noor@gmail.com', '1111', '', 0, '', '', 0, 1, 0, '2024-10-29 17:03:19', '2024-12-09 15:31:25'),
(2, '', '', 'nimra', '', 'nimra09@gmail.com', '5454', 'jobseeker', 0, '', '', NULL, 0, 0, '2024-11-12 14:57:54', '2024-12-09 15:33:41'),
(3, '', '', 'noor', '', 'qamargill427@gmail.com', '$2b$10$NceasEUek0VHEooUZ9vxFuA65q2CcX76k47onSmcgg.3QmYbTFXGu', 'employee', 0, '', '', NULL, 0, 0, '2024-11-28 14:49:38', '2024-12-05 17:09:39'),
(4, '', '', 'noor', '', 'noor@gmail.com', '', '', 0, '', '', NULL, 0, 0, '2024-11-28 14:56:22', '2024-11-28 14:56:22'),
(5, '', '', 'noor', '', 'noor@gmail.com', '', '', 0, '', '', NULL, 0, 0, '2024-11-28 14:57:04', '2024-11-28 14:57:04'),
(6, '', '', 'noor', '', 'noor@gmail.com', '', '', 0, '', '', NULL, 0, 0, '2024-11-28 14:58:36', '2024-11-28 14:58:36'),
(7, '', '', 'noor', '', 'noor@gmail.com', '', '', 0, '', '', NULL, 0, 0, '2024-11-28 15:00:05', '2024-11-28 15:00:05'),
(8, '', '', 'noor', '', 'noor@gmail.com', '', '', 0, '', '', NULL, 0, 0, '2024-11-28 15:01:17', '2024-11-28 15:01:17'),
(9, '', '', 'noor', '', 'noor@gmail.com', '', '', 0, '', '', NULL, 0, 0, '2024-11-28 15:04:20', '2024-11-28 15:04:20'),
(10, '', '', 'hafsa', '', 'hafsa@gmail.com', '', '', 0, '', '', NULL, 0, 0, '2024-11-28 15:06:17', '2024-11-28 15:06:17'),
(11, '', '', 'ramza', '', 'ramza@gmail.com', '', '', 0, '', '', NULL, 0, 0, '2024-11-28 15:24:43', '2024-11-28 15:24:43'),
(12, '', '', 'ramza', '', 'ramza@gmail.com', '', '', 0, '', '', NULL, 0, 0, '2024-11-28 15:26:16', '2024-11-28 15:26:16'),
(13, '', '', 'ali', '', 'ali@gmail.com', 'abc', 'jobseeker', 34987, 'BSCS', 'rawalpindi', NULL, 0, 0, '2024-11-28 15:47:59', '2024-11-28 15:47:59'),
(14, 'Faizan', 'Asad', 'faizanAsad', '', 'faizan@gmail.com', '12345', 'employee', 98765432, 'BS', 'rawalpindi', NULL, 1, 0, '2024-12-04 14:44:51', '2024-12-04 14:44:51'),
(15, 'nimra', 'asad', 'NimraAsad', '', 'nimraasad09@gmail.com', '$2b$10$aVTHczUUydQDnVj2/SnPx.D/cZNuaNpAk0emFEtEgMr9OkeIn62KK', 'employee', 8762345, '', '', NULL, 1, 0, '2024-12-09 14:39:50', '2024-12-09 16:34:07'),
(16, 'ramza', 'asad', 'RamzaAsad', '', 'ramza@gmail.com', '$2b$10$9vmw4N7vNlaBspinfiy.Qu4S9WsIPlm/xifU6qfGGveFl6OyA8eK.', 'employee', 8762345, 'CA', 'jhelum', NULL, 1, 0, '2024-12-09 14:41:17', '2024-12-09 16:35:12');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `skillset` varchar(255) NOT NULL,
  `phone` int(20) NOT NULL,
  `qualification` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `verifyemail`
--

CREATE TABLE `verifyemail` (
  `id` int(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `token` int(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `verifyemail`
--

INSERT INTO `verifyemail` (`id`, `email`, `token`, `created_at`, `updated_at`) VALUES
(9, 'qamargill427@gmail.com', 6634, '2024-12-05 17:22:29', '2024-12-05 17:22:29'),
(12, 'nimraasad09@gmail.com', 3065, '2024-12-09 15:46:36', '2024-12-09 15:46:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin-account`
--
ALTER TABLE `admin-account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_employee_id` (`employee_id`),
  ADD KEY `fk_job_id` (`job_id`),
  ADD KEY `fk_jobseeker_id` (`job_seeker_id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_useraccounts_id` (`user_account_id`);

--
-- Indexes for table `companies_social_networks`
--
ALTER TABLE `companies_social_networks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_social` (`companies_id`);

--
-- Indexes for table `freeze_users`
--
ALTER TABLE `freeze_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_freeze` (`user_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_jobs_id` (`employee_id`);

--
-- Indexes for table `jobseeker_skills`
--
ALTER TABLE `jobseeker_skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_skill_set` (`skillset_id`),
  ADD KEY `fk_user_skills` (`job_seeker_id`);

--
-- Indexes for table `job_required_skills`
--
ALTER TABLE `job_required_skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_job_skills` (`job_id`),
  ADD KEY `fk_job` (`skillset_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_message_user1` (`sender_id`),
  ADD KEY `fk_message_user2` (`receiver_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_review` (`job_seeker_id`);

--
-- Indexes for table `skillset`
--
ALTER TABLE `skillset`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_accounts`
--
ALTER TABLE `user_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_details` (`user_id`);

--
-- Indexes for table `verifyemail`
--
ALTER TABLE `verifyemail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin-account`
--
ALTER TABLE `admin-account`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `applicants`
--
ALTER TABLE `applicants`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `companies_social_networks`
--
ALTER TABLE `companies_social_networks`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `freeze_users`
--
ALTER TABLE `freeze_users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `jobseeker_skills`
--
ALTER TABLE `jobseeker_skills`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `job_required_skills`
--
ALTER TABLE `job_required_skills`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `skillset`
--
ALTER TABLE `skillset`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_accounts`
--
ALTER TABLE `user_accounts`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `verifyemail`
--
ALTER TABLE `verifyemail`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applicants`
--
ALTER TABLE `applicants`
  ADD CONSTRAINT `fk_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `user_accounts` (`id`),
  ADD CONSTRAINT `fk_job_id` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`),
  ADD CONSTRAINT `fk_jobseeker_id` FOREIGN KEY (`job_seeker_id`) REFERENCES `user_accounts` (`id`);

--
-- Constraints for table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `fk_useraccounts_id` FOREIGN KEY (`user_account_id`) REFERENCES `user_accounts` (`id`);

--
-- Constraints for table `companies_social_networks`
--
ALTER TABLE `companies_social_networks`
  ADD CONSTRAINT `fk_social` FOREIGN KEY (`companies_id`) REFERENCES `companies` (`id`);

--
-- Constraints for table `freeze_users`
--
ALTER TABLE `freeze_users`
  ADD CONSTRAINT `fk_freeze` FOREIGN KEY (`user_id`) REFERENCES `user_accounts` (`id`);

--
-- Constraints for table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `fk_jobs_id` FOREIGN KEY (`employee_id`) REFERENCES `user_accounts` (`id`);

--
-- Constraints for table `jobseeker_skills`
--
ALTER TABLE `jobseeker_skills`
  ADD CONSTRAINT `fk_skill_set` FOREIGN KEY (`skillset_id`) REFERENCES `skillset` (`id`),
  ADD CONSTRAINT `fk_user_skills` FOREIGN KEY (`job_seeker_id`) REFERENCES `user_accounts` (`id`);

--
-- Constraints for table `job_required_skills`
--
ALTER TABLE `job_required_skills`
  ADD CONSTRAINT `fk_job` FOREIGN KEY (`skillset_id`) REFERENCES `skillset` (`id`),
  ADD CONSTRAINT `fk_job_skills` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_message_user1` FOREIGN KEY (`sender_id`) REFERENCES `user_accounts` (`id`),
  ADD CONSTRAINT `fk_message_user2` FOREIGN KEY (`receiver_id`) REFERENCES `user_accounts` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_review` FOREIGN KEY (`job_seeker_id`) REFERENCES `user_accounts` (`id`);

--
-- Constraints for table `user_details`
--
ALTER TABLE `user_details`
  ADD CONSTRAINT `fk_details` FOREIGN KEY (`user_id`) REFERENCES `user_accounts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
