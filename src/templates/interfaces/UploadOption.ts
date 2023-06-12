import { FileTypes } from '../../constants/file';

export interface UploadOptions {
  path: string;
  fileName: string;
  fileType: FileTypes;
  version?: number;
  data: Uint8Array;
}
