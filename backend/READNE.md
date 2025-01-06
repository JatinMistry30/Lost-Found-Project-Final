# Database Schema for Lost and Found System

## `users` Table

This table stores information about the users.

### Columns:
- `id` (int, NOT NULL): Unique identifier for the user.
- `username` (varchar(50), NOT NULL): Username of the user.
- `email` (varchar(100), NOT NULL): Email address of the user.
- `password` (varchar(255), NOT NULL): User's password.
- `age` (int, DEFAULT NULL): Age of the user.
- `course` (varchar(255), DEFAULT NULL): The course the user is enrolled in.
- `year` (int, DEFAULT NULL): Year of study of the user.
- `mobile_number` (varchar(20), DEFAULT NULL): Mobile number of the user.

---

## `items` Table

This table stores information about the items reported as lost or found.

### Columns:
- `id` (int, NOT NULL): Unique identifier for the item.
- `userId` (int, NOT NULL): Foreign key referencing the user who reported the item.
- `type` (enum('lost', 'found'), NOT NULL): Type of the item (whether it's lost or found).
- `itemName` (varchar(255), NOT NULL): Name of the item.
- `description` (text, DEFAULT NULL): Description of the item.
- `category` (varchar(100), NOT NULL): Category of the item (e.g., electronics, clothing).
- `location` (varchar(255), NOT NULL): Location where the item was lost/found.
- `date_reported` (datetime, NOT NULL): Date when the item was reported.
- `time_reported` (time, NOT NULL): Time when the item was reported.
- `photoPath` (varchar(255), DEFAULT NULL): Path to a photo of the item.
- `status` (enum('active', 'resolved', 'pending_claim', 'claimed'), DEFAULT 'active'): Status of the item.
- `created_at` (timestamp, NOT NULL): Timestamp when the record was created.
- `updated_at` (timestamp, NOT NULL, ON UPDATE current_timestamp()): Timestamp when the record was last updated.

---

## `found_reports` Table

This table stores the reports of found items, including details about the finder.

### Columns:
- `id` (int, NOT NULL): Unique identifier for the found report.
- `item_id` (int, NOT NULL): Foreign key referencing the item that was found.
- `location` (varchar(255), NOT NULL): Location where the item was found.
- `description` (text, NOT NULL): Description of how the item was found.
- `photo_path` (varchar(255), NOT NULL): Path to a photo of the found item.
- `finder_id` (int, NOT NULL): ID of the user who found the item.
- `finder_mobile` (varchar(15), NOT NULL): Mobile number of the finder.
- `finder_email` (varchar(255), NOT NULL): Email address of the finder.
- `created_at` (timestamp, NOT NULL): Timestamp when the report was created.
- `item_owner_id` (int, NOT NULL): ID of the item owner.
- `item_owner_username` (varchar(100), NOT NULL): Username of the item owner.
- `item_owner_email` (varchar(100), NOT NULL): Email address of the item owner.
- `status` (varchar(20), DEFAULT 'pending'): Status of the found report (e.g., pending, accepted, rejected).

---

## `claim_reports` Table

This table stores the claim reports made by the owners of lost items, providing details of the claim.

### Columns:
- `id` (int, NOT NULL): Unique identifier for the claim report.
- `item_id` (int, NOT NULL): Foreign key referencing the lost item being claimed.
- `location` (varchar(255), NOT NULL): Location where the claim was made.
- `description` (text, NOT NULL): Description of the claim by the item owner.
- `photo_path` (varchar(255), NOT NULL): Path to a photo related to the claim.
- `finder_id` (int, NOT NULL): ID of the user who found the item.
- `finder_mobile` (varchar(15), NOT NULL): Mobile number of the finder.
- `finder_email` (varchar(255), NOT NULL): Email address of the finder.
- `created_at` (timestamp, NOT NULL): Timestamp when the claim report was created.
- `item_owner_id` (int, NOT NULL): ID of the item owner.
- `item_owner_username` (varchar(100), NOT NULL): Username of the item owner.
- `item_owner_email` (varchar(100), NOT NULL): Email address of the item owner.
- `status` (varchar(20), DEFAULT 'pending'): Status of the claim report (e.g., pending, accepted, rejected).

---
