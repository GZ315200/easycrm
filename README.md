# 简单的 CRM 客户关系管理系统

## 说在前面

感谢我的妻子，对此项目的支持。我妻子希望我给她开发一个客户管理系统，她可以将自己的客户信息很好的存储起来。所以这个项目就产生了。

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

我坚持用 Rust 构建应用的原因是，我太喜欢函数式编程语言了，想学习它的语言规范，真的很令人着迷。希望 Rust 能引领未来。

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

进入 easycrm/easycrm-api/目录下

- 创建 DATABASE_URL 的系统环境变量

```shell
export DATABASE_URL=mysql://user:pass@localhost/easycrm
```

- 运行 Database 的迁移命令

在 root 用户下执行

```shell
cargo install diesel_cli
```

```shell
diesel migration run
```

- 构建并运行

```shell
cargo build --release && cd target/release/
sudo ROCKET_ENV=prod ./easycrm-api
```

App 将在启动在[http://localhost:80](http://localhost:80)，点击检查一下吧

- 另外你可以在该目录下输入命令，运行后端项目

```
cargo run
```

### 前端服务

进入含有 package.json 的目录下，也就是 easycrm 目录下

```shell
# 下载依赖包
npm install

# 启动前端应用，当然你可以自己配置，在package.json里
npm start

```

另外，如果你要连接后端开发环境服务时，需要更改，config.js 文件的配置

**_easycrm/config/config.js_**

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

我将此系统开源出来，也希望方便大家使用。至那些爱自己妻子的程序员兄弟。有任何问题直接 issue，感谢大家
