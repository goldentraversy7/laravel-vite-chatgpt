# laravel-react-chat

## Environment

### Backend

- php: 8.1
- laravel/framework: 10.10

### Frontend

- react
- typescript
- react-router-dom
- tanstack/react-query
- axios
- tailwindcss
- antd for notification
- vite

## Installation

### Backend

- Move into the _backend_ directory: `cd backend`.
- copy the _.env.example_ file to _.env_ and fill in the values.
- Run `composer install` to install PHP dependencies.
- Run `php artisan migrate` to create the database tables.
- Run `php artisan db:seed` to seed the database with some data.

### Frontend

- Move into the _frontend_ directory: `cd frontend`.
- Copy `.env.example` to `.env` and fill in the values.
- Run `npm install` to install the dependencies.
- Run `npm run dev` to start the development server.
