# MERN Application-Auth Panel

## Project Overview

This project is a MERN (MongoDB, Express.js, React, Node.js) stack-based Admin Panel application. It includes user authentication, employee management, and CRUD operations with validation mechanisms.

### Features

- User login with authentication and dashboard management.
- Employee management, including creation, editing, and deletion.
- Server-side and client-side form validation.
- Data persistence using MongoDB.
- User-friendly interface with sorting, filtering, and pagination.

---

## Setup Instructions

### Prerequisites

1. Node.js installed on your system.
2. MongoDB installed or access to a MongoDB cloud database.
3. Git for version control.

### Steps

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <project_folder>
   ```
2. Install dependencies for both the server and client:
   ```bash
   # Backend dependencies
   cd server
   npm install

   # Frontend dependencies
   cd ../client
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the `server` folder.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=<your_mongo_database_uri>
     JWT_SECRET=<your_secret_key>
     ```
4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run start

   # Start frontend server
   cd ../client
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

---

## Dependencies

### Frontend (`client/package.json`)

#### Key Dependencies

- **React**: `^18.3.1`
- **React DOM**: `^18.3.1`
- **React Redux**: `^9.1.2`
- **React Router DOM**: `^6.28.0`
- **Axios**: `^1.7.7`
- **@reduxjs/toolkit**: `^2.3.0`
- **Tailwind CSS**: `^3.4.15`

#### Dev Dependencies

- **Vite**: `^5.4.10`
- **@vitejs/plugin-react**: `^4.3.3`
- **ESLint**: `^9.13.0`
- **Autoprefixer**: `^10.4.20`

### Backend (`server/package.json`)

#### Key Dependencies

- **Express**: `^4.21.1`
- **Mongoose**: `^8.8.1`
- **jsonwebtoken**: `^9.0.2`
- **bcrypt** / **bcryptjs**: `^5.1.1` / `^2.4.3`
- **dotenv**: `^16.4.5`
- **multer**: `^1.4.5-lts.1`
- **cookie-parser**: `^1.4.7`

---

## Database Tables

### `t_login`

| Field       | Description   |
| ----------- | ------------- |
| f\_sno      | Serial number |
| f\_userName | Username      |
| f\_Pwd      | Password      |

### `t_Employee`

| Field          | Description          |
| -------------- | -------------------- |
| f\_Id          | Unique ID            |
| f\_Image       | Image path           |
| f\_Name        | Employee name        |
| f\_Email       | Email                |
| f\_Mobile      | Mobile number        |
| f\_Designation | Job designation      |
| f\_gender      | Gender               |
| f\_Course      | Selected courses     |
| f\_Createdate  | Record creation date |

---

## Validations

### Login Page

- Validate user inputs (server-side and client-side using JavaScript/jQuery).
- Check login credentials:
  - If valid, redirect to the dashboard.
  - If invalid, display an alert with invalid login details.
- Manage the username on the dashboard using local storage or cookies.

### Create Employee

- Fields:
  - **Name**: Textbox (required).
  - **Email**: Textbox (validate format and check for duplicates).
  - **Mobile No**: Textbox (numeric validation).
  - **Designation**: Dropdown (e.g., HR, Manager, Sales).
  - **Gender**: Radio buttons (Male/Female).
  - **Course**: Checkboxes (MCA, BCA, BSC).
  - **Image Upload**: File upload (only JPG/PNG files).
- Validation required on all fields using server-side and client-side checks.

### Employee List

- Features:
  - Display employee details with sorting, filtering, and pagination.
  - Actions: Edit and Delete employees.
  - Toggle active/inactive status.
  - Total count display and search functionality.

### Edit Employee

- Pre-fill all fields on page load for editing.
- Apply the same validation rules as in "Create Employee."

---

## Notes

- Ensure all validations are implemented server-side for security.
- Use JWT for user authentication and session management.
- Implement responsive design for compatibility with all devices.

---

## Technologies Used

- **Frontend**: React.js, JavaScript, HTML5, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Others**: JWT, Axios, jQuery

---

## Future Enhancements

- Add role-based access control for users.
- Integrate advanced search and filters for the employee list.
- Optimize performance for large datasets.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

