import { EntityReference } from "./entity-reference.mode";
import { Property } from "./property.model";

export class UserFavorite {
    public id: string = "";
    public propertyId: string | null = null;
    public userId: string | null = null;
    public property: Property = new Property();
    public entityReference: EntityReference = new EntityReference();
}
