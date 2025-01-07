# Surf Novel

## 快速开始

setup database and dependencies

```sh
pnpm run install
```

**copy .env.example to .env and add your own env**, just like this:

```txt
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

run the app

```sh
pnpm run dev
```

[prisma](./prisma/README.md)

[project](./project.README.md)

## 格式化

- prettier 是用来格式化代码的。
- husky 是用来在 git 提交时触发钩子
- lint-staged lint-staged 是用来在 git 提交时格式化代码。

```text
.husky/pre-commit 是用来在 git 提交时触发钩子，lint-staged 是用来在 git 提交时格式化代码。
```
