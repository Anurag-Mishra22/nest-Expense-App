import {IsNumber,IsPositive,IsString,IsNotEmpty,IsOptional} from "class-validator"
import { ReportType } from "src/data";
import {Exclude,Expose} from "class-transformer"



export class CreateReportDto{

    @IsNumber()
    @IsPositive()
    amount:number;
    
    @IsString()
    @IsNotEmpty()
    source:string;
}

export class UpdateReportDto {
    @IsOptional()
    @IsPositive()
    amount:number;

    @IsOptional()
    @IsString()
    source:string;
}


export class ReportResponseDto {
    id:string;
    source:string;
    amount:number;
    
    @Exclude()
    created_at:Date;

    @Exclude()
    updated_at:Date;
    type:ReportType

    @Expose({name:"createdAt"})
    transformedCreatedAt(){
        return this.created_at;
    }

    constructor(partial:Partial<ReportResponseDto>){
        Object.assign(this,partial);
    }
}