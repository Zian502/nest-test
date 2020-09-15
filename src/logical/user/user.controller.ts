import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import {AuthService} from '../auth/auth.service';
import { dataStructure } from '../../utils/index';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService){}

  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Post('find-one')
  findOne(@Body() body:any){
    return this.userService.findOne(body.username)
  }

  // JWT验证 - Step 1: 用户请求登录
  @Post('login')
  async login(@Body() loginParams:any):Promise<any>{
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authRes = await this.authService.validateUser(loginParams.username,loginParams.password);
    switch(authRes.code){
      case 1: return this.authService.certificate(authRes.data);
        break;
      case 2: return dataStructure(400,null,'密码错误');
        break;
      default: return dataStructure(3,null,'查无此人');
        break;
    }
  }

  @Post('register')
  async register(@Body() body: any) {
    return await this.userService.register(body);
  }
}
