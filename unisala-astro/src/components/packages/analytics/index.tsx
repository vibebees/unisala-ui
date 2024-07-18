// src/analytics.js
// import ReactGA from 'react-ga4';

export const trackEvent = ({ action = "", category = 'default_category', label = "", value = 0 }) => {
  // ReactGA.event({
    return ({

    category: category,
    action: action,
    label: label,
    value: value,
  });
};
