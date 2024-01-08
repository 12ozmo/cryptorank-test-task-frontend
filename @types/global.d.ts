import 'jest';
import '@testing-library/jest-dom';

declare module 'big.js';

declare global {
  interface Window {
    fetch: jest.MockedFunction<typeof window.fetch>;
  }
}

declare global {
  interface Window {
    fetch: jest.MockedFunction<typeof fetch>;
  }
}

export {};