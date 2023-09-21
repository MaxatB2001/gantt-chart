import { Test, TestingModule } from '@nestjs/testing';
import { TaskManagementController } from './task_management.controller';

describe('TaskManagementController', () => {
  let controller: TaskManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskManagementController],
    }).compile();

    controller = module.get<TaskManagementController>(TaskManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
