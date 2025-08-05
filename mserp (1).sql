-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 05, 2025 at 07:09 AM
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
-- Database: `mserp`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_us`
--

CREATE TABLE `about_us` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `about_desc` text NOT NULL,
  `mission_desc` text NOT NULL,
  `vision_desc` text NOT NULL,
  `about_image` varchar(255) DEFAULT NULL,
  `mission_image` varchar(255) DEFAULT NULL,
  `vision_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about_us`
--

INSERT INTO `about_us` (`id`, `heading`, `about_desc`, `mission_desc`, `vision_desc`, `about_image`, `mission_image`, `vision_image`, `created_at`, `updated_at`) VALUES
(1, 'About Our School', '<p class=\"text-gray-600 text-base md:text-lg leading-relaxed mb-4\">Our school is dedicated to fostering a nurturing environment where students can grow academically and personally. We combine modern teaching techniques with strong values to empower children to reach their highest potential.</p>\r\n<p class=\"text-gray-600 text-base md:text-lg leading-relaxed mb-6\">With experienced educators, well-equipped classrooms, and an inclusive community, we strive to make learning inspiring, enjoyable, and impactful.</p>', '<h2 class=\"text-2xl md:text-3xl font-bold text-gray-800 mb-4\">Our Mission</h2>\r\n<p class=\"text-gray-700 text-lg leading-relaxed\">Our mission is to inspire and empower students through a holistic approach to education. We foster critical thinking, creativity, and compassion, ensuring that each learner develops a strong sense of self and a lifelong love of learning.</p>', '<h2 class=\"text-2xl md:text-3xl font-bold text-gray-800 mb-4\">Our Vision</h2>\n<p class=\"text-gray-700 text-lg leading-relaxed\">We envision a future where every student is equipped with the knowledge, creativity, and resilience needed to make meaningful contributions to the world. Our school is committed to being a place of innovation, inclusivity, and lifelong learning.</p>', '1753906932526-Depositphotos_122104490_S.jpg', '1753906932537-vission-1.jpg', '1753906932549-mission.jpg', '2025-07-27 06:48:30', '2025-07-30 20:41:26');

-- --------------------------------------------------------

--
-- Table structure for table `apps`
--

CREATE TABLE `apps` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `link` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `apps`
--

INSERT INTO `apps` (`id`, `heading`, `title`, `link`, `created_at`) VALUES
(11, 'Teacher App', 'Manage classes, attendance, and communicate with students on the go.', 'https://eschool.wrteam.me/section', '2025-07-31 07:04:01'),
(12, 'Student App', 'Access assignments, results, and important updates anytime.', 'eschool.wrteam.me/section', '2025-07-31 07:04:31');

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `educational_program` varchar(100) DEFAULT NULL,
  `medium_id` int(11) NOT NULL,
  `shift_id` int(11) NOT NULL,
  `stream_id` int(11) NOT NULL,
  `section_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `name`, `educational_program`, `medium_id`, `shift_id`, `stream_id`, `section_id`, `created_at`) VALUES
(2, '10TH', 'Primary School', 4, 2, 3, 3, '2025-08-02 05:55:19'),
(3, '12th', 'Heigher Secondary School', 4, 3, 3, 3, '2025-08-02 05:57:08'),
(4, '4th', 'Primary School', 2, 3, 3, 4, '2025-08-02 06:04:00'),
(7, '11th', 'Primary School', 3, 2, 2, 4, '2025-08-02 06:56:15'),
(8, '11th', 'Pre-primary School', 4, 3, 2, 3, '2025-08-02 06:56:33');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `heading` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `date`, `heading`, `created_at`) VALUES
(4, 'Students showcase their science projects and experiments, demonstrating creativity and innovation.', '2025-08-12', 'Annual Science Fair', '2025-07-30 20:48:11'),
(5, 'An opportunity for parents to meet teachers and discuss their children\'s academic progress.', '2025-09-11', 'Parent-Teacher Conference', '2025-07-30 20:48:41'),
(6, 'A day full of sports competitions and fun activities to encourage teamwork and sportsmanship.', '2025-08-20', 'Sports Day', '2025-07-30 20:49:16'),
(7, 'Our talented students present their artwork to the community and guests.', '2025-09-18', 'Art Exhibition', '2025-07-30 20:51:36');

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `answer`, `created_at`, `updated_at`) VALUES
(4, 'What age groups do you accept?', 'We accept children from ages 3 to 14, providing a nurturing environment for every stage of development.', '2025-07-31 06:55:14', '2025-07-31 06:55:14'),
(5, 'How do I enroll my child?', 'You can enroll by filling out the registration form on our website or visiting our admissions office.', '2025-07-31 06:55:32', '2025-07-31 06:55:32'),
(6, 'Do you offer extracurricular activities?', 'Yes, we have a wide range of extracurricular activities including sports, music, art, and more.', '2025-07-31 06:55:52', '2025-07-31 06:55:52'),
(7, 'What safety measures are in place?', 'Our campus has 24/7 security, CCTV surveillance, and trained staff to ensure the safety of all students.', '2025-07-31 06:56:17', '2025-07-31 06:56:17');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `image_url`, `created_at`) VALUES
(2, '1753873813938-education-school-university-books-college-classes-16441446.webp', '2025-07-30 11:10:14'),
(3, '1753873813941-f4d21ee856d327a34d0ca6cc01e7b83c276c0426.jpeg', '2025-07-30 11:10:14'),
(4, '1753874716079-3302448603_9d886c91a4_h.jpg', '2025-07-30 11:25:16');

-- --------------------------------------------------------

--
-- Table structure for table `leave_settings`
--

CREATE TABLE `leave_settings` (
  `id` int(11) NOT NULL,
  `session_year` varchar(10) NOT NULL,
  `month` varchar(20) NOT NULL,
  `total_leaves` int(11) NOT NULL,
  `leave_dates` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`leave_dates`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leave_settings`
--

INSERT INTO `leave_settings` (`id`, `session_year`, `month`, `total_leaves`, `leave_dates`, `created_at`) VALUES
(1, '2024-25', 'March', 10, '[2,5,6,8,7,4,3,1,9,10]', '2025-08-02 18:19:21'),
(2, '2025-26', 'February', 5, '[1,2,3,4,5]', '2025-08-02 18:31:24');

-- --------------------------------------------------------

--
-- Table structure for table `mediums`
--

CREATE TABLE `mediums` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mediums`
--

INSERT INTO `mediums` (`id`, `name`, `created_at`, `updated_at`) VALUES
(2, 'English', '2025-07-31 13:06:35', '2025-07-31 13:06:35'),
(3, 'Hindi', '2025-07-31 13:06:41', '2025-07-31 13:06:41'),
(4, 'Marathi', '2025-07-31 13:06:47', '2025-07-31 13:06:47'),
(5, 'Gujrat', '2025-07-31 13:06:53', '2025-07-31 13:06:53');

-- --------------------------------------------------------

--
-- Table structure for table `school_event`
--

CREATE TABLE `school_event` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `school_event`
--

INSERT INTO `school_event` (`id`, `title`, `description`, `image`) VALUES
(3, 'test', 'test...', '1754352459921-sakthi-sugars-ltd--600 - Copy.png');

-- --------------------------------------------------------

--
-- Table structure for table `school_holidays`
--

CREATE TABLE `school_holidays` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `name`) VALUES
(1, 'A'),
(3, 'D'),
(4, 'E');

-- --------------------------------------------------------

--
-- Table structure for table `semesters`
--

CREATE TABLE `semesters` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `start_month` varchar(20) NOT NULL,
  `end_month` varchar(20) NOT NULL,
  `status` enum('Active','Deactive') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `semesters`
--

INSERT INTO `semesters` (`id`, `name`, `start_month`, `end_month`, `status`, `created_at`) VALUES
(2, 'xyz', 'June', 'August', 'Active', '2025-08-01 14:02:39');

-- --------------------------------------------------------

--
-- Table structure for table `shifts`
--

CREATE TABLE `shifts` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shifts`
--

INSERT INTO `shifts` (`id`, `name`, `start_time`, `end_time`, `status`) VALUES
(4, 'Morning shift', '07:00:00', '12:00:00', 'Active'),
(5, 'Afternoon', '13:00:00', '17:00:00', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `sliders`
--

CREATE TABLE `sliders` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sliders`
--

INSERT INTO `sliders` (`id`, `heading`, `title`, `subtitle`, `image`) VALUES
(2, 'Nursery Program', 'Best Junior KG Education', 'Nurturing young mind with the best junior KG education for a bright future', '1753558325269_back-to-school-concept-portrait-little-smiling-clever-child-girl-glasses-going-first-time-backpack-holding-173890424.webp'),
(3, 'Primary Learning', 'Smart Start for Smart Kid', 'Modern classroom and expert faculty to build a strong foundation', '1753558395617_shocked-primary-school-girl-holding-stack-books-yellow-background-back-to-school-surprised-primary-school-girl-carrying-stack-383500538.webp'),
(5, 'Education', 'Smart Start for Smart Kid', 'Modern classroom and expert faculty to build a strong foundation', '1753906220758_2052943_1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `stream`
--

CREATE TABLE `stream` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stream`
--

INSERT INTO `stream` (`id`, `name`, `created_at`) VALUES
(9, 'Arts', '2025-08-04 10:18:09'),
(10, 'Commerce', '2025-08-04 10:18:16'),
(11, 'Science', '2025-08-04 10:18:26');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `mobile_number` varchar(20) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `class` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `gr_number` varchar(50) DEFAULT NULL,
  `admission_date` date DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `current_address` text DEFAULT NULL,
  `permanent_address` text DEFAULT NULL,
  `father_email` varchar(100) DEFAULT NULL,
  `father_mobile` varchar(20) DEFAULT NULL,
  `father_first_name` varchar(100) DEFAULT NULL,
  `father_last_name` varchar(100) DEFAULT NULL,
  `father_dob` date DEFAULT NULL,
  `father_occupation` varchar(100) DEFAULT NULL,
  `father_image` varchar(255) DEFAULT NULL,
  `mother_email` varchar(100) DEFAULT NULL,
  `mother_mobile` varchar(20) DEFAULT NULL,
  `mother_first_name` varchar(100) DEFAULT NULL,
  `mother_last_name` varchar(100) DEFAULT NULL,
  `mother_dob` date DEFAULT NULL,
  `mother_occupation` varchar(100) DEFAULT NULL,
  `mother_image` varchar(255) DEFAULT NULL,
  `guardian_email` varchar(100) DEFAULT NULL,
  `guardian_mobile` varchar(20) DEFAULT NULL,
  `guardian_first_name` varchar(100) DEFAULT NULL,
  `guardian_last_name` varchar(100) DEFAULT NULL,
  `guardian_dob` date DEFAULT NULL,
  `guardian_gender` varchar(10) DEFAULT NULL,
  `guardian_occupation` varchar(100) DEFAULT NULL,
  `guardian_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `stream` int(11) NOT NULL,
  `medium` int(11) NOT NULL,
  `section` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `first_name`, `last_name`, `mobile_number`, `gender`, `dob`, `class`, `category`, `gr_number`, `admission_date`, `image`, `current_address`, `permanent_address`, `father_email`, `father_mobile`, `father_first_name`, `father_last_name`, `father_dob`, `father_occupation`, `father_image`, `mother_email`, `mother_mobile`, `mother_first_name`, `mother_last_name`, `mother_dob`, `mother_occupation`, `mother_image`, `guardian_email`, `guardian_mobile`, `guardian_first_name`, `guardian_last_name`, `guardian_dob`, `guardian_gender`, `guardian_occupation`, `guardian_image`, `created_at`, `stream`, `medium`, `section`, `email`, `password`) VALUES
(1, 'John', 'Doe', '1234567891', 'Female', '2017-12-10', '1st', '2', '1234', '2025-08-02', '1754338447654-sakthi-sugars-ltd--600 - Copy.png', 'GAURAIPADA SANTOSH BHUVAN....', 'Nallasopara East', 'steve@gmail.com', '1234567890', 'Steve', 'Doe', '2025-08-05', 'test', NULL, 'rubina@gmail.com', '1234567890', 'Rubina', 'Doe', '2025-08-06', 'test dfd', NULL, 'gardi@gmail.com', '1234567890', 'test', 'testln', '2025-07-30', 'Female', 'test occupation', NULL, '2025-08-04 11:57:37', 9, 2, 'A', 'john@gmail.com', '$2b$10$dq1uulaBcfT4pg3DpRqVguIrSyJcR9j6M5LShW7IdzfRSl3OSrcf6'),
(2, 'Ravi', 'Vishwakarma', '1234567891', 'Female', '2016-10-24', '3rd', '2', '1235', '2025-07-07', NULL, 'GAURAIPADA SANTOSHwd BHUVAN....', 'Nallasopara', '', '1234567890', 'Aman', 'Vishwakarma', '1997-10-22', '', NULL, '', '1234567890', 'Urmila', NULL, '0000-00-00', '', NULL, '', '', '', '', '0000-00-00', '', '', NULL, '2025-08-04 20:19:00', 0, 3, 'B', 'ravi@gmail.com', '$2b$10$SV7L9qnKXM90CgUHi0R4suqptoQdluRYMk2zcA9Do4Y.CBH18cQr.');

-- --------------------------------------------------------

--
-- Table structure for table `student_category`
--

CREATE TABLE `student_category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_category`
--

INSERT INTO `student_category` (`id`, `name`) VALUES
(2, 'obc'),
(3, 'General');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `medium` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('Theory','Practical') NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `background` varchar(20) DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `medium`, `name`, `type`, `code`, `background`, `image_url`, `created_at`) VALUES
(3, '5', 'Sonam', 'Theory', 'IVKn', '#744220', '/uploads/subject/1754033543338-shocked-primary-school-girl-holding-stack-books-yellow-background-back-to-school-surprised-primary-school-girl-carrying-stack-383500538.webp', '2025-08-01 07:32:23'),
(4, '5', 'Sonam', 'Theory', 'IVKn', '#746920', '/uploads/subject/1754033587298-back-to-school-concept-portrait-little-smiling-clever-child-girl-glasses-going-first-time-backpack-holding-173890424.webp', '2025-08-01 07:33:07'),
(5, '3', 'Sonam Vishwakarma', 'Practical', 'IVKn', '#293b47', '/uploads/subject/1754052222042-ias-academy-in-hyderabad.jpg', '2025-08-01 10:46:16');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `qualification` varchar(150) DEFAULT NULL,
  `current_address` text DEFAULT NULL,
  `permanent_address` text DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `salary` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `first_name`, `last_name`, `gender`, `mobile`, `dob`, `email`, `qualification`, `current_address`, `permanent_address`, `image_url`, `salary`, `password`, `created_at`) VALUES
(9, 'John', 'jobi', 'Male', '1234567890', '2025-08-20', 'superadmin11@gmail.com', 'B.ed', 'test location', 'test location ', '/uploads/teacher/1754155484766_download (1).jpg', NULL, NULL, '2025-08-02 12:19:31'),
(10, 'Sonam', 'Vishwakarma', 'Female', '1234567891', '2025-08-03', 'sv@gmail.com', 'B.ed', 'test location', 'test location ', '/uploads/teacher/1754155044735_35.jpg', NULL, NULL, '2025-08-02 12:25:19'),
(12, 'John', 'Jobi', 'Male', '1234567890', '1998-10-15', 'john@gmail.com', 'B.ed', 'GAURAIPADA SANTOSH BHUVAN', 'GAURAIPADA SANTOSH BHUVAN', '/uploads/teacher/1754227916642_NO.jpg', '15000', '$2b$10$4fa8F2JQJL4IbNaxj18e5uM2k43AU0bpZFh/Fm1AH.gjrPv.945q.', '2025-08-03 13:31:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_us`
--
ALTER TABLE `about_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `apps`
--
ALTER TABLE `apps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leave_settings`
--
ALTER TABLE `leave_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mediums`
--
ALTER TABLE `mediums`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_event`
--
ALTER TABLE `school_event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_holidays`
--
ALTER TABLE `school_holidays`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `semesters`
--
ALTER TABLE `semesters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shifts`
--
ALTER TABLE `shifts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stream`
--
ALTER TABLE `stream`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_category`
--
ALTER TABLE `student_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_us`
--
ALTER TABLE `about_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `apps`
--
ALTER TABLE `apps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `leave_settings`
--
ALTER TABLE `leave_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mediums`
--
ALTER TABLE `mediums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `school_event`
--
ALTER TABLE `school_event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `school_holidays`
--
ALTER TABLE `school_holidays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `semesters`
--
ALTER TABLE `semesters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shifts`
--
ALTER TABLE `shifts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stream`
--
ALTER TABLE `stream`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `student_category`
--
ALTER TABLE `student_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
