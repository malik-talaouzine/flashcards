# # -----------------------------
# # Build stage
# # -----------------------------
# FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
# WORKDIR /src

# # Copy project files and restore dependencies
# COPY *.csproj ./
# RUN dotnet restore

# # Copy the rest of the source code and publish
# COPY . ./
# RUN dotnet publish -c Release -o /app/publish

# # -----------------------------
# # Runtime stage
# # -----------------------------
# FROM mcr.microsoft.com/dotnet/aspnet:8.0
# WORKDIR /app

# # Copy the published output from the build stage
# COPY --from=build /app/publish .

# # Expose the port your app runs on
# EXPOSE 8080

# # Start the application
# ENTRYPOINT ["dotnet", "backend.dll"]
# -----------------------------
# Base image with SDK (for EF migrations and dev)
# -----------------------------
FROM mcr.microsoft.com/dotnet/sdk:8.0

WORKDIR /app

# Copy all project files
COPY . .

# Install dotnet-ef globally
RUN dotnet tool install --global dotnet-ef \
    && echo 'export PATH="$PATH:/root/.dotnet/tools"' >> /root/.bashrc

# Add tools to PATH for non-interactive shells
ENV PATH="$PATH:/root/.dotnet/tools"

# Build the project (optional, ensures dll exists)
RUN dotnet build

# Expose port
EXPOSE 8080

# Use dotnet run for development
ENTRYPOINT ["dotnet", "run", "--urls", "http://0.0.0.0:8080"]
