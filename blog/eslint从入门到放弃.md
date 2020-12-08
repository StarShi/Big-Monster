# eslint 从入门到放弃

## 安装

```
mkdir eslint-learn
cd eslint-learn
npm init
npm install eslint
```

## 配置

### 方法一

1. 初始化

   ```
   npx eslint --init
   ```

2. 选择配置--检查语法并发现错误

   ![](https://starshi.github.io/my-images/blog/eslint-init.png)

3. 选择配置--使用的模块方式

   ![](https://starshi.github.io/my-images/blog/eslint-init.png)

4. 选择配置--使用的框架

   ![](https://starshi.github.io/my-images/blog/eslint-vue-react-none.png)

5. 选择配置--是否使用 typescript

   ![](https://starshi.github.io/my-images/blog/eslint-use-js.png)

6. 选择配置--项目运行环境

   ![](https://starshi.github.io/my-images/blog/eslint-browser.png)

7. 选择配置--配置文件的类型

   ![](https://starshi.github.io/my-images/blog/eslint-json.png)

### 方法二

直接项目下新增配置文件.eslintrc，将对应的配置填入。

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {}
}
```

## 检测

1. 对单文件进行检测

   ```
     npx eslint ./src/index.js
   ```

2. 对多文件进行检测，并指定检测后缀

   ```
     npx eslint ./src/* --ext .js
   ```

3. 配置 package.json 的 scripts 命令，进行检测

   ```json
   "scripts": {
     "lint":"eslint ./src --ext .js"
   }
   ```

   ```
     npm run lint
   ```
