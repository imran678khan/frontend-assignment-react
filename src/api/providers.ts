/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'https://api.apis.guru/v2/';

interface Provider {
  [key: string]: any;
}

export const getProviders = async (): Promise<Provider> => {
  try {
    const response = await axios.get<Provider>(
      `${API_BASE_URL}/providers.json`,
    );

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error('Failed to fetch providers: Non-successful status code.');
    }
  } catch (error: unknown) {
    handleAxiosError(error);
    throw new Error('An error occurred while fetching providers.');
  }
};

export const getProviderDetail = async (providerName: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}${providerName}.json`);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(
        `Failed to fetch details for provider: ${providerName}, Non-successful status code.`,
      );
    }
  } catch (error: unknown) {
    handleAxiosError(error);
    throw new Error(`Failed to fetch details for provider: ${providerName}`);
  }
};

const handleAxiosError = (error: unknown): void => {
  if (error instanceof AxiosError) {
    if (!error.response) {
      console.error('Network error or no response received:', error.message);
      throw new Error('Network error: Failed to connect to the API.');
    }

    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(
        error.response.data?.message ||
          'An error occurred with the API response.',
      );
    }

    if (error.request) {
      console.error('Error request:', error.request);
      throw new Error('No response received from the API.');
    }

    console.error('Error message:', error.message);
    throw new Error(error.message || 'An unexpected error occurred.');
  } else {
    console.error('Unknown error:', error);
    throw new Error('An unknown error occurred.');
  }
};
