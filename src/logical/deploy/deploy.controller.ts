import { Controller, Get, Request } from '@nestjs/common';
import { DeployService } from './deploy.service';

@Controller('deploy')
export class DeployController {
  constructor(private readonly deployService: DeployService){}

  @Get('update')
  async deployProject (@Request() req: any) {
    return await this.deployService.deploy(req.query.appname, req.query.port);
  }
}
