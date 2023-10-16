import { Module } from '@nestjs/common';
import { TaskManagementController } from './task_management.controller';
import { TaskManagementService } from './task_management.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TaskSchema } from 'src/schemas/Task.schema';
import { ViewSchema } from 'src/schemas/View.schema';
import { TaskDataField } from 'src/schemas/TaskDataField.schema';
import { TaskDataFieldValue } from 'src/schemas/TaskDataFieldValue.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TaskDataFieldListItem } from 'src/schemas/TaskDataFieldListItem';

@Module({
  controllers: [TaskManagementController],
  providers: [TaskManagementService],
  imports: [
    TypeOrmModule.forFeature([TaskSchema, ViewSchema, TaskDataField, TaskDataFieldValue, TaskDataFieldListItem]),
    ConfigModule.forRoot({
        envFilePath: '.development.env'
    }),
    ClientsModule.register([
      {
        name: "PROJECT_LIST",
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_ADDRESS],
          queue: "project-list",
          queueOptions: {
            durable: false
          },
        }
      },
      {
        name: "STAFFING_TABLE",
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_ADDRESS],
          queue: "counterparties-staffing",
          queueOptions: {
            durable: false
          },
        }
      }
    ])
  ]
})
export class TaskManagementModule {}
