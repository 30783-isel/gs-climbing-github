export class GlobalConstants{
    public static baseUrl: string = window.location.origin + ':8080/api/'; 
    public static baseLogUrl: string = window.location.origin + ':8080/auth/';
    public static baseProjectsUrl: string = window.location.origin + ':8080/api/project/';
    public static baseUsersUrl: string = window.location.origin + ':8080/api/user/';
    public static baseFileUrl: string = window.location.origin + ':8080/api/file/';
    public static baseReportsUrl: string = window.location.origin + ':8080/api/reports/'; 
    public static baseFilesUrl: string = window.location.origin + ':8080/api/reports/files/'; 

    public static getReportNameByType(typeReport : number) {
        switch (typeReport) {
          case 0:
            return "Defect Inspection Report";
            break;
          case 1:
            return "Examination transformer";
            break;
          case 2:
            return "Measurements of MV Switchgear and Stator Cabinet";
            break;
          case 3:
            return "Medidas 6Kv";
            break;
          case 4:
            return "Medidas 690V400V";
            break;
          case 5:
            return "Onboard crane Inspection Report";
            break;
          case 6:
            return "Performance Report Repair Elevator";
            break;
          case 7:
            return "Statutory Inspection Report";
            break;
          default:
            break;
        }
    
      }

}
