export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // For mysql
      MYSQL_TYPE: any;
      MYSQL_HOST: string;
      MYSQL_PASSWORD: string;
      MYSQL_USERNAME: string;
      MYSQL_DATABASE: string;
      MYSQL_PORT: number;
      MYSQL_ROOT_PASSWORD: string;
      MYSQL_ROOT_USERNAME: string;
      MYSQL_USER: string;

      //for mongo
      MONGO_USERNAME: string;
      MONGO_PASSWORD: string;

      //for redis
      REDIS_URL: string;

      //for app
      NODE_ENV: string;
      APP_PORT: number;

      // for rabbitmq
      RABBITMQ_URL: string;

      //For jwt
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;

      //for s3
      S3_SECRET: string;
      S3_ACCESS: string;
      S3_BUCKET: string;
      S3_ENDPOINT: string;
    }
  }
}
