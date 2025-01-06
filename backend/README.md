# Database Schema

## `users`
| column name | data type | details |
|-------------|-----------|---------|
| id | integer | not null, primary key |
| username | varchar | not null |
| email | varchar | not null, indexed, unique |
| hashedPassword | varchar | |
| createdAt | timestamp | not null |
| updatedAt | timestamp | not null |
* index on `email, unique:true`

## `questions`
| column name | data type | details |
|-------------|-----------|---------|
| id | integer | not null, primary key |
| title | varchar | not null |
| content | text | not null |
| userId | integer | not null, foreign key |
| topicId | integer | not null, foreign key |
| createdAt | timestamp | not null |
| updatedAt | timestamp |not null |
* `userId` references `users` table
* `topicId` references `topics` table

## `answers`
| column name | data type | details |
|-------------|-----------|---------|
| id | integer | not null, primary key |
| content | text | not null |
| userId | integer | not null, foreign key |
| questionId | integer | not null, foreign key |
| createdAt | timestamp | not null |
| updatedAt | timestamp | not null |
* `userId` references `users` table
* `questionId` references `questions` table

## `comments`
| column name | data type | details |
|-------------|-----------|---------|
| id | integer | not null, primary key |
| content | text | not null |
| userId | integer | not null, foreign key |
| answerId | integer | not null, foreign key |
| createdAt | timestamp | not null |
| updatedAt | timestamp | not null |
* `userId` references `users` table
* `answerId` references `answers` table

## `votes`
| column name | data type | details |
|-------------|-----------|---------|
| id | integer | not null, primary key |
| userId | integer | not null, indexed, foreign key |
| questionId | integer | not null, indexed, foreign key |
| createdAt | timestamp | not null |
| updatedAt | timestamp | not null |
* `userId` references `users` table
* `questionId` references `questions` table
* Unique indexed on `[userId, questionId]`

## `topics`
| column name | data type | details |
|-------------|-----------|---------|
| id | integer | not null, primary key |
| name | varchar | not null |
| userId | integer | not null, foreign key |
| createdAt | timestamp | not null |
| updatedAt | timestamp | not null |
* `userId` references `users` table

