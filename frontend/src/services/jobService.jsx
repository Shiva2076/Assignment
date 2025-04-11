
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/jobs';

export const getJobApplications = async (filters = {}) => {
  try {
    let queryParams = new URLSearchParams();
    
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.endDate) queryParams.append('endDate', filters.endDate);
    
    const response = await axios.get(`${API_URL}?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
export const getJobApplication = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const createJobApplication = async (jobData) => {
  try {
    const response = await axios.post(API_URL, jobData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
export const updateJobApplication = async (id, jobData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, jobData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteJobApplication = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};