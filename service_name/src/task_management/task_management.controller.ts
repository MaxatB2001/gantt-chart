import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskManagementService } from './task_management.service';
import { TaskDto } from 'src/DTO/task.dto';
import { ViewDto } from 'src/DTO/view.dto';
import { getMetadataArgsStorage } from 'typeorm';
import { DataFieldDto } from 'src/DTO/data-field.dto';
import { DataFieldValueDto } from 'src/DTO/data-field-value.dto';
import { TaskSchema } from 'src/schemas/Task.schema';

@Controller('task-management')
export class TaskManagementController {
  constructor(private taskManagementService: TaskManagementService) {}

  @Post('/task')
  createTask(@Body() taskDto: TaskDto) {
    return this.taskManagementService.createTask(taskDto);
  }

  @Get('/task')
  getTasks() {
    // const emeta = getMetadataArgsStorage().tables.map((table) => table.target);
    // const entityPropertiesMap = emeta.map((entity) => ({
    //   entity,
    //   properties: getMetadataArgsStorage()
    //     .columns.filter((column) => column.target === entity)
    //     .map((p) => p.propertyName),
    // }));
    // console.log(entityPropertiesMap);
    // return entityPropertiesMap;
    return this.taskManagementService.getTasks()
  }

  @Get("/task/:uid")
  getTask(@Param("uid") uid: string) {
    return this.taskManagementService.getTask(uid)
  }

  @Delete("task/:uid")
  deleteTask(@Param("uid") uid: string) {
    return this.taskManagementService.deleteTask(uid)
  }

  @Post('/view')
  createView(@Body() viewDto: ViewDto) {
    return this.taskManagementService.createView(viewDto);
  }

  @Get('/view')
  getViews() {
    return this.taskManagementService.getViews();
  }

  @Post('/data-field')
  createDataField(@Body() dataFieldDto: DataFieldDto) {
    return this.taskManagementService.createTaskDataField(dataFieldDto)
  }

  @Post("/data-field-value")
  createDataFieldValue(@Body() dataFieldValueDto: DataFieldValueDto) {
    return this.taskManagementService.createTaskDataFieldValue(dataFieldValueDto)
  }

  @Get("/init")
  init() {
    return this.taskManagementService.init()
  }

  @Put("/task")
  updateTask(@Body() task: TaskSchema) {
    return this.taskManagementService.updateTask(task)
  }
}
