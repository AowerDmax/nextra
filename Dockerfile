# 使用官方 Node.js 镜像作为基础镜像
FROM node:21.6.1-alpine

# 设置工作目录
WORKDIR /app

# 将 `pnpm` 安装到全局环境
RUN npm install -g pnpm

# 将项目的 package.json 和 pnpm-lock.yaml 复制到容器中
COPY package.json pnpm-lock.yaml ./

# 安装项目依赖
RUN pnpm install

# 复制项目的所有文件到容器中
COPY . .

# 列出所有安装的依赖项
RUN pnpm list

# 构建项目（如果有构建步骤）
RUN pnpm build

# 暴露项目运行的端口（假设你使用的是默认端口 3000）
EXPOSE 3000

# 启动应用
CMD ["pnpm", "start"]
