import { PutObjectCommand } from '@aws-sdk/client-s3';
import { logger, client } from 'config';
import { Request, Response } from 'express';

/**
 * The endpoint is for uploading the product media files to the AWS S3 bucket.
 * and return the uploaded file URL.
 * @param {Request} req 
 * @param {Response} res 
 */
const uploadProductMedia = async (req: Request, res: Response) => {
    try {
        const { files: reqFiles } = req;
        const { shopId, fileKeys } = req.body as { shopId: string, fileKeys: string[] };
        if (!reqFiles) {
            throw new Error('No files found');
        }
        
        const files = reqFiles as Express.Multer.File[];
        const promises = files.map(async (file: Express.Multer.File, index: number) => {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME || '',
                Key: `${shopId}/${fileKeys[index]}`,
                Body: file.buffer,
            };
            const command = new PutObjectCommand(params);
            return client.send(command);
        });

        await Promise.all(promises);

        res.status(200).json({ message: 'Files uploaded successfully' });
    } catch (error) {
        console.error(error);
        logger.error({
            error: error,
            message: 'Error in uploadProductMedia controller',
            createdAt: new Date().toISOString
        })
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default uploadProductMedia;