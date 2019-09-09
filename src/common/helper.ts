export const CloudinaryConfig = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
};

import * as cloudinary from 'cloudinary';
cloudinary.v2.config(CloudinaryConfig);
export const cloudinaryV2 = cloudinary.v2;

export const getFileNameFromPath = (path: string) => {
    const paths = path.split('/');
    const file = paths[paths.length - 1];
    return file.split('.')[0];
};
