import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例
import { findOneSql } from '../../../sqls/select';
import { registerOneSql } from '../../../sqls/insert';
import { makeSalt, encryptPwd } from '../../utils/cryptogram';
import { dataStructure } from '../../utils/index';

@Injectable()
export class UserService {
  /**
   * 查询是否有该用户
   * @param username 用户名
   */
  async findOne(username: string): Promise<any | undefined> {
    try {
      const res = await sequelize.query(findOneSql('admin_user', username), {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: true // 是否将 SQL 语句打印到控制台，默认为true
      });
      const user = res[0];
      return user
      // if (user) {
      //   return {
      //     code: 200,
      //     data: {
      //       user
      //     },
      //     msg: 'success'
      //   }
      // } else {
      //   return {
      //     code: 400,
      //     msg: 'error'
      //   }
      // }
    } catch (error) {
      console.log(error)
      return void 0;
    }
  }

  /**
   * 注册
   * @param requestBody 请求体
   * 
   */

  async register(requestBody: any): Promise<any | undefined> {
    const { accountName, realName, password, repassword, mobile } = requestBody;
    if (password != repassword) {
      return dataStructure(400, null, '两次密码不一致');
    }
    const user = await this.findOne(accountName);
    if (user) {
      return dataStructure(400, null, '用户已存在');
    }
    const salt = makeSalt();
    const handlePwd = encryptPwd(password, salt);
    try {
      await sequelize.query(registerOneSql('admin_user', accountName, realName, handlePwd, salt, mobile), {
        logging: false
      });
      return dataStructure(200, null, '注册成功')
    } catch (error) {
      return dataStructure(200, null, `注册失败:${error}`)
    }
  }
}
