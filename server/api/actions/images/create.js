import { dbCreate, dbUpdate } from 'server-utils/common/database';
import lockPromise from 'server-utils/common/lock';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';
import { InvalidInputError } from 'server-utils/common/errors';
import path from 'path';
import fs from 'fs';
import logger from 'server-utils/common/logger';

export default function create(req) {
  return lockPromise('images', async () => {
    let user = await authentication(req);
    if (!user || !user.admin) {
      throw UNAUTHORISED_WRITE;
    }

    // Check if file was uploaded
    if (!req.files || !req.files.image) {
      throw new InvalidInputError('No image file provided');
    }

    const imageFile = req.files.image;
    const { title } = req.body;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(imageFile.mimetype)) {
      throw new InvalidInputError('Only JPEG and PNG images are allowed');
    }

    // Validate title
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      throw new InvalidInputError('Title is required');
    }

    // Create database entry first to get the ID
    const imageData = {
      title: title.trim(),
      timestamp: Date.now(),
      lastUpdatedTimestamp: Date.now(),
      authorId: user.id,
    };

    const createdImage = await dbCreate({ redisKey: 'images', user }, { body: imageData });

    // Generate filename with ID and original extension
    const fileExtension = path.extname(imageFile.name);
    const filename = `${createdImage.id}${fileExtension}`;
    const imagesDir = path.join(process.cwd(), 'server', 'server_content', 'images');
    const filePath = path.join(imagesDir, filename);

    // Ensure the images directory exists
    try {
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }
    } catch (error) {
      logger.error('Failed to create images directory:', error);
      throw new InvalidInputError('Failed to create images directory');
    }

    // Save file to disk
    try {
      await imageFile.mv(filePath);
    } catch (error) {
      // If file save fails, we should clean up the database entry
      // For now, we'll just throw the error - in production you might want to implement cleanup
      throw new InvalidInputError('Failed to save image file');
    }

    // Update the database entry with the file path
    const updatedImageData = {
      ...createdImage,
      filePath: `/server_content/images/${filename}`,
      filename: filename,
      originalName: imageFile.name,
      mimeType: imageFile.mimetype,
      size: imageFile.size,
    };

    // Update the database entry with the file information
    await dbUpdate({ redisKey: 'images' }, { body: updatedImageData });

    return updatedImageData;
  });
}
