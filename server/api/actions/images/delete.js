import { dbLoadSingle, dbRemove } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_WRITE, RESOURCE_NOT_FOUND } from 'server-utils/common/errorConstants';
import path from 'path';
import fs from 'fs';
import logger from 'server-utils/common/logger';

export default async function remove(req) {
  let user = await authentication(req);
  if (!user || !user.admin) {
    throw UNAUTHORISED_WRITE;
  }

  const { id } = req.body;
  if (!id) {
    throw new Error('Image ID is required');
  }

  // First, get the image data to find the file path
  const imageData = await dbLoadSingle({
    redisKey: 'images',
    includeDeleted: false,
    filter: img => img.id === id,
  });

  if (!imageData) {
    throw RESOURCE_NOT_FOUND;
  }

  // Remove from database
  await dbRemove({ redisKey: 'images' }, req);

  // Remove file from disk if it exists
  if (imageData.filename) {
    const filePath = path.join(process.cwd(), 'server', 'persisted_server_content', 'images', imageData.filename);
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      // Log error but don't fail the request if file deletion fails
      logger.error('Failed to delete image file:', error);
      throw error;
    }
  }

  return true;
}
