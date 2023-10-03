import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { firstValueFrom, lastValueFrom } from 'rxjs';
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
    id: '2bd34e3e-23da-4392-9dd1-f3c3ee32d9c6',
    name: 'Юзер1',
    tasks: [],
  },
  {
    id: '2bd34e3e-23da-4392-9dz2-f3c3ee32d9c6',
    name: 'Юзер2',
    tasks: [],
  },
  {
    id: '2bd34e3e-23da-4392-9dz2-f3c3ee32d2c6',
    name: 'Юзер3',
    tasks: [],
  },
  {
    id: '2bd34e3e-23da-4392-9dz2-f3c3ee32d2v6',
    name: 'Ильдар',
    tasks: [],
  },
  {
    id: '2bd34e3e-23da-4392-9dz2-f3c3zz32d2v6',
    name: 'Веня',
    tasks: [],
  },
  {
    id: '2bd34e3e-23da-4392-9dz2-f3c3zd32d2v6',
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
  ) {}

  async init() {
    const TaskDataFields = await this.taskDataFieldRepo.find();
    const tasks = await this.taskRepo.find({
      // where: {
      //   taskDataValues: {
      //     value: ""
      //   }
      // }
    });
    const projects = await lastValueFrom(
      this.projectListClient.send('get-projects', {}),
    );
    console.log(projects);

    return {
      projects,
      TaskDataFields,
      tasks,
      resourses,
    };
  }

  async applyFilter(filter: Filter) {
    console.log(filter);
    

    const tasks = await this.taskRepo.find();

    const projects = await lastValueFrom(
      this.projectListClient.send('get-projects', {}),
    );

    if (filter.g == GroupingTypes.NORESOURCE) {
      const usersWithTasks = mapTasksToUser(tasks, resourses);
      return [{
        uid: randomUUID(),
        title: "test",
        isOpen: true,
        items: usersWithTasks,
      }]
    }

    if (filter.g == GroupingTypes.TPROJECT) {
      const tree = buildTaskTree(tasks);
      const pwt = projects.map((project) => {
        const tasks = tree.filter((task) => task.projectUid === project.uid);
        return {
          uid: project.uid,
          title: project.name,
          type: "project",
          items: tasks,
          isOpen: true
        };
      });

      return pwt;
    }

    if (filter.g == GroupingTypes.RPROJECT) {
      const usersWithTasks = mapTasksToUser(tasks, resourses);
      const projectWithUsers = projects.map((project) => {
        const users = usersWithTasks.filter((user) =>
          user.tasks.some((task) => task.projectUid === project.uid),
        );
        return {
          uid: project.uid,
          title: project.name,
          type: "project",
          isOpen: true,
          items: users,
        };
      });
      return projectWithUsers;
    }

    if (filter.g == GroupingTypes.DATAFIELD) {
      const udf = await this.taskDataFieldRepo.findOne({where: {uid: filter.udfUid}})
      
      const grouped: Array<{title: string, uid: string, type: string, isOpen: boolean, items: TaskSchema[]}> = []

      for (const task of tasks) {
        for (const dataFieldValue of task.taskDataValues) {
          if (dataFieldValue.taskDataFieldUId === udf.uid) {
            const isExist = grouped.find(item => item.title === dataFieldValue.value)
            if (isExist) {
              isExist.items.push(task)
            } else {
              grouped.push({title: dataFieldValue.value, uid: dataFieldValue.uid,type: "data-field", isOpen: true, items: [task]})
            }
          }
        }
      }
      
      return grouped;
    }
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
