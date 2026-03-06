// import axios from "axios";

// export const api = axios.create({
//   baseURL: "https://docank.mahmoudalbatran.com/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });










import axios, { AxiosError, AxiosInstance } from 'axios';

/**
 * CREATE AXIOS INSTANCE
 * iOS-safe defaults
 */
export const api: AxiosInstance = axios.create({
  baseURL: 'https://docank.mahmoudalbatran.com/api',
  timeout: 15000, // REQUIRED for iOS stability
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * SAFE LOGGER (never crashes production)
 */
function logError(tag: string, error: unknown) {
  if (__DEV__) {
    console.error(`[${tag}]`, error);
  } else {
    // TODO: Send to Sentry / Crashlytics
    // NEVER throw here
  }
}

/**
 * NORMALIZE AXIOS ERRORS
 * Prevents iOS crashes from unexpected shapes
 */
function normalizeAxiosError(error: AxiosError) {
  return {
    message:
      (error.response?.data as any)?.message ??
      error.message ??
      'Network request failed',
    status: error.response?.status,
    code: error.code,
    isNetworkError: !error.response,
  };
}

/**
 * REQUEST INTERCEPTOR
 * Prevents undefined config crashes
 */
api.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};
    return config;
  },
  (error) => {
    logError('API_REQUEST_ERROR', error);
    return Promise.reject(error);
  }
);

/**
 * RESPONSE INTERCEPTOR
 * iOS WILL CRASH if response.data is undefined later
 */
api.interceptors.response.use(
  (response) => {
    if (response?.data == null) {
      return {
        ...response,
        data: null,
      };
    }
    return response;
  },
  (error: AxiosError) => {
    const safeError = normalizeAxiosError(error);
    logError('API_RESPONSE_ERROR', safeError);
    return Promise.reject(safeError);
  }
);







// eas build --platform ios --profile production

// Yosef_Nadal@hotmail.com
