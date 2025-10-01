import minioClient from "../config/fileServer.js";
import Hash from "../utils/Hash.js";

class FileService {
    private static BUCKET = "uploads";

    public static async uploadBuffer(buffer: Buffer, originalName: string, contentType: string): Promise<{ objectName: string, publicUrl: string }> {
        const objectName = `images/${await Hash.imgNameToHash(originalName)}`;
        const size = buffer.length;
        await FileService.ensureBucketExists();
        await minioClient.putObject(
            FileService.BUCKET,
            objectName,
            buffer,
            size,
            {
                "Content-Type": contentType,
            }
        );
        const publicUrl = `http://172.20.0.5:9000/${FileService.BUCKET}/${objectName}`;
        return { objectName, publicUrl };
    }

    public static async deleteObject(objectName: string) {
        return minioClient.removeObject(FileService.BUCKET, objectName);
    }


    private static async ensureBucketExists() {

        const exists = await minioClient.bucketExists(FileService.BUCKET);
        if (!exists) {
            await minioClient.makeBucket(FileService.BUCKET, "us-east-1");
            console.log(`Bucket "${FileService.BUCKET}" creado`);
            const policy = {
                Version: "2025-10-30",
                Statement: [
                    {
                        Action: ["s3:GetObject"],
                        Effect: "Allow",
                        Principal: { AWS: ["*"] },
                        Resource: [`arn:aws:s3:::${FileService.BUCKET}/*`],
                    },
                ],
            };

            await minioClient.setBucketPolicy(FileService.BUCKET, JSON.stringify(policy));
            console.log(`Policy pública aplicada al bucket "${FileService.BUCKET}"`);
        }


    }
}

export default FileService;