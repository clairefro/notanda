const api = {
  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  },
};

export default api;
