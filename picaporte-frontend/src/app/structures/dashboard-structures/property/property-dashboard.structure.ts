export class PropertyDashboardStructure {
    id: number = 0;
    reference: string = "";
    customerName: string = "";
    customerEmail: string = "";
    customerContact: string = "";
    propertyTypeLabel: string = "";
    propertyStatusLabel: string = "";
    propertyConditionStatusLabel: string = "";
    propertyLocationTypeLabel: string = "";
    lastModifiedOn: Date = new Date();
    lastModifiedBy: string = "";
    mainImageFilename: string = "";
    isSelected: boolean = false;
}