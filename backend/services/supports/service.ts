import { Logger } from '@nestjs/common';

export abstract class Service {
  protected readonly logger = new Logger(Service.name);

  //   constructor() {}
}
