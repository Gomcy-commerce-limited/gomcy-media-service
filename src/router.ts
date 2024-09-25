import { upload } from 'config';
import { uploadProductMedia } from 'controller';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('Server is running');
});

router.post('/upload-product-media', upload.array("files"), uploadProductMedia);

export default router;