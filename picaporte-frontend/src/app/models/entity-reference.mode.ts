import { Static_EntityType } from "./static/static-entity-type.model";

export class EntityReference {
    id: string = "";
    recordId: string = "";
    name: string = "";
    lastModifiedOn: Date | null = null;
    lastModifiedByUserId: string | null = null;
    createdOn: Date = new Date();
    createdByUserId: string | null = null;
    isActive: boolean = false;
    entityTypeId: number | null = null;
    entityType: Static_EntityType = new Static_EntityType();
}