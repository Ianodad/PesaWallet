import {
  API_URL,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from '@env';

const settings = {
  dev: {
    API_URL: 'http://10.0.2.2:5000/api/graphql',
    API_KEY: API_KEY,
    AUTH_DOMAIN: AUTH_DOMAIN,
    PROJECT_ID: PROJECT_ID,
    STORAGE_BUCKET: STORAGE_BUCKET,
    MESSAGING_SENDER_ID: MESSAGING_SENDER_ID,
    APP_ID: APP_ID,
    MEASUREMENT_ID: MEASUREMENT_ID,
  },
  staging: {
    API_URL: API_URL,
    API_KEY: API_KEY,
    AUTH_DOMAIN: AUTH_DOMAIN,
    PROJECT_ID: PROJECT_ID,
    STORAGE_BUCKET: STORAGE_BUCKET,
    MESSAGING_SENDER_ID: MESSAGING_SENDER_ID,
    APP_ID: APP_ID,
    MEASUREMENT_ID: MEASUREMENT_ID,
  },
  prod: {
    API_URL: API_URL,
    API_KEY: API_KEY,
    AUTH_DOMAIN: AUTH_DOMAIN,
    PROJECT_ID: PROJECT_ID,
    STORAGE_BUCKET: STORAGE_BUCKET,
    MESSAGING_SENDER_ID: MESSAGING_SENDER_ID,
    APP_ID: APP_ID,
    MEASUREMENT_ID: MEASUREMENT_ID,
  },
};

// const getCurrentSettings = () => {
//   if (__DEV__) return settings.dev;
//   if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
//   return settings.prod;
// };

// export default getCurrentSettings();
