import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_READ } from 'server-utils/common/errorConstants';
import path from 'path';
import fs from 'fs';
import archiver from 'archiver';
import logger from 'server-utils/common/logger';

export default async function downloadZip(req) {
  let user = await authentication(req);
  if (!user || !user.admin) {
    throw UNAUTHORISED_READ;
  }

  const imagesDir = path.join(process.cwd(), 'server', 'server_content', 'images');

  // Check if images directory exists
  if (!fs.existsSync(imagesDir)) {
    throw new Error('Images directory not found');
  }

  // Return a function that will handle the response
  return res => {
    try {
      // Set headers for zip download
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="images.zip"');

      // Create archive
      const archive = archiver('zip', {
        zlib: { level: 9 }, // Maximum compression
      });

      // Handle archive errors
      archive.on('error', err => {
        logger.error('Archive error:', err);
        res.status(500).json({ error: 'Failed to create zip file' });
      });

      // Pipe archive data to response
      archive.pipe(res);

      // Read all files in the images directory
      const files = fs.readdirSync(imagesDir);

      if (files.length === 0) {
        // If no files, create an empty zip
        archive.finalize();
        return;
      }

      // Add each file to the archive
      files.forEach(file => {
        const filePath = path.join(imagesDir, file);
        const stats = fs.statSync(filePath);

        // Only add files (not directories)
        if (stats.isFile()) {
          archive.file(filePath, { name: file });
        }
      });

      // Finalize the archive
      archive.finalize();
    } catch (error) {
      logger.error('Download zip error:', error);
      res.status(500).json({ error: 'Failed to create zip file' });
    }
  };
}
