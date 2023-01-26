import { Injectable } from '@angular/core';
import { Image } from 'src/app/models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageStructure: Image = new Image();
  preferenceStructureArray: Set<Image> = new Set<Image>();

  constructor() { }

  mapNewImageStructure(imageStructure: Image): Image {
    this.imageStructure = new Image();

    this.imageStructure.id = imageStructure.id;
    this.imageStructure.filename = imageStructure.filename;
    this.imageStructure.title = imageStructure.title;

    this.imageStructure.content = imageStructure.content;

    this.imageStructure.isToDelete = imageStructure.isToDelete;

    return this.imageStructure;
  }
}
