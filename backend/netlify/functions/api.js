const serverless = require('serverless-http');
const express = require('express');

// Create a new Express app for serverless environment
const app = express();

// Import your routes, middleware, etc.
// Don't import your entire server.js - instead, recreate the necessary parts
const routes = require('../../routes'); // adjust path as needed

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use your routes
app.use('/api', routes);

// Export the handler
module.exports.handler = serverless(app);
