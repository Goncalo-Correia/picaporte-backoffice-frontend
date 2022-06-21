export class ImgurImageUploadStructure {
    constructor(
        public image?: string,
        public album?: string,
        public type?: string,
        public name?: string,
        public title?: string,
        public description?: string
    ) {}
}