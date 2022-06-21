export class User {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public phoneNumber: string,
        public createdOn: Date,
        public lastModifiedOn: Date,
        public lastLogin: Date
    ) {};
}