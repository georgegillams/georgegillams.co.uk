import uploadZip from './uploadZip';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';
import { InvalidInputError } from 'server-utils/common/errors';
import fs from 'fs';
import path from 'path';

// Mock dependencies
jest.mock('server-utils/common/authentication');
jest.mock('server-utils/common/logger');

describe('uploadZip', () => {
  const mockUser = { id: 'user123', admin: true };
  const mockReq = {
    files: {
      zipFile: {
        name: 'test.zip',
        mimetype: 'application/zip',
        mv: jest.fn(),
        data: Buffer.from('mock zip data'),
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    authentication.mockResolvedValue(mockUser);
  });

  it('should throw UNAUTHORISED_WRITE for non-admin users', async () => {
    authentication.mockResolvedValue({ id: 'user123', admin: false });

    await expect(uploadZip(mockReq)).rejects.toThrow(UNAUTHORISED_WRITE);
  });

  it('should throw UNAUTHORISED_WRITE for unauthenticated users', async () => {
    authentication.mockResolvedValue(null);

    await expect(uploadZip(mockReq)).rejects.toThrow(UNAUTHORISED_WRITE);
  });

  it('should throw InvalidInputError when no zip file is provided', async () => {
    const reqWithoutFile = { files: {} };

    await expect(uploadZip(reqWithoutFile)).rejects.toThrow(InvalidInputError);
  });

  it('should throw InvalidInputError for invalid file type', async () => {
    const reqWithInvalidFile = {
      files: {
        zipFile: {
          name: 'test.txt',
          mimetype: 'text/plain',
          mv: jest.fn(),
        },
      },
    };

    await expect(uploadZip(reqWithInvalidFile)).rejects.toThrow(InvalidInputError);
  });

  it('should create images directory if it does not exist', async () => {
    const imagesDir = path.join(process.cwd(), 'server', 'server_content', 'images');

    // Mock fs.existsSync to return false initially
    const originalExistsSync = fs.existsSync;
    fs.existsSync = jest.fn().mockReturnValue(false);

    // Mock fs.mkdirSync
    const originalMkdirSync = fs.mkdirSync;
    fs.mkdirSync = jest.fn();

    try {
      await uploadZip(mockReq);
    } catch (error) {
      // Expected to fail due to extract-zip mock, but we're testing directory creation
    }

    expect(fs.mkdirSync).toHaveBeenCalledWith(imagesDir, { recursive: true });

    // Restore original functions
    fs.existsSync = originalExistsSync;
    fs.mkdirSync = originalMkdirSync;
  });
});
