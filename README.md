# Altario Full-Stack Exercise 1223 (Generator only)

This repository contains my solution for the Altario exercise:
- **Frontend**: A React-based single-page application using Vite.
- **Backend**: A Node.js API server using express.

## Getting Started

### Prerequisites
- Node.js (v12+)
- npm (didn't test with yarn)

### Installation
Install dependencies for both backend and frontend:

```bash
npm run install
```

### Development Mode
To start the application in development mode (with live reloading for both backend and frontend):

```bash
npm run dev
```

---

## Build and Start Steps

### Building the Application
To build the backend and frontend for production:

```bash
npm run build
```

This will generate:
- Backend build in `backend/dist/`
- Frontend build in `frontend/dist/`

### Starting the Built Version
To run the built application:

```bash
npm run start
```

This will:
- Serve the **backend** using Node.js on `http://localhost:4000`.
- Serve the **frontend** using `live-server` on `http://localhost:3000`.

## Improvements

### Backend
- Add robust server-side validation.
- Use scalable design pattern like MVC.
- Add API documentation for better maintanability and communication

### Frontend
- Improve client-side error handling (UI error messages instead of relying on the console).
- Refactor CSS to Sass for better maintainability.
- Add more robust input validation for user fields.

### Overall
- Share TypeScript types between frontend and backend via a common module (e.g., a GitHub package).
- Add unit nd e2e tests (to ensure deterministic behavior and reliability).
- Improve the code structure for better maintainability and scalability.
- Enhance type safety and improve code readability.

## Technologies Used

### Backend
- **Node.js**  
- **Express**  
- **TypeScript**  
- **CORS**  
- **ts-node-dev**  
- **TSC**  

#### Frontend
- **React 18**  
- **Vite**  
- **Axios**  
- **React-Clock**  

### Tested On:

Windows Machine:
```
OS: Windows 11
System: AMD Ryzen 7 7800X3D (16 cores) + 32 GB RAM
Node.js: v22.11.0
npm: v10.9.0
Browser: Edge (Chromium)
```
