# **Carra: Car Forum for Enthusiasts and DIYers**

Welcome to **Carra**, a forum dedicated to all things car-related! Whether you're a car enthusiast, DIYer, or someone looking for answers to your car questions, Carra is the place to be. Users can post questions, receive answers from others, and engage in discussions just like on popular platforms like **Reddit** or **Quora**.

This project is a collaboration between **Matthew Satterwhite** and myself, showcasing my full-stack development skills with a **Go backend** and a **React frontend**. It integrates modern technologies such as **Go & GORM** for the backend, and **Vite, TypeScript, React, Redux, Redux Toolkit, Tailwind CSS** for the frontend. The application also follows best practices for code quality with **Prettier** and **ESLint** for consistent formatting and linting. We also utilize **CI workflows with GitHub Actions** to automate testing, linting, and deployment processes.

---

## **Features**

- **Post Questions**: Users can post their car-related questions.
- **Receive Answers**: Community members can respond to posts with answers.
- **Sorting by Topic**: Sort questions by specific topics to find what interests you.
- **Like Comments**: Engage with answers and comments by liking them.
- **User Profiles**: Personalized profiles for users to track their posts and interactions.
- **Comment and Discuss**: Users can comment on questions and replies to further discuss solutions or share ideas.

---

## **Tech Stack**

### **Backend**

- **Go**: The backend is built using Go, which provides strong concurrency and performance.
- **GORM**: Object Relational Mapper (ORM) for Go, used to interact with the database.
- **PostgreSQL**: Relational database for storing user data, questions, and answers.

### **Frontend**

- **Vite**: Fast and optimized build tool for modern web development.
- **React**: JavaScript library for building user interfaces, providing a component-based structure.
- **TypeScript**: A superset of JavaScript that introduces static types, ensuring robust code.
- **Redux & Redux Toolkit**: State management for the frontend, allowing the app to manage and centralize state.
- **React Hooks**: Functional components with hooks for managing state, side-effects, and context.
- **Tailwind CSS**: Utility-first CSS framework that allows for rapid UI development with a focus on responsiveness.
- **Prettier**: Code formatter that ensures consistent styling across the codebase.
- **ESLint**: Linter for identifying and fixing problems in JavaScript and TypeScript code.

---

## **Installation**

### **Backend Setup**

1. Clone the repository:

   ```bash
   git clone https://github.com/Eric-Cortez/Carra.git
   cd carra/backend
   ```

2. Install Go dependencies:

   ```bash
   go mod tidy
   ```

3. Create a PostgreSQL database:

- If you don't have PostgreSQL installed, follow the official documentation to install it.

- Create a new database and user for the application.

- Example (in PostgreSQL terminal):

  ```sql
      CREATE DATABASE carra_db;
      CREATE USER carra_user WITH PASSWORD 'yourpassword';
      ALTER ROLE carra_user SET client_encoding TO 'utf8';
      ALTER ROLE carra_user SET default_transaction_isolation TO 'read committed';
      ALTER ROLE carra_user SET timezone TO 'UTC';
      GRANT ALL PRIVILEGES ON DATABASE carra_db TO carra_user;
  ```

4. Create a .env file in the backend directory with your environment variables. You can use the provided example .env.example as a template:

   ```bash
   cp .env.example .env
   ```

   Open the .env file and configure the following environment variables:

   Example .env file:

   ```bash
    DB="host=localhost user= password= dbname= port=5432 sslmode=disable"
   ```

   Replace `yourpassword` with the password you set for the PostgreSQL user.
   Set PORT and JWT_SECRET

   Adjust the database URL if needed.

5. Run the backend serve

   ```bash
   go run main.go
   ```

   The backend should now be running locally at http://localhost:8080.
