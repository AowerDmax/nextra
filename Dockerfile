# 使用 Node.js 官方基础镜像
FROM node:18-alpine

# 安装 pnpm
RUN npm install -g pnpm && pnpm config set registry https://registry.npmmirror.com/

# 设置工作目录
WORKDIR /app

# 复制构建后的输出文件和必要的配置文件到 Docker 容器
COPY .next .next
COPY public public
COPY .env .env
COPY package.json pnpm-lock.yaml ./

# 安装仅生产环境所需的依赖
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# 暴露应用运行的端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "run", "start"]
