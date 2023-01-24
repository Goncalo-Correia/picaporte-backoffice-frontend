import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageService } from 'src/app/services/image-service/image.service';
import { ImageStructure } from 'src/app/structures/image.structure';
import { IAlbum, Lightbox } from 'ngx-lightbox';
import * as $ from 'jquery';
import { apiEndpoints, environment } from 'src/environments/environment';

@Component({
  selector: 'app-property-images',
  templateUrl: './property-images.component.html',
  styleUrls: ['./property-images.component.css']
})
export class PropertyImagesComponent {

  @Input() mainImage: ImageStructure = new ImageStructure();
  @Input() otherImages: Array<ImageStructure> = new Array<ImageStructure>();
  @Input() isEditable: boolean = false;

  @Output() event_updateMainImage = new EventEmitter<ImageStructure>();
  @Output() event_updateOtherImages = new EventEmitter<Array<ImageStructure>>();

  url: string = environment.apiUrl + apiEndpoints.image.binary

  lightboxImages: Array<IAlbum>;
  lightboxUrl: string = "";
  selectedImageStructure: ImageStructure = new ImageStructure();
  selectedRowNumber: number = -1;
  isMainImage: boolean = false;

  otherImagesIsEmpty: boolean = false;

  constructor(public imageService: ImageService, private _lightbox: Lightbox) { 
    this.lightboxImages = new Array<IAlbum>();
  }

  onChange_file(event: any) {
    var file = event.target.files[0];
    this.getBase64(file, event, this.selectedImageStructure);
  }

  private getBase64(file: any, event: any, imageStructure: ImageStructure) {
    var reader = new FileReader();
    reader.onload = function () {
      event.target.files[0].binary = (reader.result);
      imageStructure.content = event.target.files[0].binary;
      imageStructure.image.filename = event.target.files[0].name;
    };
    reader.readAsDataURL(file);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  onClick_editMainImage() {
    this.isMainImage = true;
    this.selectedImageStructure = new ImageStructure();
    this.selectedImageStructure = this.imageService.mapNewImageStructure(this.mainImage);
  }

  onClick_editOtherImage(index: number) {
    this.isMainImage = false;
    this.selectedRowNumber = index;
    
    if (index >= 0) {
      this.selectedImageStructure = new ImageStructure();
      this.selectedImageStructure = this.imageService.mapNewImageStructure(this.otherImages[index]);
    } else {
      this.selectedImageStructure = new ImageStructure();
    }
  }

  onClick_showMainImageLightbox() {
    let url = (this.mainImage.image.id == 0) ? this.mainImage.content : this.mainImage.image.filename;
    this.lightboxUrl = (url != null) ? url : "";

    this.lightboxImages = new Array<IAlbum>();
    this.lightboxImages.push({
      src: this.lightboxUrl,
      caption: this.mainImage.image.title,
      thumb: ""
    });
    
    this._lightbox.open(this.lightboxImages, 0);
  }

  onClick_showOtherImageLightbox(index: number) {
    this.buildLightboxImages();
    this._lightbox.open(this.lightboxImages, index);
  }

  onClick_close() {
    this.selectedRowNumber = -1;
    this.clearFileInput();
  }

  onClick_remove(index: number) {
    this.otherImages[index].isToDelete = true;
    this.checkDeleteAllOtherImages();
    this.triggerEvent_updateOtherImages();
  }

  onClick_submit() {
    if (this.isMainImage) {
      this.mainImage = this.imageService.mapNewImageStructure(this.selectedImageStructure);
      this.triggerEvent_updateMainImage();
    } else {
      if (this.selectedRowNumber >= 0) {
        this.otherImages[this.selectedRowNumber] = this.imageService.mapNewImageStructure(this.selectedImageStructure);
      } else {
        this.otherImages.push(this.imageService.mapNewImageStructure(this.selectedImageStructure));
      }
      this.clearFileInput();
      this.checkDeleteAllOtherImages();
      this.triggerEvent_updateOtherImages();
    }
  }

  private checkDeleteAllOtherImages() {
    this.otherImagesIsEmpty = (this.otherImages.filter(prop => prop.isToDelete).length == this.otherImages.length);
  }

  private clearFileInput() {
    $('#file').val("");
  }

  private buildLightboxImages() {
    this.lightboxImages = new Array<IAlbum>();
    this.otherImages.forEach(element => {
      let url = (element.image.id == 0) ? element.content : element.image.filename;
      this.lightboxUrl = (url != null) ? url : "";

      this.lightboxImages?.push({
        src: this.lightboxUrl,
        caption: element.image.title,
        thumb: ""
      });
    })
  }

  triggerEvent_updateMainImage() {
    console.log(this.mainImage);
    
    this.event_updateMainImage.emit(this.mainImage);
  }

  triggerEvent_updateOtherImages() {
    this.event_updateOtherImages.emit(this.otherImages);
  }

}
