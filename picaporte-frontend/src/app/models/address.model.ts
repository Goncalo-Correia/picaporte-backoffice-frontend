import { Static_Island } from "./static/static-island.model";

export class Address {
    public id: number = 0;
    public street: string = "";
    public location: string = "";
    public parish: string = "";
    public city: string = "";
    public islandId: number = 0;
    public island: Static_Island = new Static_Island();
    public longitude: number = 0;
    public latitude: number = 0;
    public zipCode: string = "";
}