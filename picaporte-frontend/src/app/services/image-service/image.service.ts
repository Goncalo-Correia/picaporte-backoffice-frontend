import { Injectable } from '@angular/core';
import { ImageDto } from 'src/app/models/image-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageStructure: ImageDto = new ImageDto();
  preferenceStructureArray: Set<ImageDto> = new Set<ImageDto>();

  constructor() { }

  mapNewImageStructure(imageStructure: ImageDto): ImageDto {
    this.imageStructure = new ImageDto();

    this.imageStructure.id = imageStructure.id;
    this.imageStructure.filename = imageStructure.filename;
    this.imageStructure.title = imageStructure.title;
    this.imageStructure.mimeType = imageStructure.mimeType;
    this.imageStructure.content = imageStructure.content;
    this.imageStructure.isToDelete = imageStructure.isToDelete;

    return this.imageStructure;
  }
}
