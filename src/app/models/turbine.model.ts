import { Report } from "./report.model";
import { Project } from "./project.model";

export class Turbine {

    id : string;
    name : string;
    defectsInspectionReport : boolean;
    examinationTransformer : boolean;
    measurements6KV : boolean;
    measurements690V400V : boolean;
    measurementsMwSwitchgear : boolean;
    onboardCraneInspectionReport : boolean;
    performanceReportRepairElevator : boolean;
    statutoryInspectionReport : boolean;
    
    project : Project;
    listReports : Report[];
}
