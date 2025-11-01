import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';
import { InvalidInputError } from 'server-utils/common/errors';
import path from 'path';
import fs from 'fs';
import extractZip from 'extract-zip';
import logger from 'server-utils/common/logger';

/**
 * Upload and extract a ZIP file containing images to the persisted_server_content/images directory.
 *
 * @param {Object} req - Express request object
 * @param {Object} req.files - Uploaded files
 * @param {Object} req.files.zipFile - The ZIP file to extract
 * @returns {Promise<Object>} Result object with extracted files and status
 *
 * Requirements:
 * - User must be authenticated and have admin privileges
 * - ZIP file must be provided in req.files.zipFile
 * - Only image files (jpg, jpeg, png, gif, bmp, webp) are extracted
 * - Files are extracted to persisted_server_content/images directory
 * - Existing files with the same name will be overwritten
 * - Only files in the root of the ZIP are processed (no subdirectories)
 */
export default async function uploadZip(req) {
  let user = await authentication(req);
  if (!user || !user.admin) {
    throw UNAUTHORISED_WRITE;
  }

  // Check if file was uploaded
  if (!req.files || !req.files.zipFile) {
    throw new InvalidInputError('No zip file provided');
  }

  const zipFile = req.files.zipFile;

  // Validate file type
  if (zipFile.mimetype !== 'application/zip' && zipFile.mimetype !== 'application/x-zip-compressed') {
    throw new InvalidInputError('Only ZIP files are allowed');
  }

  const imagesDir = path.join(process.cwd(), 'server', 'persisted_server_content', 'images');

  // Ensure the images directory exists
  try {
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
  } catch (error) {
    logger.error('Failed to create images directory:', error);
    throw new InvalidInputError('Failed to create images directory');
  }

  // Create a temporary file for the zip
  const tempZipPath = path.join(imagesDir, `temp_${Date.now()}_${zipFile.name}`);

  try {
    // Save the uploaded zip file temporarily
    await zipFile.mv(tempZipPath);

    // Create a temporary extraction directory
    const tempExtractDir = path.join(imagesDir, `temp_extract_${Date.now()}`);
    fs.mkdirSync(tempExtractDir, { recursive: true });

    // Extract the zip file
    await extractZip(tempZipPath, { dir: tempExtractDir });

    // Process extracted files
    const extractedFiles = [];
    const errors = [];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

    const processDirectory = dir => {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
          // Skip subdirectories - we only want files in the root
          continue;
        }

        // Validate file extension (only allow image files)
        const fileExtension = path.extname(file).toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
          errors.push(`Skipped ${file}: Invalid file type`);
          fs.unlinkSync(filePath); // Remove invalid file
          continue;
        }

        // Move file to images directory (overwrite if exists)
        const targetPath = path.join(imagesDir, file);
        fs.renameSync(filePath, targetPath);
        extractedFiles.push(file);
        logger.log(`Extracted: ${file}`);
      }
    };

    processDirectory(tempExtractDir);

    // Clean up temporary files and directories
    fs.rmSync(tempExtractDir, { recursive: true, force: true });
    fs.unlinkSync(tempZipPath);

    logger.log(`Zip extraction completed. Extracted ${extractedFiles.length} files.`);

    return {
      success: true,
      extractedFiles,
      errors: errors.length > 0 ? errors : undefined,
      // eslint-disable-next-line max-len
      message: `Successfully extracted ${extractedFiles.length} image files${errors.length > 0 ? ` with ${errors.length} warnings` : ''}`,
    };
  } catch (error) {
    // Clean up temporary files on error
    try {
      if (fs.existsSync(tempZipPath)) {
        fs.unlinkSync(tempZipPath);
      }
    } catch (cleanupError) {
      logger.error('Failed to clean up temporary zip file:', cleanupError);
    }

    logger.error('Failed to extract zip file:', error);
    throw new InvalidInputError('Failed to extract zip file');
  }
}
