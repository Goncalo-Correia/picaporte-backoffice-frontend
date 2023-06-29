import { EntityReference } from "./entity-reference.mode";
import { Static_TaskStatus } from "./static/static-task-status.model";
import { Static_TaskType } from "./static/static-task-type.model";
import { User } from "./user.model";

export class Task {
    id: number = 0;
    recordId: number = 0;
    taskTypeId: number = 0;
    taskStatusId: number = 0;
    userId: number = 0;
    completedOn: Date = new Date();
    createdOn: Date = new Date();
    comment: string = "";
    taskType: Static_TaskType = new Static_TaskType();
    taskStatus: Static_TaskStatus = new Static_TaskStatus();
    user: User = new User();
    entityId: number = 0;
    entityTypeLabel: string = "";
}