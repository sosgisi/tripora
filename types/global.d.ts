export {};

declare global {
  interface Window {
    snap?: {
      pay: (token: string, options?: object) => void;
      [key: string];
    };
  }
}