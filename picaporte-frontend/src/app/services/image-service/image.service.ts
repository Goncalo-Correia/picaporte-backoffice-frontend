import { Injectable } from '@angular/core';
import { Image } from 'src/app/models/image.model';
import { ImageStructure } from 'src/app/structures/image.structure';
import { ImgurImageUploadStructure } from 'src/app/structures/imgur/imgur-image-upload.structure';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageStructure: ImageStructure = new ImageStructure(new Image(), new ImgurImageUploadStructure(), false);
  preferenceStructureArray: Set<ImageStructure> = new Set<ImageStructure>();

  constructor() { }

  mapNewImageStructure(imageStructure: ImageStructure): ImageStructure {
    this.imageStructure = new ImageStructure(new Image(), new ImgurImageUploadStructure(), false);

    this.imageStructure.image.id = imageStructure.image.id;
    this.imageStructure.image.fileName = imageStructure.image.fileName;
    this.imageStructure.image.title = imageStructure.image.title;
    this.imageStructure.image.url = imageStructure.image.url;
    this.imageStructure.image.imgurImageHash = imageStructure.image.imgurImageHash;

    this.imageStructure.imageUploadStructure.image = imageStructure.imageUploadStructure.image;
    this.imageStructure.imageUploadStructure.album = imageStructure.imageUploadStructure.album;
    this.imageStructure.imageUploadStructure.type = imageStructure.imageUploadStructure.type;
    this.imageStructure.imageUploadStructure.name = imageStructure.imageUploadStructure.name;
    this.imageStructure.imageUploadStructure.title = imageStructure.imageUploadStructure.title;
    this.imageStructure.imageUploadStructure.description = imageStructure.imageUploadStructure.description;

    this.imageStructure.isToDelete = imageStructure.isToDelete;

    return this.imageStructure;
  }
}
