export type GeneratePresignedUrlArgs = {
  key: string;
  contentType: string;
  maxSizeInBytes?: number;
  expiresIn?: number;
};

export type CheckFileExistsArgs = {
  key: string;
};
