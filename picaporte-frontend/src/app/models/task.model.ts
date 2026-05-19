import { Static_TaskStatus } from "./static/static-task-status.model";
import { Static_TaskType } from "./static/static-task-type.model";
import { User } from "./user.model";

export class Task {
    id: string = "";
    recordId: string | null = null;
    taskTypeId: number | null = null;
    taskStatusId: number | null = null;
    userId: string | null = null;
    completedOn: Date | null = null;
    createdOn: Date | null = null;
    comment: string | null = null;
    taskType: Static_TaskType = new Static_TaskType();
    taskStatus: Static_TaskStatus = new Static_TaskStatus();
    user: User = new User();
    entityId: string | null = null;
    entityTypeLabel: string | null = null;
}
