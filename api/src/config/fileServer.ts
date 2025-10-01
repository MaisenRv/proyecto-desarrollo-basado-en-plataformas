import { Client } from "minio";
import env from "./env.js";

const minioClient = new Client({
  endPoint: env.MINIO.HOST,
  port: 9000,
  useSSL: false,
  accessKey: env.MINIO.USER,
  secretKey: env.MINIO.PASSWORD,
});

export default minioClient;