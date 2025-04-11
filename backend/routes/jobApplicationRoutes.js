const express = require('express');
const router = express.Router();
const {
  getAllApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication
} = require('../controllers/jobApplicationController');

router.route('/')
  .get(getAllApplications)
  .post(createApplication);

router.route('/:id')
  .get(getApplication)
  .put(updateApplication)
  .delete(deleteApplication);

module.exports = router;