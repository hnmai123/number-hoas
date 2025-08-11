# Number Hoas

A full-stack application for managing and playing number-based games (inspiration from FizzBuzz), built with Next.js (frontend) and ASP.NET Core (backend).

## Project Structure

- **backend/**: ASP.NET Core Web API
  - `controllers/`: API controllers for game logic, feedback, questions, rules, and sessions
  - `models/`: Entity models for the database
  - `services/`: Business logic
  - `data/`: Entity Framework Core context
  - `Migrations/`: Database migrations
  - `appsettings.json`: Configuration files
  - `Dockerfile`: Containerization for backend

- **frontend/**: Next.js app with TypeScript and Tailwind CSS
  - `src/app/`: Main app pages and routes
  - `src/components/`: Reusable React components
  - `src/utils/`: Utility types and functions
  - `public/`: Static assets
  - `Dockerfile`: Containerization for frontend

## Getting Started

### Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js (v18+)](https://nodejs.org/)
- [Docker](https://www.docker.com/) (optional, for containerization)

### Running Locally

#### Backend
```bash
cd backend
# Restore dependencies
dotnet restore
# Run migrations (if needed)
dotnet ef database update
# Start the API
dotnet run
```

#### Frontend
```bash
cd frontend
# Install dependencies
npm install
# Start the Next.js app
npm run dev
```

### Using Docker Compose

To run both frontend and backend with Docker Compose:
```bash
docker-compose up --build
```

## API Endpoints
See `backend/controllers/` for available endpoints (games, sessions, feedback, etc).

## Customization
- Update backend logic in `backend/services/NumberHoasLogic.cs`
- Modify frontend UI in `frontend/src/app/` and `frontend/src/components/`

## License
MIT
