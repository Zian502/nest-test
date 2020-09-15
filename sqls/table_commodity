CREATE TABLE `commodity` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品ID',
  `ccolumn_id` smallint(6) NOT NULL COMMENT '商品_栏目ID',
  `commodity_name` varchar(10) NOT NULL COMMENT '商品_名称',
  `commodity_desc` varchar(20) NOT NULL COMMENT '商品_介绍',
  `market_price` decimal(7,2) NOT NULL DEFAULT '0.00' COMMENT '市场价',
  `sale_money` decimal(7,2) NOT NULL DEFAULT '0.00' COMMENT '销售价',
  `c_by` varchar(24) NOT NULL COMMENT '创建人',
  `c_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `u_by` varchar(24) NOT NULL DEFAULT '0' COMMENT '修改人',
  `u_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `idx_ccid` (`ccolumn_id`),
  KEY `idx_cn` (`commodity_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品表';
