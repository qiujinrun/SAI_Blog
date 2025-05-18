# 使用官方 Nginx 作为基础镜像
FROM nginx:1.25.3-alpine

# 维护者信息（可选）
LABEL maintainer="your_email@example.com"

# 拷贝前端构建的静态资源到 nginx 的默认网页目录
COPY dist/ /usr/share/nginx/html/

# 拷贝自定义的 Nginx 配置文件，覆盖默认配置
COPY default.conf /etc/nginx/conf.d/default.conf

# 开放 Nginx 默认端口
EXPOSE 80

# 启动 Nginx（必须保持在前台运行）
CMD ["nginx", "-g", "daemon off;"]