export const CloudinaryConfig = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
};

import * as cloudinary from 'cloudinary';
cloudinary.v2.config(CloudinaryConfig);
export const cloudinaryV2 = cloudinary.v2;
import * as fs from 'fs';

export const getFileNameFromPath = (path: string) => {
    const paths = path.split('/');
    const file = paths[paths.length - 1];
    return file.split('.')[0];
};

export const deleteFile = (path: string) => {
    const paths = path.split('/');
    const file = paths[paths.length - 1];
    fs.unlink('photos/' + file, (err) => {
        if (err) {throw err; }
        // tslint:disable-next-line:no-console
        console.log(`photos/${file} was deleted`);
    });
};
