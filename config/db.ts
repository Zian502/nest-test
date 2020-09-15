
const productConfig = {
  mysql:{
    port:3306,
    host:'localhost',
    user:'root',
    password:'zhian455454007',
    database:'nest_demo',
    connectionLimit: 10
  }
};

const localConfig = {
  mysql:{
    port:3306,
    host:'localhost',
    user:'root',
    password:'zhian455454007',
    database:'nest_demo',
    connectionLimit: 10
  }
};

const config = process.env.NODE_ENV ? productConfig : localConfig;
export default config;
