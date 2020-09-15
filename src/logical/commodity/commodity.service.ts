import { Injectable } from '@nestjs/common';
import * as Sequelise from 'sequelize';
import sequelize from '../../database/sequelize';
import { queryCommodityListSql, countCommodityListSql } from '../../../sqls/select';
import { createCommoditySql } from '../../../sqls/insert';
import { updateCommoditySql } from '../../../sqls/update';
import { deleteCommoditySqL } from '../../../sqls/delete';
import { dataStructure } from '../../utils/index';

@Injectable()
export class CommodityService {

  /**
   * 查询商品列表
   * @param {*} body
   * @param {string} username
   * @returns {Promise<any>}
   * @memberof CommodityService
   */
  async queryCommodityList(body:any):Promise<any> {
    const { pageIndex = 1 , pageSize = 10, keywords = '' } = body;
    const currentIndex = (pageIndex -1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize;

    const commondityList: any[] = await sequelize.query(queryCommodityListSql(keywords, currentIndex, pageSize),{
      type: Sequelise.QueryTypes.SELECT, // 你正在执行的查询类型. 查询类型会影响结果在传回之前的格式
      raw: true, // 如果你没有查询的模型定义,请将此项设置为true
      logging: false, //  // 用于记录查询的函数(或false)
    });

    // 统计数据条数 
    const count: any = await sequelize.query(countCommodityListSql(keywords),{
      type: Sequelise.QueryTypes.SELECT,
      raw: true,
      logging: false,
    })[0];
    
    return dataStructure(200, {
      commondityList,
      total: count.total
    }, 'Success');
  } 

  /**
   * 创建商品
   *
   * @param {*} body
   * @param {string} username
   * @returns {Promise<any>}
   * @memberof CommodityService
   */
  async createCommodity(body: any, username: string):Promise<any> {
    const { columnId = 0, name, description = '', marketPrice = 0, saleMoney = 0 } = body;

    await sequelize.query(createCommoditySql(columnId, name, description, marketPrice, saleMoney, username),{
      logging: false
    });

    return dataStructure(200, null, 'Success');
  }

   /**
   * 修改商品
   *
   * @param {*} body
   * @param {string} username
   * @returns
   * @memberof CommodityService
   */
  async updateCommodity(body: any, username: string): Promise<any> {
    const { id, columnId, name, description, saleMoney, marketPrice } = body;

    const transaction = await sequelize.transaction();
    await sequelize.query(updateCommoditySql(columnId, name, description, marketPrice, saleMoney, username, id),{
      transaction,
      logging: false
    });

    return dataStructure(200, null, 'Success');
  }

  /**
   * 删除商品
   *
   * @param {*} body
   * @returns
   * @memberof CommodityService
   */
  async deleteCommodity(body: any): Promise<any> {
    const { id } = body;

    await sequelize.query(deleteCommoditySqL(id), {
      logging: false
    })

    return dataStructure(200, null, 'Success');
  }

}
