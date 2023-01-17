export enum Enum_PropertySubMenu {
    DETAILS,
    TASKS,
    CARACTERISTICS,
    DOCUMENTS,
    IMAGES,
    RENTING,
    LOCATION,
    OBSERVATION_HISTORY,
    HISTORY
}

export class PropertySubMenu {

    enum_propertySubMenu: Enum_PropertySubMenu | undefined;
    label: string;
    description: string;

    constructor(data: PropertySubMenu) {
        this.enum_propertySubMenu = data.enum_propertySubMenu;
        this.label = data.label;
        this.description = data.description;
    }
}

export class PropertySubMenuFactory {

    private propertySubMenus: Array<PropertySubMenu>;

    constructor() {
        this.propertySubMenus = new Array<PropertySubMenu>();
    }

    getPropertySubmenus(isEditable: boolean): Array<PropertySubMenu> {
        this.propertySubMenus = new Array<PropertySubMenu>();
        this.propertySubMenus.push({
            enum_propertySubMenu: Enum_PropertySubMenu.DETAILS,
            label: "Dados do imóvel",
            description: "Detalhes gerais e morada"
        });
        this.propertySubMenus.push({
            enum_propertySubMenu: Enum_PropertySubMenu.TASKS,
            label: "Tarefas",
            description: "Tarefas de gestão de dados"
        });
        this.propertySubMenus.push({
            enum_propertySubMenu: Enum_PropertySubMenu.CARACTERISTICS,
            label: "Características",
            description: "Listagem de características de imóvel"
        });~
        this.propertySubMenus.push({
            enum_propertySubMenu: Enum_PropertySubMenu.DOCUMENTS,
            label: "Documentos",
            description: "Listagem de documentos associados"
        });
        this.propertySubMenus.push({
            enum_propertySubMenu: Enum_PropertySubMenu.IMAGES,
            label: "Imagens",
            description: "Listagem de imagens associadas"
        });
        if (!isEditable) {
            this.propertySubMenus.push({
                enum_propertySubMenu: Enum_PropertySubMenu.RENTING,
                label: "Arrendamento",
                description: "Especificações de arrendamento"
            });
            this.propertySubMenus.push({
                enum_propertySubMenu: Enum_PropertySubMenu.OBSERVATION_HISTORY,
                label: "Histórico de Observações",
                description: "Listagem deobservações"
            });
        }
        this.propertySubMenus.push({
            enum_propertySubMenu: Enum_PropertySubMenu.HISTORY,
            label: "Histórico",
            description: "Listagem de alterações de dados"
        });

        return this.propertySubMenus;
    }
}