import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ImageService } from 'src/app/services/image-service/image.service';
import { IAlbum, Lightbox, LightboxConfig } from 'ngx-lightbox';
declare let $: any;
import 'bootstrap';
import { apiEndpoints, environment } from 'src/environments/environment';
import { Image } from 'src/app/models/image.model';
import { ImageValidationObject, ValidationService } from 'src/app/services/validation-service/validation.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-property-images',
  templateUrl: './property-images.component.html',
  styleUrls: ['./property-images.component.css']
})
export class PropertyImagesComponent implements OnInit, OnChanges {
  
  @Input() mainImage: Image = new Image();
  @Input() otherImages: Array<Image> = new Array<Image>();
  @Input() isEditable: boolean = false;
  @Input() videoUrl: string = "";
  videoSafeUrl: SafeResourceUrl | undefined;

  @Output() event_updateMainImage = new EventEmitter<Image>();
  @Output() event_updateOtherImages = new EventEmitter<Array<Image>>();
  @Output() event_updateVideoUrl = new EventEmitter<string>();

  url: string = environment.apiUrl + apiEndpoints.image.binary

  lightboxImages: Array<IAlbum>;
  selectedImageStructure: Image = new Image();
  selectedRowNumber: number = -1;
  isMainImage: boolean = false;
  imageValidationObject: ImageValidationObject = new ImageValidationObject();

  otherImagesIsEmpty: boolean = false;

  constructor(
    public imageService: ImageService, 
    private _lightbox: Lightbox,
    @Inject(LightboxConfig) private lightboxConfig: LightboxConfig,
    private validationService: ValidationService,
    private sanitizer: DomSanitizer
    ) { 
    this.lightboxImages = new Array<IAlbum>();
    this.lightboxConfig.centerVertically = true;
  }
  ngOnInit(): void {
    this.videoSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoUrl}`);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['videoUrl'] && !changes['videoUrl'].isFirstChange()) {
      this.videoSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoUrl}`);
    }
  }

  onFocus_file() {
    this.imageValidationObject.isFileValid.isValid = true;
  }

  onFocus_title() {
    this.imageValidationObject.isTitleValid.isValid = true;
  }

  onChange_file(event: any) {
    var file = event.target.files[0];
    this.getBase64(file, event, this.selectedImageStructure);
  }

  private getBase64(file: any, event: any, imageStructure: Image) {
    var reader = new FileReader();
    reader.onload = function () {
      event.target.files[0].binary = (reader.result);
      imageStructure.content = event.target.files[0].binary;
      imageStructure.filename = event.target.files[0].name;
    };
    reader.readAsDataURL(file);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  onClick_editMainImage() {
    this.isMainImage = true;
    this.selectedImageStructure = new Image();
    this.selectedImageStructure = this.imageService.mapNewImageStructure(this.mainImage);
  }

  onClick_editOtherImage(index: number) {
    this.isMainImage = false;
    this.selectedRowNumber = index;
    
    if (index >= 0) {
      this.selectedImageStructure = new Image();
      this.selectedImageStructure = this.imageService.mapNewImageStructure(this.otherImages[index]);
    } else {
      this.selectedImageStructure = new Image();
    }
  }

  onClick_showMainImageLightbox() {
    this.lightboxImages = new Array<IAlbum>();
    let url = this.url + (this.mainImage.id != 0 ? this.mainImage.content : this.mainImage.filename);
    this.lightboxImages.push({
      src: url,
      caption: this.mainImage.title,
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
    this.imageValidationObject = new ImageValidationObject();
    this.imageValidationObject = this.validationService.validateImage(this.selectedImageStructure.title, (this.selectedImageStructure.id == 0 ? this.selectedImageStructure.content : this.selectedImageStructure.filename));
    if (this.imageValidationObject.isValid) {
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
      this.closeModal();
    }
  }

  private closeModal(): void {
    $('#staticBackdrop').modal('hide');
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
      let url = this.url + (element.id == 0 ? element.content : element.filename) + "/true";
      this.lightboxImages.push({
        src: url,
        caption: element.title,
        thumb: ""
      });
    })
  }

  triggerEvent_updateMainImage() {
    this.event_updateMainImage.emit(this.mainImage);
  }

  triggerEvent_updateOtherImages() {
    this.event_updateOtherImages.emit(this.otherImages);
  }

  triggerEvent_updateVideoUrl() {
    this.event_updateVideoUrl.emit(this.videoUrl);
  }
}
