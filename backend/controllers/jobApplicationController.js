const JobApplication = require('../models/JobApplication');

exports.getAllApplications = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    
    let filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (startDate || endDate) {
      filter.appliedDate = {};
      
      if (startDate) {
        filter.appliedDate.$gte = new Date(startDate);
      }
      
      if (endDate) {
        filter.appliedDate.$lte = new Date(endDate);
      }
    }
    
    const applications = await JobApplication.find(filter).sort({ appliedDate: -1 });
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getApplication = async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Job application not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.createApplication = async (req, res) => {
  try {
    const application = await JobApplication.create(req.body);
    
    res.status(201).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Job application not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Job application not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};