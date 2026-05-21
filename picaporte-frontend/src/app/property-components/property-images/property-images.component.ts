import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ImageService } from 'src/app/services/image-service/image.service';
import { LightboxService, LightboxImage } from 'src/app/shared/lightbox/lightbox.service';
import { Modal } from 'bootstrap';
import { apiEndpoints, environment } from 'src/environments/environment';
import { ImageDto } from 'src/app/models/image-dto.model';
import { ImageValidationObject, ValidationService } from 'src/app/services/validation-service/validation.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-property-images',
  templateUrl: './property-images.component.html',
  styleUrls: ['./property-images.component.css']
})
export class PropertyImagesComponent implements OnInit, OnChanges {

  @Input() mainImage: ImageDto = new ImageDto();
  @Input() otherImages: Array<ImageDto> = new Array<ImageDto>();
  @Input() isEditable: boolean = false;
  @Input() videoUrl: string = "";
  videoSafeUrl: SafeResourceUrl | undefined;

  @Output() event_updateMainImage = new EventEmitter<ImageDto>();
  @Output() event_updateOtherImages = new EventEmitter<Array<ImageDto>>();
  @Output() event_updateVideoUrl = new EventEmitter<string>();

  url: string = environment.apiUrl + apiEndpoints.image.binary;

  selectedImageStructure: ImageDto = new ImageDto();
  multipleImageStructure: Array<ImageDto> = new Array<ImageDto>();
  selectedFiles: FileList | null = null;
  selectedRowNumber: number = -1;
  isMainImage: boolean = false;
  imageValidationObject: ImageValidationObject = new ImageValidationObject();

  otherImagesIsEmpty: boolean = false;

  constructor(
    public imageService: ImageService,
    private lightboxService: LightboxService,
    private validationService: ValidationService,
    private sanitizer: DomSanitizer
  ) {}
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
    this.getBase64(file, this.selectedImageStructure, false, this.otherImages);
  }

  onChange_files(event: any) {
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        let imageStructure: ImageDto = new ImageDto();
        this.getBase64(event.target.files[i], imageStructure, true, this.multipleImageStructure);
      }
    }
  }

  private getBase64(file: any, imageStructure: ImageDto, isBulk: boolean, multipleImages: Array<ImageDto>) {
    var reader = new FileReader();
    reader.onload = function () {
      file.binary = (reader.result);
      imageStructure.content = file.binary;
      imageStructure.filename = file.name;
      if (isBulk) {
        imageStructure.title = "Imagem " + multipleImages.length;
        multipleImages.push(imageStructure);
      }
    };
    reader.readAsDataURL(file);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  onClick_editMainImage() {
    this.isMainImage = true;
    this.selectedImageStructure = new ImageDto();
    this.selectedImageStructure = this.imageService.mapNewImageStructure(this.mainImage);
  }

  onClick_editOtherImage(index: number) {
    this.isMainImage = false;
    this.selectedRowNumber = index;

    if (index >= 0) {
      this.selectedImageStructure = new ImageDto();
      this.selectedImageStructure = this.imageService.mapNewImageStructure(this.otherImages[index]);
    } else {
      this.selectedImageStructure = new ImageDto();
    }
  }

  onClick_showMainImageLightbox() {
    const url = this.url + (this.mainImage.id === "" ? this.mainImage.content : this.mainImage.filename) + "/true";
    this.lightboxService.open([{ src: url, caption: this.mainImage.title }], 0);
  }

  onClick_showOtherImageLightbox(index: number) {
    const images: LightboxImage[] = this.otherImages.map(img => ({
      src: this.url + (img.id === "" ? img.content : img.filename) + "/true",
      caption: img.title
    }));
    this.lightboxService.open(images, index);
  }

  onClick_close() {
    this.selectedRowNumber = -1;
    this.clearFileInput();
  }

  onClick_closeMultiple() {
    this.selectedFiles = new FileList();
  }

  onClick_remove(index: number) {
    this.otherImages[index].isToDelete = true;
    this.checkDeleteAllOtherImages();
    this.triggerEvent_updateOtherImages();
  }

  onClick_submit() {
    this.imageValidationObject = new ImageValidationObject();
    this.imageValidationObject = this.validationService.validateImage(this.selectedImageStructure.title, (this.selectedImageStructure.id === "" ? this.selectedImageStructure.content : this.selectedImageStructure.filename));
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

  onClick_submitMultiple() {
    if (this.multipleImageStructure.length > 0) {
      this.multipleImageStructure.forEach(element => {
        this.otherImages.push(element);
      })
      this.checkDeleteAllOtherImages();
      this.triggerEvent_updateOtherImages();
      this.closeMultipleModal();
    }
  }

  private closeModal(): void {
    const el = document.getElementById('staticBackdrop');
    if (el) (Modal.getInstance(el) ?? new Modal(el)).hide();
  }

  private closeMultipleModal(): void {
    const el = document.getElementById('multipleUpload');
    if (el) (Modal.getInstance(el) ?? new Modal(el)).hide();
  }

  private checkDeleteAllOtherImages() {
    this.otherImagesIsEmpty = (this.otherImages.filter(prop => prop.isToDelete).length == this.otherImages.length);
  }

  private clearFileInput() {
    const fileInput = document.getElementById('file') as HTMLInputElement | null;
    if (fileInput) fileInput.value = '';
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
