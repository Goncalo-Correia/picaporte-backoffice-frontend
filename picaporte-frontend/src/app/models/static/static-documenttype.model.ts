export class Static_DocumentType {
    constructor(
        public id: number,
        public label: string,
        public description: string,
        public order: number,
        public isPrimary: boolean,
        public isCertificate: boolean
    ) {};
}