This application consists of two main components:
- **Angular Frontend**: Dynamic form generation using Metawidget
- **Spring Boot Backend**: RESTful API for data persistence

## 📁 Project Structure

```
metawidget/
├── angular-frontend/          # Angular 20 frontend application
│   ├── src/app/
│   │   ├── person/           # Person management component
│   │   ├── metawidget-wrapper/  # Metawidget integration
│   │   ├── services/         # API services
│   │   └── app.*             # Main app files
│   ├── package.json
│   └── README.md
├── springboot-backend/        # Spring Boot backend application
│   ├── src/main/java/com/backend/
│   │   ├── entity/           # Data models (Person, Address)
│   │   ├── controller/        # REST controllers
│   │   └── response/         # API response wrappers
│   ├── pom.xml
│   └── README.md
└── README.md                  # This file
```

## 🛠️ Prerequisites

### Development Environment
- **Node.js 18+** and npm
- **Java 17+**
- **Maven 3.6+**
- **IDE**: VS Code, IntelliJ IDEA, or Eclipse

### System Requirements
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space
- **OS**: Windows, macOS, or Linux

## 🚀 Quick Start

### 1. Clone and Setup
```bash
# Navigate to project directory
cd metawidget

# Install frontend dependencies
cd angular-frontend
npm install

# Install backend dependencies
cd ../springboot-backend
mvn clean install
```

### 2. Start Backend (Terminal 1)
```bash
cd springboot-backend
mvn spring-boot:run
```
Backend will be available at: `http://localhost:8080`

### 3. Start Frontend (Terminal 2)
```bash
cd angular-frontend
npm start
```
Frontend will be available at: `http://localhost:4200`

### 4. Access Application
Open your browser and navigate to: `http://localhost:4200`

## 🔧 API Endpoints

### Base URL: `http://localhost:8080/api/person`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/person` | Save a new person with nested data |
| GET | `/api/person` | Retrieve all saved persons |

