
# API 文档

## 获取短信验证码

#### 接口功能

> 用于用户签到时获取手机验证码

#### URL

> /pc_api/offline_activities/verification_code

#### HTTP请求方式

> POST

#### 请求参数

> |参数|必选|类型|说明|
> |:--:|:--:|:--:|:--|
> |phone |ture    |str   |手机号 |

#### 返回字段

> null

#### 接口示例

> 参数：phone=18999999999

``` json
{"status":1,"message":"短信验证码发送成功","data":""}
```

---------------------

## 签到

#### 接口功能

> 用户签到

#### URL

> /pc_api/offline_activities/sign_in

#### HTTP请求方式

> POST

#### 请求参数

> |参数|必选|类型|说明|
> |:--:|:--:|:--:|:--|
> |phone |ture    |str   |手机号                |
> |vcode |true    |str   |短信验证码(6位数字，5分钟失效)  |

#### 返回字段

> null

#### 接口示例

> 参数：phone=18999999999&vcode=123456

``` json
{"status":1,"message":"签到成功","data":""}
```

---------------------

## 获取签到名单

#### 接口功能

> 获取已签到用户的名单

#### URL

> /pc_api/offline_activities/sign_in

#### HTTP请求方式

> GET

#### 请求参数

> |参数|必选or默认值|类型|说明|
> |:--:|:--:|:--:|:--|
> |start_time |0           |int   |开始时间 |
> |end_time   |系统当前时间 |int   |结束时间 |
> |page       |1           |int   |页数 |
> |page_size  |10          |int   |结束时间 |

#### 返回字段

> |返回字段|字段类型|说明|
> |:--:|:--:|:--|
> |token              |str  |令牌          |
> |token_expire_time  |int  |令牌过期      |

#### 接口示例

``` json
{
    "status":1,
    "message":"ok",
    "data":{
        "page":1,
        "page_size":10,
        "count":2,
        "users":[
            {"id":1,"name":"t001","img":"hasdjas.jpg","sign_in_time":0},
            {"id":2,"name":"t002","img":"dff.ggg","sign_in_time":0}
        ]
    }
}
```

---------------------

## 获取奖项信息

#### 接口功能

> 获取所有奖项的详细信息

#### URL

/pc_api/offline_activities/award

#### HTTP请求方式

GET

#### 请求参数

> null

#### 返回字段

> |返回字段|字段类型|说明|
> |:--:|:--:|:--|
> |id          |str |奖项 id |
> |name        |str |奖项名字 |
> |probability |str |中奖概率 |
> |number      |str |奖品数量 |
> |detail      |str |描述     |

#### 接口示例

``` json
{
  "status": 1,
  "message": "保存成功",
  "data": [
    {"id":1,"name":"特等奖","probability":"0.01000","number":1,"detail":"xxx 7日旅游（机票+住宿）","img":""},
    {"id":2,"name":"一等奖","probability":"0.05000","number":5,"detail":"xxx 笔记本电脑","img":""},
    {"id":3,"name":"二等奖","probability":"0.10000","number":10,"detail":"xxx 手机","img":""}
  ]
}
```

---------------------

## 获取中奖用户

#### 接口功能

> 返回指定或全部奖项的中奖用户

#### URL

/pc_api/offline_activities/lottery

#### HTTP请求方式

GET

#### 请求参数

> |参数|必选or默认|类型|说明|
> |:--:|:--:|:--:|:--|
> |award_id |默认获取所有奖项 |int |奖项ID |

#### 返回字段

> null

#### 接口示例

```json
{
  "status": 1,
  "message": "保存成功",
  "data": [
    {
      "award_id": 1,
      "award_name": "特等奖",
      "detail": "xxx 7日旅游（机票+住宿）",
      "award_img": "",
      "users": [
        {"user_id": 1, "user_name": "t001", "img": "hasdjas.jpg" },
        {"user_id": 2, "user_name": "t002", "img": "dff.ggg" }
      ]
    },
    {
      "award_id": 2,
      "award_name": "一等奖",
      "detail": "xxx 笔记本电脑",
      "award_img": "",
      "users": [
        {"user_id": 2, "user_name": "t002", "img": "dff.ggg" }
      ]
    },
    {
      "award_id": 3,
      "award_name": "二等奖",
      "detail": "xxx 手机",
      "award_img": "",
      "users": []
    }
  ]
}
```

---------------------

## 上传抽奖结果

#### 接口功能

> 上传抽奖结果

#### URL

> /pc_api/offline_activities/lottery

#### HTTP请求方式

> POST

#### 请求参数

> |参数|必选|类型|说明|
> |:--:|:--:|:--:|:--|
> |award_id |ture    |int   |奖项 ID                         |
> |user_ids |true    |str   |获奖用户ID，多个ID以英文逗号分隔|

#### 返回字段

> null

#### 接口示例

> 参数：award_id=2&user_ids=1,2

``` json
{"status":-1,"message":"抽奖失败，奖品数量不足","data":""}
```

---------------------

* ## Admin 登录

#### 接口功能

> 用于前端 Admin 用户登录

#### URL

> /pc_api/offline_activities/login

#### HTTP请求方式

> POST

#### 请求参数

> |参数|必选|类型|说明|
> |:--:|:--:|:--:|:--|
> |user_name |ture    |str   |用户名                           |
> |password  |true    |str   |令牌 `md5(user_name + password)` |

#### 返回字段

> |返回字段|字段类型|说明|
> |:--:|:--:|:--|
> |token              |str  |令牌          |
> |token_expire_time  |int  |令牌过期      |

#### 接口示例

> 参数：user_name=test&password=17dc93eeb4c83c8eba331bb47ac03920

``` json
{
  "status": 1,
  "message": "ok",
  "data": {
    "token": "M485n8uu6jvo6QsHO2O3AgDRs8Oqhk7gryXtig3MTKAHvfByKVK6z6c0fqrm",
    "token_expire_time": 1546935566
  }
}
```

---------------------
