// All the business logic.....
import {Injectable} from "@nestjs/common"
import { ReportType,data } from "./data";
import {v4 as uuid} from "uuid"

interface Report {amount:number,source:string}

@Injectable()
export class AppService {
  getAllReports(type:ReportType){
    return data.report.filter((report)=> report.type === type )
  }

  getAllReportById(type:ReportType,id:string) {
    return data.report.filter((report) => report.type === type).find(report => report.id === id)
  }

  createReport(type:ReportType,{amount,source}:Report){
    const newReport = {
      id:uuid(),
      source,
      amount,
      created_at:new Date(),
      updated_at: new Date(),
      type

    }
    data.report.push(newReport)
    return newReport
  }

  updateReport(type:ReportType,id:string,body:Report){
    const reportToUpdate = data.report.filter((report)=> report.type === type).find((report)=>report.id === id);
    if(!reportToUpdate) return;
    const reprotIndex = data.report.findIndex((report)=> report.id ===reportToUpdate.id);
    data.report[reprotIndex] ={
      ...data.report[reprotIndex],
      ...body,
      updated_at:new Date()
    }

    return data.report[reprotIndex];
  }


  deleteReport(id:string){
    const reportIndex = data.report.findIndex(report => report.id === id);
    if(reportIndex ===-1) return;
    data.report.splice(reportIndex,1)
    return
  }
}