# MyProject

## Overview
MyProject is a full-stack **eCommerce web application** built using **Angular** for the frontend and **.NET API** for the backend. The application allows users to browse products, manage carts, place orders, and features role-based authentication with **JWT** for security.

## Technologies Used
### Frontend (Angular)
- Angular
- TypeScript
- HTML, CSS
- Angular Material / Tailwind CSS (if applicable)
- RxJS

### Backend (.NET API)
- .NET Core / .NET 6+ 
- Entity Framework Core
- C#
- SQL Server
- JWT Authentication
- Role-Based Access Control (RBAC)

## Folder Structure
```
MyProject/
│── backend/   # .NET API project
│── frontend/  # Angular project
│── README.md
│── .gitignore
```

## Features
### **1. User Authentication**
- Implemented **JWT-based authentication**.
- Role-based access control with **Admin and User roles**.
- Secure login and registration endpoints.

### **2. Category Management**
- Admin can **add, update, delete, and view categories**.
- Users can view categories.

### **3. Product Management**
- Admin can **create, update, delete, and view products**.
- Users can browse and filter products.

### **4. Shopping Cart**
- Users can **add products to cart, update quantity, and remove items**.
- Cart items are stored and linked to user accounts.

### **5. Order Management**
- Users can **place orders**.
- Admin can **view all orders** and update order statuses.

### **6. Role-Based Authorization**
- **Admin:** Can manage products, categories, and orders.
- **User:** Can browse, add to cart, and place orders.

## Setup Instructions

### Backend (.NET API)
1. Navigate to the `backend/` folder:
   ```sh
   cd backend
   ```
2. Restore dependencies:
   ```sh
   dotnet restore
   ```
3. Update the database (if using migrations):
   ```sh
   dotnet ef database update
   ```
4. Run the API:
   ```sh
   dotnet run
   ```
5. The API should be running on `http://localhost:5000` (or as configured).

### Frontend (Angular)
1. Navigate to the `frontend/` folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the Angular app:
   ```sh
   ng serve
   ```
4. Open `http://localhost:4200` in the browser.

## Database Setup (SQL Server)
1. Create a database in SQL Server.
2. Update the connection string in `appsettings.json`:
   ```json
   "ConnectionStrings": {
      "DefaultConnection": "Server=YOUR_SERVER;Database=YOUR_DB;User Id=YOUR_USER;Password=YOUR_PASSWORD;"
   }
   ```
3. Apply migrations (if applicable):
   ```sh
   dotnet ef database update
   ```

## API Endpoints
### **Authentication**
| Method | Endpoint           | Description          |
|--------|-------------------|----------------------|
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | User login          |

### **Category Controller**
| Method | Endpoint          | Description        |
|--------|------------------|--------------------|
| GET    | /api/category    | Get all categories |
| POST   | /api/category    | Create a category  |
| PUT    | /api/category/{id} | Update a category |
| DELETE | /api/category/{id} | Delete a category |

### **Product Controller**
| Method | Endpoint          | Description      |
|--------|------------------|------------------|
| GET    | /api/products    | Get all products |
| POST   | /api/products    | Add a product    |
| PUT    | /api/products/{id} | Update a product |
| DELETE | /api/products/{id} | Delete a product |

### **Cart Controller**
| Method | Endpoint        | Description          |
|--------|----------------|----------------------|
| GET    | /api/cart      | Get user's cart     |
| POST   | /api/cart      | Add item to cart    |
| PUT    | /api/cart/{id} | Update cart item    |
| DELETE | /api/cart/{id} | Remove item from cart |

### **Order Controller**
| Method | Endpoint         | Description          |
|--------|-----------------|----------------------|
| GET    | /api/orders     | Get all orders (Admin) |
| POST   | /api/orders     | Place an order |
| PUT    | /api/orders/{id} | Update order status (Admin) |

## Contributing
Feel free to fork this repository and submit pull requests for improvements.

## License
This project is open-source and available under the [MIT License](LICENSE).

