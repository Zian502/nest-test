
/*
 * @Author: zian
 */

export function  updateCommoditySql (columnId: number, name: string, description:string, marketPrice: number, saleMoney: number, username: string, id: number): string {
  const sql = `
    UPDATE
      commodity
    SEL
      ccolumn_id='${columnId}',
      commodity_name='${name}',
      commodity_desc='${description}',
      market_price='${marketPrice}',
      sale_money='${saleMoney}',
      u_by='${username}'
    WHERE
      id=${id}  
  `;
  return sql;
}