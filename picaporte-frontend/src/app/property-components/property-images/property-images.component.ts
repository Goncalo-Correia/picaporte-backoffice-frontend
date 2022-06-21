import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/image-service/image.service';
import { ImageStructure } from 'src/app/structures/image.structure';
import { ImgurImageUploadStructure } from 'src/app/structures/imgur/imgur-image-upload.structure';
import * as $ from 'jquery';

@Component({
  selector: 'app-property-images',
  templateUrl: './property-images.component.html',
  styleUrls: ['./property-images.component.css']
})
export class PropertyImagesComponent implements OnInit {

  @Input() mainImage: ImageStructure = new ImageStructure(new Image(), new ImgurImageUploadStructure(), false);
  @Input() otherImages: Array<ImageStructure> = new Array<ImageStructure>();
  @Input() isEditable: boolean = false;

  @Output() event_updateMainImage = new EventEmitter<ImageStructure>();
  @Output() event_updateOtherImages = new EventEmitter<Array<ImageStructure>>();

  selectedImageStructure: ImageStructure = new ImageStructure(new Image(), new ImgurImageUploadStructure(), false);
  selectedRowNumber: number = -1;
  isMainImage: boolean = false;

  otherImagesIsEmpty: boolean = false;

  constructor(public imageService: ImageService) { }

  ngOnInit(): void {
  }

  onChange_file(event: any) {
    var file = event.target.files[0];
    this.getBase64(file, event, this.selectedImageStructure);
  }

  private getBase64(file: any, event: any, imageStructure: ImageStructure) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      event.target.files[0].binary = (reader.result);
      imageStructure.imageUploadStructure.image = event.target.files[0].binary;
      imageStructure.imageUploadStructure.name = event.target.files[0].name;
      imageStructure.imageUploadStructure.type = event.target.files[0].type;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  onClick_editMainImage() {
    this.isMainImage = true;
    this.selectedImageStructure = this.imageService.mapNewImageStructure(this.mainImage);
  }

  onClick_editOtherImage(index: number) {
    this.isMainImage = false;
    this.selectedRowNumber = index;
    
    if (index >= 0) {
      this.selectedImageStructure = this.imageService.mapNewImageStructure(this.otherImages[index]);
    } else {
      this.selectedImageStructure = new ImageStructure(new Image(), new ImgurImageUploadStructure(), false);
    }
  }

  onClick_close() {
    this.selectedRowNumber = -1;
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

  triggerEvent_updateMainImage() {
    this.event_updateMainImage.emit(this.mainImage);
  }

  triggerEvent_updateOtherImages() {
    this.event_updateOtherImages.emit(this.otherImages);
  }

}
