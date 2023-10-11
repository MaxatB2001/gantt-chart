import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZeebeModule, ZeebeServer } from 'nestjs-zeebe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakModule } from './keycloak/keycloak.module';
import { TaskManagementModule } from './task_management/task_management.module';
import { TaskSchema } from './schemas/Task.schema';
import { ViewSchema } from './schemas/View.schema';
import { TaskDataFieldValue } from './schemas/TaskDataFieldValue.schema';
import { TaskDataField } from './schemas/TaskDataField.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: process.env.POSTGRESQL_HOST,
      port: parseInt(process.env.POSTGRESQL_USER),
      username: process.env.POSTGRESQL_USER,
      password: process.env.POSTGRESQL_PASS,
      database: process.env.POSTGRESQL_DB,
      entities: [TaskSchema, ViewSchema, TaskDataField, TaskDataFieldValue],
      synchronize: true,
      //autoLoadEntities: true
    }
    ),

    ZeebeModule.forRoot({ gatewayAddress: process.env.ZEEBE_ADDRESS }),
    KeycloakModule,
    TaskManagementModule,
    ],
  providers: [
    ZeebeServer,
    AppService
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor() {}
}
