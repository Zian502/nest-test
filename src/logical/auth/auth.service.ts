import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPwd } from '../../utils/cryptogram';
import { dataStructure } from '../../utils/index';

@Injectable()
export class AuthService {
  constructor(private readonly usersService:UserService, private readonly jwtService:JwtService){}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(username:string,password:string):Promise<any>{
    let user = await this.usersService.findOne(username);
    if(user) {
      const salt = user.salt;
      const handledPwd = user.password;
      const handlePwd = encryptPwd(password,salt);
      if(handlePwd === handledPwd) {
        return dataStructure(1,user,'');
      } else {
        return dataStructure(2,null,'密码错误');
      }
    };
    return dataStructure(3,null,'查无此人');
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user:any){
    const payload = {username:user.username,sub:user.id,realname:user.realname,role:user.role};
    try {
      const token = this.jwtService.sign(payload);
      return dataStructure(200,{token},'');
    } catch (error) {
      return dataStructure(400,null,'账号或密码错误');
    }
  }
}
