# Goodstart-backend
## Description
Goodstart backend using Spring Boot microservices to create REST APIs to serve our frontend

## Getting Started

### Downloading project
```shell
git clone https://github.com/jovanwongzixi/Goodstart-backend.git
cd Goodstart-frontend
```

### Installing dependencies
```shell
mvn clean install
```

### Starting project in localhost
```shell
mvn spring-boot:run
```

### Running project in Docker
```shell
docker build --tag=goodstart:latest .
docker run -p8080:8080 goodstart:latest
```