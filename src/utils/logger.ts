export const logger = {
  info: (msg: string) => console.log(`ℹ️ ${msg}`),
  warn: (msg: string) => console.log(`⚠️ ${msg}`),
  error: (msg: string) => console.log(`❌ ${msg}`),
};
