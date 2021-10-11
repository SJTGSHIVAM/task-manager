import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum.ts';
import { uuid } from 'uuidv4';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFiletrDto } from './dto/get-tasks-filter-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTasksFiletrDto) {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with id : ${id} is not availible`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected == 0) {
      console.log(result.affected);

      throw new NotFoundException(`Task with id : ${id} not found`);
    }
  }

  async updateTaskById(id: number, status: string): Promise<Task> {
    const task = await this.getTaskById(id);
    // console.log(status);
    task.status = TaskStatus[status]; //filter((task) => task.id == id);
    await task.save();
    return task;
  }
}
