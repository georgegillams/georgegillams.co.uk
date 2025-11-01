import { dbLoadSingle } from 'server-utils/common/database';
import path from 'path';
import fs from 'fs';

export default async function loadSingle(req, params) {
  const { id } = params;
  if (!id) {
    throw new Error('Image ID is required');
  }

  // Get the image data from database
  const imageData = await dbLoadSingle({
    redisKey: 'images',
    includeDeleted: false,
    filter: img => img.id === id,
  });

  if (!imageData || !imageData.filename) {
    throw new Error('Image not found');
  }

  // Construct file path
  const filePath = path.join(process.cwd(), 'server', 'persisted_server_content', 'images', imageData.filename);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    throw new Error('Image file not found');
  }

  // Return a function that will handle the response
  return res => {
    try {
      // Set appropriate headers
      res.setHeader('Content-Type', imageData.mimeType || 'image/jpeg');
      res.setHeader('Content-Disposition', `inline; filename="${imageData.filename}"`);

      // Send the file
      res.sendFile(filePath);
    } catch (error) {
      res.status(500).json({ error: 'Failed to serve image file' });
    }
  };
}
