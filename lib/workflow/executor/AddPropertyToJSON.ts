import {  ExecutionEnvironment } from "@/types/executor";
import { ClickElementTask } from "../task/ClickElement";
import { ReadPropertyFromJSONTask } from "../task/ReadPropertyFromJson";
import { AddPropertyToJSONTask } from "../task/AddPropertyToJSON";
export async function AddPropertyToJSONExecutor(environment:ExecutionEnvironment<typeof  AddPropertyToJSONTask>):Promise<boolean>{
    try{
        const jsonData = environment.getInput("JSON");
        if(!jsonData){
            environment.log.error("input->JSON not defined");
        }
        const propertyName = environment.getInput("Property name ");
        if(!propertyName){
            environment.log.error("input->property name not defined");
        }
        const propertyValue = environment.getInput("Property value ");
        if(!propertyValue){
            environment.log.error("input->propertyValue not defined");
        }
        const json = JSON.parse(jsonData);
        json[propertyName] = propertyValue;
        environment.setOutput("Updated JSON ",JSON.stringify(json));
        return true;
    }catch(error:any){
        environment.log.error(error.message);
        return false;
    }
}