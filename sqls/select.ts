/*
 * @Author: zian
 */

export function findOneSql(tableName:string|'admin_user',username: string): string {
  const sql = `
    SELECT 
      user_id id, real_name realname, role, passwd_salt salt, passwd password, account_name username
    FROM
      ${tableName}
    WHERE
      account_name = '${username}'    
  `;
  return sql;
}

export function queryCommodityListSql(keywords: string, currentIndex: number, pageSize: number): string {
  const sql = `
  SELECT
    id, ccolumn_id columnId, commodity_name name, commodity_desc description,
    sale_money saleMoney, market_price marketPrice,
    c_by createBy, DATE_FORMAT(c_time, '%Y-%m-%d %H:%i:%s') createTime,
    u_by updateBy, DATE_FORMAT(u_time, '%Y-%m-%d %H:%i:%s') updateTime
  FROM
    commodity
  WHERE
    commodity_name LIKE '%${keywords}%'
  ORDER BY
    id DESC
  LIMIT ${currentIndex}, ${pageSize}
  `;
  return sql;
};

export function countCommodityListSql(keywords: string): string {
  const sql = `
    SELECT
      COUNT(*) AS total
    FROM
      commodity
    WHERE
      commodity_name LIKE '%${keywords}%'    
  `;
  return sql;
};