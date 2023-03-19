export class FileDto {
  fileDownloadUri: string;
  fileName: string;
  fileType: string;
  size: number;
}

export class ImageDto {
  parentID: number;
  size: number;
  format: string;
  url: string;
  imageName: string;
}
