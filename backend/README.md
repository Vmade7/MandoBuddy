# MandoBuddy Backend

## 1) 安装依赖

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## 2) 配置环境变量

```bash
cp .env.example .env
```

然后在 `.env` 中填写你的 Supabase 项目地址与密钥、JWT 配置。

## 3) 初始化数据库

在 Supabase SQL Editor 执行：

`sql/schema.sql`

## 4) 启动服务

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 5) 调试入口

- Swagger 文档：`http://127.0.0.1:8000/docs`
- 健康检查：`GET /health`

## 6) 后续扩展建议

- 接入 Azure 语音：在 `app/services/pronunciation_service.py` 新增 `AzurePronunciationProvider`，通过策略模式替换当前基础评分逻辑。
- Docker 化部署：新增 `Dockerfile` 与 `docker-compose.yml`，将 `.env` 注入容器并配置健康检查。
