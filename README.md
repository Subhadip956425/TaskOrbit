# TaskOrbit

**TaskOrbit** is a project management application built with **Spring Boot**, **React**, **MongoDB**, and **MySQL**. It enables effective project tracking, task management, and team collaboration.  

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Prerequisites](#prerequisites)  
- [Setup & Installation](#setup--installation)  
  - [Backend (Spring Boot)](#backend-spring-boot)  
  - [Frontend (React)](#frontend-react)  
- [Database Configuration](#database-configuration)  
- [Running the Application](#running-the-application)  
- [Usage](#usage)  
- [Deployment](#deployment)  
- [Environment Variables](#environment-variables)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)

---

## Features

- Create, read, update, delete (CRUD) tasks and projects  
- User authentication and authorization (if applicable)  
- Responsive UI with React  
- RESTful API powered by Spring Boot  
- Data storage using MongoDB and MySQL  

---

## Tech Stack

- **Backend**: Spring Boot (Java)  
- **Frontend**: React (JavaScript/TypeScript)  
- **Databases**: MongoDB (NoSQL) and MySQL (Relational)  
- **Build Tools**: Maven/Gradle (backend), npm/yarn (frontend)  
- **Runtime**: Java 17+ (adjust as needed), Node.js version X.X.X  

---

## Prerequisites

Make sure you have the following installed:

- Java JDK 17+  
- Maven or Gradle  
- Node.js and npm (or yarn)  
- MongoDB instance (local or cloud)  
- MySQL instance (local or cloud)  

---

## Setup & Installation

### Backend (Spring Boot)

```bash
# Navigate to the backend directory
cd projectmanagementsystem  # or wherever your Spring Boot project resides

# Build the project
mvn clean install
# or
./mvnw clean install

# Run the application
mvn spring-boot:run
# or
./mvnw spring-boot:run
```

### Frontend (React)

```bash
# Navigate to the frontend directory
cd project-management-react  # or the correct path

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm start
# or
yarn start
```

---

## Running the Application

1. Start **MongoDB** and **MySQL** services.  
2. Run the **backend** using Spring Boot.  
3. Run the **frontend** using React.  
4. Open [http://localhost:3000](http://localhost:3000) in your browser.  

---

## Usage

- **Login / Register** users  
- **Create Projects** and manage them  
- **Add Tasks** to projects  
- **Update Progress** and track completion  
- **Delete Tasks/Projects** when no longer needed  

---

## Contributing

Contributions are welcome! 🎉  

1. Fork this repo  
2. Create a branch:  
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Add feature"
   ```
4. Push to your branch:  
   ```bash
   git push origin feature/your-feature
   ```
5. Submit a Pull Request  

---

## License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.  

---

## Contact

**Author:** Subhadip Guchhait  

- GitHub: [Subhadip956425](https://github.com/Subhadip956425)  
- Email: subhadipguchhait106@gmail.com  
