/* eslint-disable prettier/prettier */
import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowedStatuses = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN
    ]

    transform(value: any, metadata: ArgumentMetadata) {
       // console.log('Value pipe: ', value);
       // console.log('Metadata pipe: ', metadata);
       value = value.toUpperCase();

       if (!this.isStatusValid(value)) {
        throw new BadRequestException(`'${value}' isn't a valid status!`);
        
       }

        return value
    }

    private isStatusValid(status: any){
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1
    }
}