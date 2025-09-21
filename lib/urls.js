/**
 * Utility functions for URL handling
 */

/**
 * Creates a URL for a page with optional query parameters
 * @param {string} pathname - The path of the page (e.g., '/about')
 * @param {Object} [query={}] - Query parameters as key-value pairs
 * @returns {string} - Formatted URL with query parameters
 */
export const createPageUrl = (pathname, query = {}) => {
  // Remove leading slash if present for consistency
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  
  // Convert query object to URLSearchParams
  const queryParams = new URLSearchParams();
  
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });
  
  const queryString = queryParams.toString();
  
  // Return pathname with query string if there are any query parameters
  return queryString ? `${cleanPath}?${queryString}` : cleanPath;
};

/**
 * Example usage:
 * createPageUrl('/about', { id: 123, tab: 'details' })
 * Returns: "/about?id=123&tab=details"
 */
