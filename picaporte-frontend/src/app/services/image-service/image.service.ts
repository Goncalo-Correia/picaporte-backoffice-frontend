import { Injectable } from '@angular/core';
import { Image } from 'src/app/models/image.model';
import { ImageStructure } from 'src/app/structures/image.structure';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageStructure: ImageStructure = new ImageStructure();
  preferenceStructureArray: Set<ImageStructure> = new Set<ImageStructure>();

  constructor() { }

  mapNewImageStructure(imageStructure: ImageStructure): ImageStructure {
    this.imageStructure = new ImageStructure();

    this.imageStructure.image.id = imageStructure.image.id;
    this.imageStructure.image.filename = imageStructure.image.filename;
    this.imageStructure.image.title = imageStructure.image.title;

    this.imageStructure.content = imageStructure.content;

    this.imageStructure.isToDelete = imageStructure.isToDelete;

    return this.imageStructure;
  }
}
