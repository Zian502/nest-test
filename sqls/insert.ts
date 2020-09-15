/*
 * @Author: zian
 */

export function insertOneSql(tableName:string|'admin_user',account_name: string, real_name: string, passwd: any, passwd_salt: string, mobile: number, user_status: number, role: number, create_by: number): string {
  const sql = `INSERT INTO ${tableName} (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
    VALUES
  ('${account_name}', '${real_name}', '${passwd}', '${passwd_salt}', '${mobile}', '${user_status}', '${role}', '${create_by}')`;
  return sql;
};

export function registerOneSql(tableName:string|'admin_user',accountName:string,realName:string,hashPwd:any,salt:string,mobile:number):string {
  const sql  = `
      INSERT INTO ${tableName}
        (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
      VALUES
        ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
    `;
  return sql;  
};

export function createCommoditySql(columnId: number, name:string, description: string, marketPrice: number, saleMoney: number, username: string):string {
  const sql = `
    INSERT INTO commodity
      (ccolumn_id, commodity_name, commodity_desc, market_price, sale_money, c_by)
    VALUES
      ('${columnId}', '${name}', '${description}', '${marketPrice}', '${saleMoney}', '${username}')
  `;
  return sql;
};


