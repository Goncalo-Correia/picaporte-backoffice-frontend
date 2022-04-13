export class Address {
    constructor(
        public id: number,
        public street: string,
        public location: string,
        public parish: string,
        public city: string,
        public island: string,
        public description: string,
        public longitude: string,
        public latitude: string
    ) {};
}