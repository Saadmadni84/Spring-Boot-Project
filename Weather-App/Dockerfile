# ─────────────────────────────────────────────
# Stage 1: Build
# ─────────────────────────────────────────────
FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /app

# Copy Maven wrapper and pom first (layer caching — only re-downloads deps when pom changes)
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Download dependencies (cached layer)
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the JAR, skip tests (tests can be run separately in CI)
RUN ./mvnw clean package -DskipTests -B

# ─────────────────────────────────────────────
# Stage 2: Runtime
# ─────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Create a non-root user for security best practices
RUN addgroup -S spring && adduser -S spring -G spring

# Copy the built JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Switch to non-root user
USER spring:spring

# Expose the default Spring Boot port
EXPOSE 8080

# Pass the API key as an environment variable at runtime
ENV WEATHER_API_KEY=""

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]
