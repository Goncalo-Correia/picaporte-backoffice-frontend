export enum Enum_UserSubMenu {
    DETAILS,
    PREFERENCES,
    HISTORY
}

export class UserSubMenu {

    enum_userSubMenu: Enum_UserSubMenu | undefined;
    label: string;
    description: string;

    constructor(data: UserSubMenu) {
        this.enum_userSubMenu = data.enum_userSubMenu;
        this.label = data.label;
        this.description = data.description;
    }
}

export class UserSubMenuFactory {

    private userSubMenus: Array<UserSubMenu>;

    constructor() {
        this.userSubMenus = new Array<UserSubMenu>();
    }

    getUserSubmenus(): Array<UserSubMenu> {
        this.userSubMenus.push({
            enum_userSubMenu: Enum_UserSubMenu.DETAILS,
            label: "Dados do cliente",
            description: "Detalhes gerais e morada"
        });
        this.userSubMenus.push({
            enum_userSubMenu: Enum_UserSubMenu.PREFERENCES,
            label: "Preferências",
            description: "Listagem de preferências de utilizador"
        });
        this.userSubMenus.push({
            enum_userSubMenu: Enum_UserSubMenu.HISTORY,
            label: "Histórico",
            description: "Listagem de alterações de dados"
        });

        return this.userSubMenus;
    }
}