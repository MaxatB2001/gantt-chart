import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { firstValueFrom, last, lastValueFrom } from 'rxjs';
import { DataFieldValueDto } from 'src/DTO/data-field-value.dto';
import { DataFieldDto } from 'src/DTO/data-field.dto';
import { TaskDto } from 'src/DTO/task.dto';
import { ViewDto } from 'src/DTO/view.dto';
import { GroupingTypes } from 'src/enums/grouping.-types.enum';
import { buildTaskTree, groupBy, mapTasksToUser } from 'src/helpers/utils';
import { Filter } from 'src/interfaces/Filter';
import { TaskSchema } from 'src/schemas/Task.schema';
import { TaskDataField } from 'src/schemas/TaskDataField.schema';
import { TaskDataFieldValue } from 'src/schemas/TaskDataFieldValue.schema';
import { ViewSchema } from 'src/schemas/View.schema';
import { Repository } from 'typeorm';

const resourses = [
  {
    uid: '2bd34e3e-23da-4392-9dd1-f3c3ee32d9c6',
    name: 'Юзер1',
    tasks: [],
  },
  {
    uid: '2bd34e3e-23da-4392-9dz2-f3c3ee32d9c6',
    name: 'Юзер2',
    tasks: [],
  },
  {
    uid: '2bd34e3e-23da-4392-9dz2-f3c3ee32d2c6',
    name: 'Юзер3',
    tasks: [],
  },
  {
    uid: '2bd34e3e-23da-4392-9dz2-f3c3ee32d2v6',
    name: 'Ильдар',
    tasks: [],
  },
  {
    uid: '2bd34e3e-23da-4392-9dz2-f3c3zz32d2v6',
    name: 'Веня',
    tasks: [],
  },
  {
    uid: '2bd34e3e-23da-4392-9dz2-f3c3zd32d2v6',
    name: 'Юзерный',
    tasks: [],
  },
];

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
    @Inject('STAFFING_TABLE') private readonly staffingTableClient: ClientProxy,
  ) {}

  async init() {
    const TaskDataFields = await this.taskDataFieldRepo.find();
    const tasks = await this.taskRepo.find({
      order: {
        endDate: "DESC"
      }
      // where: {
      //   taskDataValues: {
      //     value: ""
      //   }
      // }
    });
    const projects = await lastValueFrom(
      this.projectListClient.send('get-projects', {test: {test: "OR"}}),
    );
    
    const users = await lastValueFrom(this.staffingTableClient.send("get-persons", {}))
    console.log(users);
    

    return {
      projects,
      TaskDataFields,
      tasks,
      resourses: users,
    };
  }

  async applyFilter(filter: Filter) {
    console.log(filter);
    

    const tasks = await this.taskRepo.find();

    const projects = await lastValueFrom(
      this.projectListClient.send('get-projects', {test: {test: "OR"}}),
    );

    
  }

  async getTask(uid: string) {
    return this.taskRepo.findOne({ where: { uid } });
  }

  async createTask(taskDto: TaskDto) {
    return await this.taskRepo.save(taskDto);
  }

  async deleteTask(uid: string) {
    return await this.taskRepo.delete(uid);
  }

  async createView(viewDto: ViewDto) {
    return await this.viewRepo.save(viewDto);
  }

  async getViews() {
    return await this.viewRepo.find();
  }

  async updateView() {}

  async createTaskDataField(dataFieldDto: DataFieldDto) {
    return await this.taskDataFieldRepo.save(dataFieldDto);
  }

  async deleteDataField(uid: string) {
    return await this.taskDataFieldRepo.delete(uid)
  }

  async createTaskDataFieldValue(dataFieldValue: DataFieldValueDto) {
    const task = await this.taskRepo.findOne({
      where: { uid: dataFieldValue.taskUid },
    });
    const value = this.taskDataFieldValueRepo.create({
      ...dataFieldValue,
      task,
    });
    return await this.taskDataFieldValueRepo.save(value);
  }

  async getTaskDataFields() {
    return await this.taskDataFieldRepo.find();
  }

  async updateTask(task: TaskSchema) {
    return await this.taskRepo.save(task);
  }

}
