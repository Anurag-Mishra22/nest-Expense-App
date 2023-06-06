// All the business logic.....
import {Injectable} from "@nestjs/common"
import { ReportType,data } from "src/data";
import {v4 as uuid} from "uuid"
import { ReportResponseDto } from "src/dtos/report.dto";

interface Report {amount:number,source:string}
interface UpdateReport {amount?:number,source?:string}

@Injectable()
export class ReportService {
  getAllReports(type:ReportType):ReportResponseDto[]{
    return data.report.filter((report)=> report.type === type).map((report) => new ReportResponseDto(report));
  }

  getAllReportById(type:ReportType,id:string):ReportResponseDto {
    const report = data.report.filter((report) => report.type === type).find(report => report.id === id)

    if(!report) return;

    return new ReportResponseDto(report)
  }

  createReport(type:ReportType,{amount,source}:Report):ReportResponseDto{
    const newReport = {
      id:uuid(),
      source,
      amount,
      created_at:new Date(),
      updated_at: new Date(),
      type

    }
    data.report.push(newReport)
    return new ReportResponseDto(newReport);
  }

  updateReport(type:ReportType,id:string,body:UpdateReport):ReportResponseDto{
    const reportToUpdate = data.report.filter((report)=> report.type === type).find((report)=>report.id === id);
    if(!reportToUpdate) return;
    const reprotIndex = data.report.findIndex((report)=> report.id ===reportToUpdate.id);
    data.report[reprotIndex] ={
      ...data.report[reprotIndex],
      ...body,
      updated_at:new Date()
    }

    return new ReportResponseDto(data.report[reprotIndex]);
  }


  deleteReport(id:string){
    const reportIndex = data.report.findIndex(report => report.id === id);
    if(reportIndex ===-1) return;
    data.report.splice(reportIndex,1)
    return
  }
}