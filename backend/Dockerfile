# -----------------------------
# Build stage
# -----------------------------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the source code and publish
COPY . ./
RUN dotnet publish -c Release -o /app/publish

# -----------------------------
# Runtime stage
# -----------------------------
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app/publish .

# Expose the port your app runs on
EXPOSE 8080

# Start the application
ENTRYPOINT ["dotnet", "backend.dll"]
