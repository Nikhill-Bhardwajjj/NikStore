# Use the official .NET SDK image for building the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Clear NuGet caches to avoid Windows-specific fallback paths
RUN dotnet nuget locals all --clear

# Copy only the .csproj file first to restore dependencies (from the subfolder)
COPY EcommerceWeb/EcommerceWeb.csproj ./EcommerceWeb/
RUN dotnet restore "./EcommerceWeb/EcommerceWeb.csproj" --disable-parallel

# Copy the rest of the project files
COPY . ./

# Remove obj and bin folders to clear cached NuGet configuration and build artifacts
RUN rm -rf EcommerceWeb/obj EcommerceWeb/bin

# Build and publish the application
RUN dotnet publish "./EcommerceWeb/EcommerceWeb.csproj" -c Release -o /app/publish

# Use the official .NET runtime image for running the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the published app from the build stage
COPY --from=build /app/publish .

# Expose the required port
EXPOSE 8080

# Start the application
ENTRYPOINT ["dotnet", "EcommerceWeb.dll"]