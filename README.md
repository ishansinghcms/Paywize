# PayWize

Welcome to PayWize, an interactive and intelligent web application that leverages AI to enhance user experience with web content. This project uses the MERN stack, integrating React, Node.js, Express, and MongoDB, alongside advanced AI capabilities provided by the Hugging Face API and web crawling powered by Cheerio.

# Live Demo

https://paywize.netlify.app

## Overview

PayWize allows users to register with their email, access a dashboard displaying website interactions, and use an AI chat feature to ask questions about website content. The application ensures a seamless user experience with robust error handling on both the frontend and backend.

## Features

- **User Registration**: Users can register with an email.
- **Dashboard**: Displays website interaction data for all users and specific users.
- **AI Chat**: Allows users to select a website from a dropdown and ask questions related to the website content.
- **Error Handling**: Comprehensive error handling with informative messages.

## Tech Stack

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Netlify**: Hosting service for the frontend.

### Backend

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing user and interaction data.
- **Render**: Hosting service for the backend.

### AI Integration

- **Hugging Face API**: Provides AI capabilities for the chat feature.

### Web Crawling

- **Cheerio**: A fast, flexible, and lean implementation of core jQuery designed specifically for the server.

### Stack Justification

The MERN stack was chosen for this project because of the following reasons:

- **Developer Experience**: Having prior experience with the MERN stack allowed for faster development and easier debugging. The uniformity of JavaScript across the stack (frontend and backend) streamlined the development process.

- **Component-Based Architecture**: React's component-based architecture facilitated the creation of reusable UI components, enhancing code maintainability and scalability.

- **Non-Relational Database**: MongoDB's flexibility with schema design was ideal for handling the diverse and dynamic user interaction data, allowing for rapid iteration without the need for complex migrations.

- **Efficient Backend**: Node.js and Express provide a non-blocking, event-driven architecture that is well-suited for building scalable network applications. This was particularly beneficial for handling concurrent requests in our AI chat feature.

## Setup and Installation

1. **Clone the frontend repository**:

   ```bash
   git clone https://github.com/ishansinghcms/paywize-frontend.git
   cd paywize-frontend
   npm install
   npm run dev

   ```

2. **Clone the frontend repository**:

   ```bash
   git clone https://github.com/ishansinghcms/paywize-backend.git
   cd paywize-backend
   npm install
   node app.js

   ```

3. **Add environment variable in backend codebase by creating a .env file in the root directory**:
   ```bash
   MONGODB_URL=<your mongodb url>
   PORT= <some port>
   ACCESS_TOKEN= <hugging face API access token>
   ```
