import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import {UserController} from './logical/user/user.controller';
import { AuthModule } from './logical/auth/auth.module';
import { CommodityService } from './logical/commodity/commodity.service';
import { CommodityController } from './logical/commodity/commodity.controller';
import { DeployService } from './logical/deploy/deploy.service';
import { DeployController } from './logical/deploy/deploy.controller';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController,UserController, CommodityController, DeployController],
  providers: [AppService, CommodityService, DeployService],
})
export class AppModule {}
