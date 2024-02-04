import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:5000" });

export const request = (options, config) => {
  // Set your authorization token here if needed
  client.defaults.headers.common.Authorization = `Bearer token`;

  // Return a Promise with or without a delay before making the actual request
  const makeRequest = () => {
    const onSuccess = (response) => response;
    const onError = (error) => {
      // Optionally catch errors and add additional logging here
      return Promise.reject(error);
    };

    return client(options).then(onSuccess).catch(onError);
  };

  return config?.delay
    ? new Promise((resolve) => {
        setTimeout(() => {
          resolve(makeRequest());
        }, 1000); // Delay of 1000 milliseconds (1 second)
      })
    : makeRequest();
};
