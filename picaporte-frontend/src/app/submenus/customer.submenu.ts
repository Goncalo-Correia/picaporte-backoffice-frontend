export enum Enum_CustomerSubMenu {
    DETAILS,
    TASKS,
    PREFERENCES,
    PROPERTIES,
    LOCATION,
    HISTORY
}

export class CustomerSubMenu {

    enum_customerSubMenu: Enum_CustomerSubMenu | undefined;
    label: string;
    description: string;

    constructor(data: CustomerSubMenu) {
        this.enum_customerSubMenu = data.enum_customerSubMenu;
        this.label = data.label;
        this.description = data.description;
    }
}

export class CustomerSubMenuFactory {

    private customerSubMenus: Array<CustomerSubMenu>;

    constructor() {
        this.customerSubMenus = new Array<CustomerSubMenu>();
    }

    getCustomerSubmenus(): Array<CustomerSubMenu> {
        this.customerSubMenus.push({
            enum_customerSubMenu: Enum_CustomerSubMenu.DETAILS,
            label: "Dados do cliente",
            description: "Detalhes gerais e morada"
        });
        this.customerSubMenus.push({
            enum_customerSubMenu: Enum_CustomerSubMenu.PREFERENCES,
            label: "Preferências",
            description: "Listagem de preferências de imóvel"
        });
        this.customerSubMenus.push({
            enum_customerSubMenu: Enum_CustomerSubMenu.PROPERTIES,
            label: "Imóveis",
            description: "Listagem de imóveis associados"
        });
        this.customerSubMenus.push({
            enum_customerSubMenu: Enum_CustomerSubMenu.HISTORY,
            label: "Histórico",
            description: "Listagem de alterações de dados"
        });

        return this.customerSubMenus;
    }
}