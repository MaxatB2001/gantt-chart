import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { title } from 'process';
import { firstValueFrom, last, lastValueFrom } from 'rxjs';
import { DataFieldValueDto } from 'src/DTO/data-field-value.dto';
import { DataFieldDto } from 'src/DTO/data-field.dto';
import { TaskDto } from 'src/DTO/task.dto';
import { ViewDto } from 'src/DTO/view.dto';
import { DataField } from 'src/enums/data-field.enum';
import { GroupingTypes } from 'src/enums/grouping.-types.enum';
import { buildTaskTree, groupBy, mapTasksToUser } from 'src/helpers/utils';
import { Filter } from 'src/interfaces/Filter';
import { TaskSchema } from 'src/schemas/Task.schema';
import { TaskDataField } from 'src/schemas/TaskDataField.schema';
import { TaskDataFieldListItem } from 'src/schemas/TaskDataFieldListItem';
import { TaskDataFieldValue } from 'src/schemas/TaskDataFieldValue.schema';
import { ViewSchema } from 'src/schemas/View.schema';
import { And, Equal, In, Not, Repository } from 'typeorm';

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
    @InjectRepository(TaskDataFieldListItem)
    private taskDataFieldListRepo: Repository<TaskDataFieldListItem>,
    @Inject('PROJECT_LIST') private readonly projectListClient: ClientProxy,
    @Inject('STAFFING_TABLE') private readonly staffingTableClient: ClientProxy,
  ) {}

  async init() {
  const tasksFilter = {
    operator: "AND",
    conditions: [
      {
        operator: "IS",
        dataFieldUid: "8cf6f376-9a0a-46d4-aecd-fc6411ff290f",
        fieldType: DataField.LIST,
        values: [
          "93159ce5-c98d-4687-8b2c-a23b6bd938b6"  
        ]
      },
      // {
      //   operator: "IS",
      //   dataFieldUid: "2bbbaf6a-5039-4c9c-a4bb-63000dc69430",
      //   fieldType: DataField.TEXT,
      //   values: [
      //     "text",
      //     "qrw"
      //   ]
      // },
    ]
  }


    let tasksWhere = [];
    if (tasksFilter.operator == "OR") {

    } else {
      const where = {taskDataValues: {}}
      tasksFilter.conditions.forEach(con => {
        if (con.fieldType == DataField.LIST) {
          where["taskDataValues"]["listId"]  =  con.operator == "IS" ? In(con.values) : Not(In(con.values))
          
        }
        if (con.fieldType == DataField.TEXT) {
          where["taskDataValues"]["value"] = con.operator == "IS" ? In(con.values) : Not(In(con.values))
        }
      })
      tasksWhere.push(where)
    }
         // title: Not(In(['gg', 'Таска 3'])),
          // taskDataValues: And(
          //   {
          //     listId: 'a427211d-89f6-4c25-8358-de5412c07eb6',
          //   },
          //   { value: 'test' },
          // ),
    const TaskDataFields = await this.taskDataFieldRepo.find();
    const tasks = await this.taskRepo.find({
      order: {
        endDate: 'ASC',
      },
      // where: {
      //   taskDataValues: {
      //     value: Not(In([""]))
      //   }
        // taskDataValues: [
        //   {
        //     value: In(["wqdw"])
        //   },
        //   {
        //     value: In(["test"])
        //   }
        // ]
    //   }
      where: tasksWhere
    }
    );

    const projects = await lastValueFrom(
      this.projectListClient.send('get-projects', { test: { test: 'OR' } }),
    );

    const users = await lastValueFrom(
      this.staffingTableClient.send('get-persons', {}),
    );

    // console.log(users);
    await this.colorTasks(tasks, '8cf6f376-9a0a-46d4-aecd-fc6411ff290f');

    return {
      projects,
      TaskDataFields,
      tasks,
      resourses: users,
    };
  }

  async colorTasks(tasks: TaskSchema[], fieldUid: string) {
    const tdf = await this.taskDataFieldRepo.findOne({
      where: {
        uid: fieldUid,
      },
    });

    const mappedColors = tdf.list.reduce((acc, cur) => {
      acc[cur.uid] = cur.color;
      return acc;
    }, {});
    console.log('MAPPED COLORS', mappedColors);

    tasks.forEach((task) => {
      const fTdv = task.taskDataValues.find(
        (tdv) => tdv.taskDataFieldUId == tdf.uid,
      );
      if (fTdv) {
        task.color = mappedColors[fTdv.listId];
      }
    });
  }

  async getAllProperties() {
    // console.log(
    //   this.taskRepo.metadata.columns.forEach((c) => {
    //     console.log(c.propertyName);
    //     console.log(c.type.valueOf());
    //   }),
    // );

    return await this.taskDataFieldRepo.find();
  }

  async getValuesOfField(uid: string) {
    // , select: {taskDataValues: {value: true}}
    const taskDataField = await this.taskDataFieldRepo.findOne({where: {uid}})
    console.log(taskDataField)
    if (taskDataField.type == DataField.LIST) {
      return this.taskDataFieldListRepo.find({where: {tdf: {uid}}})
    }
    return this.taskDataFieldValueRepo.find({where: {taskDataFieldUId: uid, value: Not("")}, select: {value: true}})
  }

  async applyFilter(filter: Filter) {
    console.log(filter);

    const tasks = await this.taskRepo.find();

    const projects = await lastValueFrom(
      this.projectListClient.send('get-projects', { test: { test: 'OR' } }),
    );
  }

  async getTask(uid: string) {
    const task = await this.taskRepo.findOne({ where: { uid } });
    return task;
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
    return await this.taskDataFieldRepo.delete(uid);
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
