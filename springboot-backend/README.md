# Person Management - Spring Boot Backend

A RESTful API backend for the Person Management application, built with Spring Boot 3.5. This backend provides comprehensive CRUD operations for managing person data with nested objects and collections.

## 🚀 Features

### ✨ Core Capabilities
- **RESTful API**: Complete CRUD operations for person management
- **Nested Object Support**: Handles complex Person → Address relationships
- **Collection Management**: Supports dynamic children arrays
- **CORS Enabled**: Cross-origin requests for Angular frontend
- **Data Validation**: Automatic validation and error handling
- **Structured Responses**: Consistent API response format

### 🏗️ Technical Stack
- **Spring Boot 3.5**: Latest Spring Boot framework
- **Java 17**: Modern Java features and performance
- **Lombok**: Reduces boilerplate code with annotations
- **Maven**: Dependency management and build automation
- **REST API**: HTTP-based communication protocol

## 📁 Project Structure

```
springboot-backend/
├── src/main/java/com/backend/
│   ├── entity/              # Data models
│   │   ├── Person.java      # Main person entity
│   │   └── Address.java     # Nested address entity
│   ├── controller/          # REST controllers
│   │   └── PersonController.java
│   ├── response/            # API response wrappers
│   │   └── PersonResponse.java
│   └── SpringbootBackendApplication.java
├── src/main/resources/
│   └── application.properties
└── pom.xml                  # Maven configuration
```

## 🛠️ Installation & Setup

### Prerequisites
- **Java 17+**: Required for Spring Boot 3.5
- **Maven 3.6+**: For dependency management
- **IDE**: IntelliJ IDEA, Eclipse, or VS Code

### Quick Start
```bash
# Clone the repository (if not already done)
cd springboot-backend

# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will be available at: `http://localhost:8080`

### Alternative Run Methods
```bash
# Using Maven wrapper
./mvnw spring-boot:run

# Using JAR file
mvn clean package
java -jar target/springboot-backend-0.0.1-SNAPSHOT.jar
```

## 🔧 API Documentation

### Base URL
```
http://localhost:8080/api/person
```

### Endpoints

#### 1. Save Person
**POST** `/api/person`

Creates a new person with nested address and children collection.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "age": 35,
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zipCode": "12345",
    "country": "USA"
  },
  "children": ["Alice", "Bob"]
}
```

**Response:**
```json
{
  "message": "Person saved successfully!",
  "person": { /* Person object */ },
  "totalPersons": 1
}
```

#### 2. Get All Persons
**GET** `/api/person`

Retrieves all saved persons.

**Response:**
```json
[
  {
    "firstName": "John",
    "lastName": "Doe",
    "age": 35,
    "address": { /* Address object */ },
    "children": ["Alice", "Bob"]
  }
]
```

### Data Models

#### Person Entity
```java
@Data
public class Person {
    private String firstName;
    private String lastName;
    private int age;
    private Address address;
    private List<String> children;
}
```

#### Address Entity
```java
@Data
public class Address {
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String country;
}
```

#### PersonResponse
```java
public class PersonResponse {
    private String message;
    private Person person;
    private int totalPersons;
}
```

## 🏗️ Architecture

### Controller Layer
- **PersonController**: Handles HTTP requests and responses
- **CORS Configuration**: Enables cross-origin requests
- **Error Handling**: Comprehensive exception management

### Entity Layer
- **Person**: Main business entity with nested objects
- **Address**: Nested entity for person addresses
- **Lombok Integration**: Automatic getters, setters, and constructors

### Response Layer
- **PersonResponse**: Structured API response format
- **Consistent Format**: Standardized response structure

## 🔍 Key Features

### Nested Object Handling
The backend seamlessly handles complex nested structures:

```java
// Person with nested Address
Person person = new Person();
person.setFirstName("John");
person.setAddress(new Address("123 Main St", "Anytown", "CA", "12345", "USA"));
```

### Collection Management
Dynamic collections are fully supported:

```java
// Person with children collection
List<String> children = Arrays.asList("Alice", "Bob");
person.setChildren(children);
```

### CORS Configuration
Cross-origin requests are enabled for frontend integration:

```java
@CrossOrigin(origins = "*")
@RestController
public class PersonController {
    // Controller methods
}
```

### Data Persistence
- **In-Memory Storage**: Simple ArrayList for demo purposes
- **Thread-Safe**: Concurrent access handling
- **Data Integrity**: Consistent data structure maintenance

## 🚀 Development

### Running in Development Mode
```bash
# Start the application
mvn spring-boot:run

# With debug logging
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Dlogging.level.com.backend=DEBUG"
```

### Building for Production
```bash
# Create executable JAR
mvn clean package

# Run the JAR
java -jar target/springboot-backend-0.0.1-SNAPSHOT.jar
```

### Configuration
The application uses default Spring Boot configuration. Key settings:

```properties
# application.properties
server.port=8080
spring.application.name=springboot-backend
```

## 🔧 API Usage Examples

### Using curl
```bash
# Save a person
curl -X POST http://localhost:8080/api/person \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "age": 35,
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "zipCode": "12345",
      "country": "USA"
    },
    "children": ["Alice", "Bob"]
  }'

# Get all persons
curl -X GET http://localhost:8080/api/person
```

### Using JavaScript/Fetch
```javascript
// Save a person
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 35,
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    country: "USA"
  },
  children: ["Alice", "Bob"]
};

fetch('http://localhost:8080/api/person', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(person)
})
.then(response => response.json())
.then(data => console.log(data));
```

## 🎯 Integration with Frontend

### Angular Integration
The backend is designed to work seamlessly with the Angular frontend:

1. **CORS Enabled**: Allows requests from `http://localhost:4200`
2. **JSON Format**: All responses in JSON format
3. **Error Handling**: Structured error responses
4. **Data Validation**: Automatic validation of incoming data

### Request Flow
```
Angular Frontend → HTTP Request → Spring Boot Backend
                ← JSON Response ←
```

## 🔍 Logging and Debugging

### Console Output
The application provides comprehensive logging:

```
=== Received Person Data ===
Name: John Doe
Age: 35
Address: 123 Main St, Anytown
Children: Alice, Bob
=============================
```

### Debug Configuration
Enable debug logging by setting:

```properties
logging.level.com.backend=DEBUG
logging.level.org.springframework.web=DEBUG
```

## 🚀 Deployment

### Local Development
```bash
mvn spring-boot:run
```

### Production Deployment
```bash
# Build the application
mvn clean package

# Run with production profile
java -jar target/springboot-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

### Docker Deployment
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/springboot-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 🔧 Configuration Options

### Application Properties
```properties
# Server configuration
server.port=8080
server.servlet.context-path=/api

# Logging configuration
logging.level.com.backend=INFO
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n

# CORS configuration
spring.web.cors.allowed-origins=*
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE
spring.web.cors.allowed-headers=*
```

## 🎉 Features Demonstrated

### ✅ Metawidget Integration
- **Dynamic Data Handling**: Processes complex nested structures
- **Collection Support**: Manages dynamic arrays
- **Type Safety**: Full Java type system integration
- **Validation**: Automatic data validation and error handling

### ✅ REST API Best Practices
- **HTTP Methods**: Proper use of GET, POST
- **Status Codes**: Appropriate HTTP response codes
- **Content Types**: JSON request/response format
- **Error Handling**: Comprehensive error responses

### ✅ Spring Boot Features
- **Auto-Configuration**: Minimal configuration required
- **Embedded Server**: Tomcat server included
- **Dependency Injection**: IoC container management
- **Actuator**: Health checks and monitoring (if enabled)

## 📝 Code Quality

### Lombok Integration
- **@Data**: Automatic getters, setters, toString, equals, hashCode
- **Clean Code**: Reduced boilerplate code
- **Maintainability**: Easier code maintenance

### Error Handling
- **Exception Management**: Comprehensive error handling
- **Response Consistency**: Standardized error responses
- **Logging**: Detailed error logging for debugging

### Documentation
- **Code Comments**: Extensive inline documentation
- **API Documentation**: Clear endpoint descriptions
- **Examples**: Practical usage examples

## 🔗 Frontend Integration

This backend is designed to work with the Angular frontend:

1. **Start Backend**: `mvn spring-boot:run` (port 8080)
2. **Start Frontend**: `npm start` (port 4200)
3. **Access Application**: `http://localhost:4200`

The backend provides all necessary endpoints for the Metawidget Person Management application, supporting complex nested data structures and dynamic collections.

## 🎯 Next Steps

### Potential Enhancements
- **Database Integration**: Replace in-memory storage with JPA/Hibernate
- **Authentication**: Add security and user management
- **Validation**: Enhanced data validation with Bean Validation
- **Testing**: Comprehensive unit and integration tests
- **Documentation**: OpenAPI/Swagger documentation
- **Monitoring**: Health checks and metrics

This backend provides a solid foundation for the Metawidget Person Management application, demonstrating modern Spring Boot development practices and RESTful API design.
