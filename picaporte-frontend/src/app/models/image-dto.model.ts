export class ImageDto {
    public id: string = "";
    public title: string = "";
    public filename: string = "";
    public mimeType: string = "";
    public content: string | null = null;
    public isToDelete: boolean = false;
}
