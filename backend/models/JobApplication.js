const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  appliedDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  link: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);