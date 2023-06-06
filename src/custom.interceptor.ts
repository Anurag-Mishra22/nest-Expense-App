import {NestInterceptor,ExecutionContext,CallHandler} from "@nestjs/common"
import {map} from "rxjs"



export class CustomInterceptor implements NestInterceptor {
    intercept(context:ExecutionContext,handler:CallHandler){
       console.log("This is Intercepting the Request")
       console.log({context})
    
        return handler.handle().pipe(
            map((data)=>{
                // console.log("This is Intercepting the Response")
                // console.log({data})
                const response = {
                    ...data,
                    createdAt: data.created_at,
                }
                 delete response.updated_at
                 delete response.created_at
                // return data;
                return response;
            })
        )
    }
}