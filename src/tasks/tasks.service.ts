import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum.ts';
import { uuid } from 'uuidv4';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFiletrDto } from './dto/get-tasks-filter-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTasksFiletrDto, user: User) {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, user } });
    if (!task) {
      throw new NotFoundException(`Task with id : ${id} is not availible`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTaskById(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });
    if (result.affected == 0) {
      console.log(result.affected);

      throw new NotFoundException(`Task with id : ${id} not found`);
    }
  }

  async updateTaskById(id: number, status: string, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    // console.log(status);
    task.status = TaskStatus[status]; //filter((task) => task.id == id);
    await task.save();
    return task;
  }
}
