# eslint 从入门到放弃

## 安装

```
mkdir eslint-learn
cd eslint-learn
npm init
npm install eslint --save-dev
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
     // 一层目录
     npx eslint ./src/* --ext .js
   ```

   ```
     // 两层目录
     npx eslint ./src/**/* --ext .js
   ```

3. 配置 package.json 的 scripts 命令，对整个文件夹进行检测

   ```json
   {
     "scripts": {
       "lint": "eslint ./src --ext .js"
     }
   }
   ```

   ```
     npm run lint
   ```

## 配置介绍

## 配合 prettier 使用

1. 安装 prettier，并创建配置文件.prettierrc

   ```
   npm install prettier --save-dev
   ```

   ```json
   {
     "printWidth": 90,
     "singleQuote": true,
     "trailingComma": "none"
   }
   ```

2. 安装 eslint-plugin-prettier 检测插件

   ```
   npm install eslint-plugin-prettier --save-dev
   ```

3. 配置 prettier 插件，并在.eslintrc 添加规则，检查标记

   ```json
   {
     "plugins": ["prettier"],
     "rules": {
       "prettier/prettier": "error"
     }
   }
   ```

4. （--fix）对存在 error 的地方进行报错显示，用 prettier 来替代 eslint 的格式化功能

   ```json
   {
     "scripts": {
       "lint": "eslint ./src --ext .js --fix"
     }
   }
   ```

5. 如果和已存在的插件冲突，可直接使用 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) 配置，关闭一些不必要的或是与 prettier 冲突的 lint 选项。

   ```
   npm install eslint-config-prettier --save-dev
   ```

   ```json
   {
     "extends": ["eslint:recommended", "prettier"],
     "plugins": ["prettier"],
     "rules": {
       "prettier/prettier": "error"
     }
   }
   ```

   > 官方建议：如果要修复大量以前未格式化的代码，请考虑暂时禁用该 prettier/prettier 规则，单独运行 eslint --fix && prettier --write。

6. 如果需要支持 typescript、vue 和 react 等，可添加 prettier 的其他配置

   ```json
   {
     "extends": [
       "eslint:recommended",
       "prettier",
       "prettier/@typescript-eslint",
       "prettier/vue",
       "prettier/react"
     ]
   }
   ```

## git 提交自动检测

自动检测，主要有 pre-commit 和 husky 两个插件，husky 比较全面支持 git 所有的 hook 函数，因此建议选择 husky。

注意： 需要 Node >= 10 和 Git >= 2.13.0

1. 安装 husky

   ```
   npm install husky --save-dev
   ```

2. 配置 package.json

   ```json
   {
     "husky": {
       "hooks": {
         "pre-commit": "npm run lint"
       }
     }
   }
   ```

   > 注意：经 lint 后格式不正确的文件，需要再次手动提交

3. 配合 lint-staged 进行使用，只 lint 改动的代码，lint 后会自动提交，可用在现有的项目中，渐进式的演进 lint 规范。

   ```
   npm install lint-staged --save-dev
   ```

   ```json
   // package.json
   {
     "husky": {
       "hooks": {
         "pre-commit": "lint-staged"
       }
     },
     "lint-staged": {
       "*.{ts,js}": ["eslint --fix", "prettier --write"]
     }
   }
   ```
