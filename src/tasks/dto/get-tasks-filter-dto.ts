import { IsEnum, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum.ts';

export class GetTasksFiletrDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: string;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
