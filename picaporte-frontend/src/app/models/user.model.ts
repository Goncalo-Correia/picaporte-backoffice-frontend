import { UserSetting } from "./user-setting.model";

export class User {
    public id: string = "";
    public firstName: string = "";
    public lastName: string = "";
    public email: string = "";
    public phoneNumber: string = "";
    public lastLogin: Date | null = null;
    public auth0AccessToken: string = "";
    public auth0UserId: string = "";
    public isAdmin: boolean = false;
    public birthDate: Date | null = null;
    public userSettingId: string | null = null;
    public userSetting: UserSetting = new UserSetting();
}