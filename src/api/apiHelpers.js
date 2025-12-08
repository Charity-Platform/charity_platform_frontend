import axios from './axios';

/**
 * Retry API call with exponential backoff
 * @param {Function} apiCall - The API call function to retry
 * @param {number} maxRetries - Maximum number of retry attempts (default: 3)
 * @param {number} delay - Initial delay in ms (default: 1000)
 * @returns {Promise} - The API response
 */
export const retryApiCall = async (apiCall, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 API Call Attempt ${attempt}/${maxRetries}`);
      const response = await apiCall();
      return response;
    } catch (error) {
      lastError = error;
      
      // Don't retry on client errors (4xx) except 408 (timeout) and 429 (too many requests)
      if (error.response?.status >= 400 && error.response?.status < 500) {
        if (error.response.status !== 408 && error.response.status !== 429) {
          console.error(`❌ Client error (${error.response.status}), not retrying`);
          throw error;
        }
      }
      
      if (attempt < maxRetries) {
        const waitTime = delay * Math.pow(2, attempt - 1); // Exponential backoff
        console.log(`⏳ Waiting ${waitTime}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
  
  console.error(`❌ All ${maxRetries} attempts failed`);
  throw lastError;
};

/**
 * Safe API call with error handling
 * @param {Function} apiCall - The API call function
 * @param {*} fallbackValue - Value to return on error (default: null)
 * @returns {Promise} - The API response or fallback value
 */
export const safeApiCall = async (apiCall, fallbackValue = null) => {
  try {
    const response = await retryApiCall(apiCall);
    return response;
  } catch (error) {
    console.error('Safe API call failed, returning fallback value:', error);
    return { data: fallbackValue };
  }
};

/**
 * Fetch with abort controller for cleanup
 * @param {Function} apiCall - The API call function
 * @param {AbortSignal} signal - Abort signal for cleanup
 * @returns {Promise} - The API response
 */
export const fetchWithAbort = async (apiCall, signal) => {
  try {
    const response = await apiCall({ signal });
    return response;
  } catch (error) {
    if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
      console.log('🛑 API call was cancelled');
      return null;
    }
    throw error;
  }
};

export default {
  retryApiCall,
  safeApiCall,
  fetchWithAbort
};
