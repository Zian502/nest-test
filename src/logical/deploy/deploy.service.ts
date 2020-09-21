import { Injectable } from '@nestjs/common';
import { childProcessExecSync, dataStructure, childProcessExecAsync } from '../../utils/index';

const path = require('path');
const fs = require('fs');

@Injectable()
export class DeployService {

  /**
   * 部署
   * @param appname 应用名称 
   * 
   */
  async deploy (appname: string, port: string): Promise<any> {
    if(appname) {
      const projectDir = path.resolve(`../${appname}`);
      // 删除项目目录
      childProcessExecSync({order: `rm -rf ${projectDir}`});
      this.getProject(appname, projectDir);
      console.log('获取项目端口号')
      const projectPort = this.getProjectPort(appname, projectDir);
      console.log('创建docker镜像')
      // 创建 docker 镜像
      await childProcessExecAsync({command:'docker', args:['build', '-t', `${appname}-image:latest`, '.'], cwd: projectDir});
      console.log('docker镜像创建成功')
      console.log('销毁docker容器')
      // 销毁 docker 容器
      await childProcessExecAsync({command:'docker', args:['ps', '-a', `"name=${appname}"`, '--format="{{.Names}}"', '|', 'xargs', '-r', 'docker', 'stop', '|', 'xargs', '-r', 'docker', 'rm']});
      console.log('docker容器销毁成功')
      console.log('docker容器启动中')
      // 启动 docker 容器
      await childProcessExecAsync({command:'docker', args:['run', '-d',  '-p', `${port}:${projectPort}`,  '--name', `${appname}-container`,  `${appname}-image:latest`]});
      console.log('docker容器启动成功')
      return dataStructure(200, null, 'Success');
    };
  }

  /**
   * 拉取代码
   * @param appname 应用名称 
   * @param projectDir 应用目录路径
   */
  getProject (appname: string, projectDir: string): void{
    childProcessExecSync({order: `git clone https://github.com/yuanzhian/${appname}.git ${projectDir}`})
  }

  /**
   * 获取项目的端口号
   * @param appname 应用名称 
   * @param projectDir 应用目录路径
   * 
   */
  getProjectPort (appname: string, projectDir: string): void{
    const pkg = JSON.parse(fs.readFileSync(`${projectDir}/package.json`));
    return pkg.projectInfo.port;
  }
}
