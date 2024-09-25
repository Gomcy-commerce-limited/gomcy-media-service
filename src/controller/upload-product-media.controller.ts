import { logger, s3 } from 'config';
import { Request, Response } from 'express';

/**
 * The endpoint is for uploading the product media files to the AWS S3 bucket.
 * and return the uploaded file URL.
 * @param {Request} req 
 * @param {Response} res 
 */
const uploadProductMedia = async (req: Request, res: Response) => {
    try {
        const { files } = req;
        const { shopId } = req.body as { shopId: string };
        if (!files) {
            throw new Error('No files found');
        }
        console.log(files);

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