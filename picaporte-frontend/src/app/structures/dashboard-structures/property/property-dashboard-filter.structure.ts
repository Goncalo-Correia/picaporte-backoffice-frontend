import { Static_AmenetieType } from "src/app/models/static/static-amenetieType.model";
import { Static_PropertyConditionStatus } from "src/app/models/static/static-propertyconditionstatus.model";
import { Static_PropertyStatus } from "src/app/models/static/static-propertystatus.model";
import { Static_PropertyTypology } from "src/app/models/static/static-propertytypology.model";

export class PropertyDashboardFilterStructure {
    statuses: Array<Static_PropertyStatus> = new Array<Static_PropertyStatus>();
    tipologies: Array<Static_PropertyTypology> = new Array<Static_PropertyTypology>();
    conditionStatuses: Array<Static_PropertyConditionStatus> = new Array<Static_PropertyConditionStatus>();
    amenetieTypes: Array<Static_AmenetieType> = new Array<Static_AmenetieType>();
}