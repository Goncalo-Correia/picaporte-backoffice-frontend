import { Image } from "../models/image.model";
import { ImgurImageUploadStructure } from "./imgur/imgur-image-upload.structure";

export class ImageStructure {
    constructor(
        public image: Image,
        public imageUploadStructure: ImgurImageUploadStructure,
        public isToDelete: boolean
    ) {}
}