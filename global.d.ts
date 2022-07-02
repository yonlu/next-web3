declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      NODE_ENV: 'development' | 'production';
      NEXT_PUBLIC_CONTRACT_ADDRESS: string;
    }
  }
}

export {};
