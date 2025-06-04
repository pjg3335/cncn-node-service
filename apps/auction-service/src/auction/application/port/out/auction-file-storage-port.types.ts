export type PresignedUrlArgs = {
  contentType: 'image/png' | 'image/jpeg' | 'image/webp' | 'image/bmp';
  key: string;
};

export type PrisignedUrlReturn = {
  url: string;
  fields: Record<string, string>;
};

export type CheckFileExistsArgs = {
  key: string;
};
