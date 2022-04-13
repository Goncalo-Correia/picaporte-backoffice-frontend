import { FileBinary } from "./filebinary.model";

export class File {
    constructor(
        public id: number,
        public fileName: string,
        public createdOn: Date,
        public lastModifiedOn: number,

        public fileBinary: FileBinary
    ) {};
}