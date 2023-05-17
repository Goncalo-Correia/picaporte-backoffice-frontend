import { Static_EntityType } from "./static/static-entity-type.model";

export class EntityReference {
    id: number = 0;
    recordId: number = 0;
    name: string = "";
    entityTypeId: number = 0;
    entityType: Static_EntityType = new Static_EntityType();
}