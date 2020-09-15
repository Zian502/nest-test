
/*
 * @Author: zian
 */


export function deleteCommoditySqL(id: number): string {
  const sql = `
    DELETE FROM
      commodity
    WHERE
      id='${id}'
  `;
  return sql;
}