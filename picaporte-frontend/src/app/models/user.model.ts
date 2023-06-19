export class User {
    public id: number = 0;
    public firstName: string = "";
    public lastName: string = "";
    public email: string = "";
    public phoneNumber: string = "";
    public createdOn: Date = new Date();
    public lastModifiedOn: Date = new Date();
    public lastLogin: Date = new Date();
    public auth0AccessToken: string = "";
    public isAdmin: boolean = false;
    public birthDate: Date = new Date();
}