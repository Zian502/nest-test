
import * as crypto from 'crypto';

/* 
  make salt
*/

export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
};

/* 
 * Encrypt password
 * @param password 密码
 * @param salt 密码盐
*/

export function encryptPwd(pwd: string, salt: string): string {
  if (!pwd || !salt) {
    return '';
  }

  const tempSalt = Buffer.from(salt, 'base64');
  return (
    // 10000代表迭代次数 16代表长度
    crypto.pbkdf2Sync(pwd, tempSalt, 10000, 16, 'sha1').toString('base64')
  )
}



