import {Controller,Get,Post,Put,Delete,Param,Body,HttpCode} from "@nestjs/common"
import { data,ReportType } from "./data"
import {v4 as uuid} from "uuid"
import {AppService} from"./app.service"


@Controller('report/:type')
export class AppController{
  
  constructor( private readonly appService :AppService){
   
  }

  @Get()
  getAllReports(@Param('type') type:string) {
    const reportType = type==="income" ? ReportType.INCOME :ReportType.EXPENSE
    return this.appService.getAllReports(reportType)
  }
  @Get(':id')
  getAllReportById(
    @Param('type') type:string,
    @Param('id')   id:string
  ) {
    const reportType = type==="income" ? ReportType.INCOME : ReportType.EXPENSE
     
    return data.report.filter((report) => report.type === reportType).find(report => report.id === id)
  }
  @Post()
  createReport(
    @Body(){amount,source}:{amount:number; source:string},
    @Param('type') type:string

  ){
    
    const newReport = {
      id:uuid(),
      source,
      amount,
      created_at:new Date(),
      updated_at: new Date(),
      type:type==="income" ? ReportType.INCOME : ReportType.EXPENSE

    }
    data.report.push(newReport)
    return newReport
  }
  @Put(':id')
  updateReport(
    @Param('type') type:string,
    @Param('id') id:string,
    @Body() body:{amount:number,source:string}
  ) {
    const reportType = type ==="income" ? ReportType.INCOME : ReportType.EXPENSE;
    const reportToUpdate = data.report.filter((report)=> report.type === reportType).find((report)=>report.id === id);
    if(!reportToUpdate) return;
    const reprotIndex = data.report.findIndex((report)=> report.id ===reportToUpdate.id);
    data.report[reprotIndex] ={
      ...data.report[reprotIndex],
      ...body
    }

    return data.report[reprotIndex];
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id') id:string
  ) {
    const reportIndex = data.report.findIndex(report => report.id === id);
    if(reportIndex ===-1) return;
    data.report.splice(reportIndex,1)
    return
  }
}