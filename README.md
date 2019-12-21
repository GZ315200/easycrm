# 简单的CRM客户关系管理系统

## 说在前面

感谢我的爱人，她一直工作很忙，在工作里受到很多不如意的事情，依然坚持，她身体一直不是很好。但她是这个世界上最爱我的人，我也爱她。
我爱人希望我给她开发一个客户管理系统，她可以将自己的客户信息很好的存储起来。所以这个项目就产生了。



## 这个系统目前有哪些功能?

- 用户登陆，登出
- 创建，删除，查询，客户信息
- 修改客户跟进状态
- 导出，导入客户信息。

目前就以上功能，未来会逐步完善这个系统。

## 用到那些技术呢？

- react.js
- antd
- rust

我坚持用Rust构建应用的原因是，我太喜欢函数式编程语言了，想学习它的语言规范，真的很令人着迷。希望Rust能引领未来。

## 如何启动应用呢？

### 后端服务

#### 要求

1. Rust and Cargo - 1.41.0 (nightly)
2. Diesel CLI - 1.4.0
3. Mysql -5.x.x

 - Clone 这个项目
```
git clone https://github.com/GZ315200/easycrm.git
```
进入easycrm/easycrm-api/目录下

- 创建DATABASE_URL的系统环境变量
 ```shell
 export DATABASE_URL=mysql://user:pass@localhost/easycrm
 ```
- 运行Database的迁移命令

 ```shell
 diesel migration run
 ```
- 构建并运行

```shell
cargo build --release && cd target/release/
sudo ROCKET_ENV=prod ./easycrm-api
```
App将在启动在[http://localhost:80](http://localhost:80)，点击检查一下吧

- 另外你可以在该目录下输入命令，运行后端项目
```
cargo run
```


### 前端服务

进入含有package.json的目录下，也就是easycrm目录下

```shell
# 下载依赖包
npm install

# 启动前端应用，当然你可以自己配置，在package.json里
npm start

```
另外，你要发布到生产上时，需要更改，config.js文件的配置

***easycrm/config/config.js***

```javascript
 proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
```



## 说在后面

我将此系统开源出来，也希望方便大家使用。至那些爱自己妻子的程序员兄弟。
有任何问题直接issue，感谢大家