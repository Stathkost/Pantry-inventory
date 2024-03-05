// api.ts

import axios, { AxiosResponse, AxiosError } from "axios";

// Define a function for making API requests
const hanndle_request = async <T>(
  method: "get" | "post" | "put" | "delete",
  endpoint: string, // Pass the endpoint as a relative URL
  data?: object
): Promise<T> => {
  const baseUrl = "http://localhost:3001/api/"; // Define your base URL here

  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url: baseUrl + endpoint, // Combine the base URL and endpoint
      data,
    });

    return response.data;
  } catch (error: any) {
    throw (error as AxiosError).response?.data || error.message;
  }
};

export default hanndle_request;
