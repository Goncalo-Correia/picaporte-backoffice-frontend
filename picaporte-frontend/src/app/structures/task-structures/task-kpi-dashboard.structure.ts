import { DashboardKpiStructure } from "../dashboard-structures/dashboard-kpi.structure";

export class TaskKpiDashboardStructure {
    taskTypeKpis: Array<DashboardKpiStructure> = new Array<DashboardKpiStructure>();
    taskStatusKpis: Array<DashboardKpiStructure> = new Array<DashboardKpiStructure>();
}