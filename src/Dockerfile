# 使用官方 Nginx 镜像作为基础镜像
FROM nginx:stable-alpine

# 设置作者（可选）
LABEL author="你的名字 <你的邮箱>"

# 删除默认的 nginx 页面
RUN rm -rf /usr/share/nginx/html/*

# 复制打包好的前端文件到 nginx 的目录中
COPY dist/ /usr/share/nginx/html

# 可选：复制自定义 nginx 配置（见下方说明）
# COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
