import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { DataFieldValueDto } from 'src/DTO/data-field-value.dto';
import { DataFieldDto } from 'src/DTO/data-field.dto';
import { TaskDto } from 'src/DTO/task.dto';
import { ViewDto } from 'src/DTO/view.dto';
import { groupBy } from 'src/helpers/utils';
import { TaskSchema } from 'src/schemas/Task.schema';
import { TaskDataField } from 'src/schemas/TaskDataField.schema';
import { TaskDataFieldValue } from 'src/schemas/TaskDataFieldValue.schema';
import { ViewSchema } from 'src/schemas/View.schema';
import { Repository } from 'typeorm';

@Injectable()
export class TaskManagementService {
  constructor(
    @InjectRepository(TaskSchema)
    private taskRepo: Repository<TaskSchema>,
    @InjectRepository(ViewSchema)
    private viewRepo: Repository<ViewSchema>,
    @InjectRepository(TaskDataField)
    private taskDataFieldRepo: Repository<TaskDataField>,
    @InjectRepository(TaskDataFieldValue)
    private taskDataFieldValueRepo: Repository<TaskDataFieldValue>,
    @Inject('PROJECT_LIST') private readonly projectListClient: ClientProxy,

  ) {}

  async init() {
    const TaskDataFields = await this.taskDataFieldRepo.find()
    const tasks = await this.taskRepo.find()
    const projects = await lastValueFrom(this.projectListClient.send("get-projects", {}))
    console.log(projects);
    
    return {
      projects,
      TaskDataFields,
      tasks
    } 
  }

  async getTasks() {
    const view = await this.viewRepo.findOne({
      where: { uid: '609f5cc5-0284-4bfa-b59b-a8af5954e048' },
    });
    console.log(view);
    const tasks = await this.taskRepo.find({
      where: view.filters,
      order: view.sortBy,
    });
    console.log(tasks);
    return groupBy(tasks, view.groupBy);
  }

  async createTask(taskDto: TaskDto) {
    return await this.taskRepo.save(taskDto);
  }

  async createView(viewDto: ViewDto) {
    return await this.viewRepo.save(viewDto);
  }

  async getViews() {
    return await this.viewRepo.find();
  }

  async createTaskDataField(dataFieldDto: DataFieldDto) {
    return await this.taskDataFieldRepo.save(dataFieldDto)
  }

  async createTaskDataFieldValue(dataFieldValue: DataFieldValueDto) {
    const task = await this.taskRepo.findOne({where: {uid: dataFieldValue.taskUid}})
    const value = this.taskDataFieldValueRepo.create({...dataFieldValue, task})
    return await this.taskDataFieldValueRepo.save(value)
  }

  async getTaskDataFields() {
    return await this.taskDataFieldRepo.find()
  }
}
