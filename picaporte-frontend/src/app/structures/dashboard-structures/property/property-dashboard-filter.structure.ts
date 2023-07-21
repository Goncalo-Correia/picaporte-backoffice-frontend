import { Static_AmenetieType } from "src/app/models/static/static-amenetieType.model";
import { Static_Island } from "src/app/models/static/static-island.model";
import { Static_PropertyConditionStatus } from "src/app/models/static/static-propertyconditionstatus.model";
import { Static_PropertyLocationType } from "src/app/models/static/static-propertylocationtype.model";
import { Static_PropertyStatus } from "src/app/models/static/static-propertystatus.model";
import { Static_PropertyTypology } from "src/app/models/static/static-propertytypology.model";

export class PropertyDashboardFilterStructure {
    statuses: Array<Static_PropertyStatus> = new Array<Static_PropertyStatus>();
    locationTypes: Array<Static_PropertyLocationType> = new Array<Static_PropertyLocationType>();
    tipologies: Array<Static_PropertyTypology> = new Array<Static_PropertyTypology>();
    conditionStatuses: Array<Static_PropertyConditionStatus> = new Array<Static_PropertyConditionStatus>();
    amenetieTypes: Array<Static_AmenetieType> = new Array<Static_AmenetieType>();
    islands: Array<Static_Island> = new Array<Static_Island>();
}