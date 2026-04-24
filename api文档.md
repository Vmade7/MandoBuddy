## **MandoBuddy Backend API Documentation**

## **统一响应格式**

所有 API 都采用统一的响应格式，成功和失败的响应结构如下：

### **成功响应示例**

### **:**



```
{
  "status": "success",
  "data": {
    "key": "value"  // 返回的数据
  },
  "message": "请求成功"
}
```



### **失败响应示例**

### **:**



```
{
  "status": "error",
  "message": "错误信息"
}
```



------





## **接口列表**







### **1.** 

### **用户注册**





- **请求方式**: POST

- **接口地址**: /api/register

- **请求参数**:

  

  - username (string, 必填): 用户名，唯一。
  - password (string, 必填): 密码。
  - email (string, 必填): 用户邮箱，唯一。

  

- **请求体 JSON**:



```
{
  "username": "user1",
  "password": "password123",
  "email": "user1@example.com"
}
```



- 
- **返回示例**:



```
{
  "status": "success",
  "data": {
    "user_id": 1,
    "username": "user1"
  },
  "message": "注册成功"
}
```



- 
- **权限要求**: 无需登录。





------





### **2.** 

### **用户登录**





- **请求方式**: POST

- **接口地址**: /api/login

- **请求参数**:

  

  - username (string, 必填): 用户名。
  - password (string, 必填): 密码。

  

- **请求体 JSON**:



```
{
  "username": "user1",
  "password": "password123"
}
```



- 
- **返回示例**:



```
{
  "status": "success",
  "data": {
    "access_token": "jwt_token"
  },
  "message": "登录成功"
}
```



- 
- **权限要求**: 无需登录。





------





### **3.** 

### **获取用户信息**





- **请求方式**: GET

- **接口地址**: /api/users/{user_id}

- **请求参数**:

  

  - user_id (int, 必填): 用户ID。

  

- **请求体 JSON**: 无

- **返回示例**:



```
{
  "status": "success",
  "data": {
    "user_id": 1,
    "username": "user1",
    "email": "user1@example.com"
  },
  "message": "获取用户信息成功"
}
```



- 
- **权限要求**: 用户登录后需要提供 Authorization header，格式为 Bearer {jwt_token}。





------





### **4.** 

### **查询学习进度**





- **请求方式**: GET

- **接口地址**: /api/progress/{user_id}

- **请求参数**:

  

  - user_id (int, 必填): 用户ID。

  

- **请求体 JSON**: 无

- **返回示例**:



```
{
  "status": "success",
  "data": {
    "user_id": 1,
    "learning_progress": 75,
    "last_login": "2022-04-10T15:30:00Z"
  },
  "message": "查询学习进度成功"
}
```



- 
- **权限要求**: 用户登录后需要提供 Authorization header，格式为 Bearer {jwt_token}。





------





### **5.** 

### **更新学习进度**





- **请求方式**: POST

- **接口地址**: /api/progress/{user_id}

- **请求参数**:

  

  - user_id (int, 必填): 用户ID。

  

- **请求体 JSON**:



```
{
  "learning_progress": 85
}
```



- 
- **返回示例**:



```
{
  "status": "success",
  "data": {
    "user_id": 1,
    "learning_progress": 85
  },
  "message": "学习进度更新成功"
}
```



- 
- **权限要求**: 用户登录后需要提供 Authorization header，格式为 Bearer {jwt_token}。





------





### **6.** 

### **音频发音评测**





- **请求方式**: POST

- **接口地址**: /api/pronunciation

- **请求参数**:

  

  - user_id (int, 必填): 用户ID。
  - audio_file (file, 必填): 用户上传的音频文件。

  

- **请求体 JSON**: 无（文件上传）

- **返回示例**:



```
{
  "status": "success",
  "data": {
    "pronunciation_score": 92,
    "feedback": "发音很好！请注意声调变化。"
  },
  "message": "发音评测完成"
}
```



- 
- **权限要求**: 用户登录后需要提供 Authorization header，格式为 Bearer {jwt_token}。





------





## **请求与响应示例**







### **1. 用户注册请求**





**请求**:

```
POST /api/register
Content-Type: application/json

{
  "username": "user1",
  "password": "password123",
  "email": "user1@example.com"
}
```

**响应**:

```
{
  "status": "success",
  "data": {
    "user_id": 1,
    "username": "user1"
  },
  "message": "注册成功"
}
```



### **2. 用户登录请求**





**请求**:

```
POST /api/login
Content-Type: application/json

{
  "username": "user1",
  "password": "password123"
}
```

**响应**:

```
{
  "status": "success",
  "data": {
    "access_token": "jwt_token"
  },
  "message": "登录成功"
}
```



------





## **其他注意事项**





- **错误处理**: 每个接口都应返回清晰的错误信息，便于前端调试和处理。例如，用户未授权时，返回 401 Unauthorized。
- **文件上传**: 音频文件上传接口应支持多种常见格式（如 .mp3, .wav）。需在请求头中指定 Content-Type: multipart/form-data。
- **JWT 认证**: 对于需要用户授权的接口（如获取用户信息、更新学习进度等），必须通过 Authorization header 传递 Bearer {jwt_token}。





------

