import { Turbine } from "./turbine.model";

export class Report {
    reportId : number;
    uuid : string;
    userId : string;
    createDate : string;
    modifiedDate : string;
    locked : string;
    permission2Edit : string;

    site : string;
	wtgNumber : string;

    projectoId : number;
    turbinaId : number;
    typeReport : number;
    
    turbine : Turbine;
}
