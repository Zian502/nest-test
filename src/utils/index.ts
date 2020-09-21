/*
 * @Author: zian
 */
const fs = require('fs');
const { execSync, spawn } = require("child_process");
const path = require('path');

// 数据结构 
export function dataStructure (code:number,data:any,msg:string):object {
  return {
    code: code,
    data: data,
    msg: msg
  }
}

// 递归删除目录
export function deleteFolderRecursive (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file) {
      const curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

// 子进程同步
export function childProcessExecSync ({ order, cwd = path.join(process.cwd()), stdio = 'inherit'}) {
  execSync(
    order,
    stdio,
    {cwd: cwd}
  );
  return cwd;
}

// 子进程异步
export async function childProcessExecAsync ({command, args = [], cwd = path.join(process.cwd()), stdio = 'inherit'}) {
  const childProcess = await spawn(command, args ,{cwd, stdio});
  childProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  childProcess.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  
  childProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}