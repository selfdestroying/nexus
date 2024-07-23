# Nexus (Online Store)

An online store application with a frontend built using Vite, React, React Router, React Query, ShadCN/UI, Axios, and Tailwind CSS. The backend is built using Python and Django REST Framework. The application is containerized using Docker, with Nginx serving the frontend and Gunicorn running the backend.

![main page](https://kappa.lol/9l3Pn) ![products page](https://kappa.lol/feZKq)

## Table of Contents

- [Nexus (Online Store)](#nexus-online-store)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Clone the Repository](#clone-the-repository)
    - [Environment Variables](#environment-variables)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [Usage](#usage)
    - [Running Locally](#running-locally)
      - [Backend](#backend)
      - [Frontend](#frontend)
    - [Running with Docker](#running-with-docker)
  - [Docker Setup](#docker-setup)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- Product listing with filtering and infinite scrolling
- User authentication and authorization
- Shopping cart
- Order processing (in future)

## Prerequisites

- Docker and Docker Compose
- Node.js and yarn (for local development)
- Python 3.12+ and pip (for local development)

## Installation

### Clone the Repository

```bash
git clone https://github.com/selfdestroying/nexus.git
cd nexus
```

### Environment Variables

Create a .env file in the root directory and add the following variables:

```makefile
# Backend
DJANGO_SECRET_KEY=your_secret_key
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost

# Database
POSTGRES_DB=your_db
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_HOST=db
POSTGRES_PORT=5432

# Frontend
VITE_API_URL=http://localhost/api
```

### Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Run database migrations:

```bash
python manage.py migrate
```

Create a superuser:

```bash
python manage.py createsuperuser
```

### Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install the required npm packages:

```bash
npm install
```

## Usage

### Running Locally

#### Backend

Navigate to the backend directory and start the development server:

```bash
python manage.py runserver
```

#### Frontend

Navigate to the frontend directory and start the development server:

```bash
npm run dev
```

### Running with Docker

Build and run the Docker containers:

```bash

docker-compose up --build
```

<!-- ## Development -->

<!-- ### Backend -->
<!-- Run the tests:

bash
Копировать код
python manage.py test
Frontend
Run the tests:

bash
Копировать код
npm run test -->

## Docker Setup

- `Dockerfile`: Defines the Docker images for the frontend and backend.
- `docker-compose.yml`: Defines and configures the Docker containers for the application.
  To build and start the application with Docker, run:

```bash
docker-compose up --build
```

To stop the application, run:

```bash
docker-compose down
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

Feel free to adjust the sections according to your project specifics and provide additional details if needed.
