import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from 'src/tasks/task-status.enum.ts';

export class TaskStatusValidationpipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
  ];
  transform(value: any) {
    if (!this.isValidTaskStatus(value)) {
      throw new BadRequestException(`${value} is not a valid task status`);
    }
    return value;
  }

  private isValidTaskStatus(status: any): boolean {
    const idx = this.allowedStatuses.indexOf(status);

    return idx != -1;
  }
}
