export const debugLog = (...args: Parameters<typeof console.log>) => {
  if (!import.meta.env.PROD) {
    console.log(...args);
  }
};

export const debugLogError = (...args: Parameters<typeof console.error>) => {
  if (!import.meta.env.PROD) {
    console.error(...args);
  }
};
