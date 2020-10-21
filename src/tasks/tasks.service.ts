import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     console.log(status, search);


    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) || task.description.includes(search))
    //     }

    //     return tasks;
    // }

    async getTaskById(id: number) {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with id "${id}" not found`);
        }

        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {

        return this.taskRepository.createTask(createTaskDto);
    }

    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);
    // }

    // updateTask(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
