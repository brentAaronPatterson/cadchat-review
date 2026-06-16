# CADchat Review Application

A full-stack design review application built as part of the CADchat interview exercise.

## Live Deployment

### Frontend

https://cadchat-review-client.onrender.com

### Backend API

https://cadchat-review.onrender.com

Example API request:

```http
GET https://cadchat-review.onrender.com/api/reviews/cube-1
```

## Overview

This application allows users to review a 3D model, create comments, approve or reject reviews, and persist review decisions using a backend API and database.

### Features

* Interactive 3D cube using React Three Fiber
* Create review comments
* Persist reviews to the database
* Approve reviews
* Reject reviews
* Delete reviews and reset state
* REST API built with Express
* Supabase database persistence
* TypeScript throughout frontend and backend
* Fully deployed frontend and backend on Render

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Three Fiber
* Drei

### Backend

* Node.js
* Express
* TypeScript

### Database

* Supabase

### Hosting

* Render (Frontend)
* Render (Backend)

## Project Structure

```text
client/
    src/

server/
    src/
```

## Running the Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Running the Backend

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:3001
```

## API Endpoints

### Get Review

```http
GET /api/reviews/:cubeId
```

### Create Review

```http
POST /api/reviews
```

Request Body:

```json
{
  "cubeId": "cube-1",
  "text": "Review comment"
}
```

### Update Review Status

```http
PATCH /api/reviews/:id/status
```

Request Body:

```json
{
  "status": "approved"
}
```

or

```json
{
  "status": "rejected"
}
```

### Delete Review

```http
DELETE /api/reviews/:id
```

## Notes

This repository was created as part of the CADchat interview exercise.

The application is deployed publicly using Render for both the frontend and backend, with Supabase used for data persistence.

If given additional time, potential enhancements would include:

* Multiple reviewable objects
* Review history and audit trail
* User authentication
* Improved UI styling and design review workflows
* Loading and error states
* Automated test coverage

## Author

Brent Patterson
