import { Static_Island } from "./static/static-island.model";

export class Address {
    public id: string = "";
    public street: string = "";
    public location: string = "";
    public parish: string = "";
    public city: string = "";
    public islandId: number | null = null;
    public island: Static_Island = new Static_Island();
    public longitude: number | null = null;
    public latitude: number | null = null;
    public zipCode: string = "";
}