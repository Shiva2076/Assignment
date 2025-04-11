const express = require('express');
const serverless = require('serverless-http');

// Import your existing app from server.js
// Adjust the path if needed based on where this file is located
const app = require('../../server');

// Export the serverless function
module.exports.handler = serverless(app);