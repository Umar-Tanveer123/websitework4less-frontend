// Central API configuration
// Always using the production VPS URL

export const API_BASE_URL = 'https://187.77.207.147:5001';

export const API_URLS = {
  login: `${API_BASE_URL}/api/auth/login`,
  forgotPassword: `${API_BASE_URL}/api/auth/forgot-password`,
  resetPassword: `${API_BASE_URL}/api/auth/reset-password`,
  posts: `${API_BASE_URL}/api/posts`,
  upload: `${API_BASE_URL}/api/upload`,
};
