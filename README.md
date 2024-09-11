## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
  - [Authentication](#authentication)
  - [Version Control](#version-control)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [API Integration](#api-integration)
- [Development server](#development-server)
- [Code scaffolding](#code-scaffolding)
- [Build](#build)
- [Running unit tests](#running-unit-tests)
- [Running end-to-end tests](#running-end-to-end-tests)
- [Further help](#further-help)

## Overview
CineGalaxy is an Angular-based client application tailored for movie lovers. It offers an engaging and easy-to-navigate interface that allows users to explore a wide range of movies, search for specific titles, and access detailed information about each film. Users can personalize their experience by managing their list of favorite movies and updating their profile information. With a focus on providing a smooth user experience and a responsive design, CineGalaxy creates a vibrant space for discovering and organizing movie content.

## Features

- User registration and login functionality
- View detailed information about individual movies
- Add and remove movies from a user's list of favorites
- Update user profile information
- Responsive design for various screen sizes
- Angular-based application
- Integration with a RESTful API backend
- Form validation for user inputs
- Movie filtering by genre
- User authentication and authorization
- Secure storage of user credentials
- Visually appealing UI with Bootstrap and custom styling

## Technologies Used

### Frontend
-Angular

### Backend
- Express.js
- Node.js

### Database
- MongoDB

### Authentication
- Passport.js

### Version Control
- Git

## Requirements

Before you begin, ensure you have met the following requirements:
* Node.js (version 14 or later)
* npm (comes with Node.js)
* Git

## Installation

To install MoviesFlix-Hub, follow these steps:

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies by running npm install

## Running the Application

After installation, start the development server: ng serve
The application should now be running on `http://localhost:4200` (or the port specified in your configuration).


## Deployment

This application is deployed and can be accessed at:

[https://moviesflix-hub.netlify.app](https://moviesflix-hub.netlify.app)

Please note that this is not hosted on GitHub Pages, but on (https://moviesflix-hub.netlify.app)

## API Integration

This frontend application interacts with a backend API. Below are the key endpoints used:

- `POST /login`: Authenticates a user and retrieves a JWT token
- `GET /movies`: Retrieves all movies (requires authentication)
- `GET /movies/:title`: Retrieves a specific movie by title
- `GET /genres/:name`: Retrieves genre information
- `GET /directors/:name`: Retrieves director information
- `POST /users`: Registers a new user
- `PUT /users/:username/update-username`: Updates a user's username
- `DELETE /users/:username`: Deletes a user account
- `POST /users/:username/favorites/:movieId`: Adds a movie to user's favorites
- `DELETE /users/:username/favorites/:movieId`: Removes a movie from user's favorites
- `GET /movie-of-the-day`: Retrieves a random "movie of the day"

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
