# 今天你摸鱼了吗？
*看到我摸鱼的话请拍拍我*

### 这是什么
这是一个无聊的时候看到wakatime的时候诞生的摸鱼产物。本质上是个小小的单页WEB应用，根据wakatime提供的API来判断你是否摸鱼，并展示给到访的所有人。

![](https://s6.jpg.cm/2021/12/06/LQIlgQ.png)

### 具体功能
 - 展示你当天的工作时间
 - 判断你的时间是否到达目标值
 - 给你发送爱心邮件（
 - 没了

### 食用说明
 - clone
 - 修改配置文件`src/config/config.json`
 - build
 - enjoy it

### 环境变量配置
| 字段        | 说明                                                         | 样例                                    |
| ----------- | ------------------------------------------------------------ | --------------------------------------- |
| NEXT_PUBLIC_NAME | 昵称 | 季悠然                                  |
| NEXT_PUBLIC_AVATAR | 头像 URL | https://example.com/avatar.png          |
| NEXT_PUBLIC_CONTACT | 联系方式（用于提醒你） | example@ex.com                          |
| NEXT_PUBLIC_BLOG | 博客链接  | https://blog.mitsuha.space              |
| NEXT_PUBLIC_WAKATIME_API | 你的 Wakatime 的 时间动态 API  | https://https://wakatime.com/share/.... |
| NEXT_PUBLIC_WAKATIME_LANG | 你的 Wakatime 的 编程语言动态 API | https://https://wakatime.com/share/.... |
| NEXT_PUBLIC_WAKATIME_EDITOR | 你的 Wakatime 的 编辑器动态 API | https://https://wakatime.com/share/.... |
| NEXT_PUBLIC_GOAL | 每日目标工作时间（小时）                                     | 8                                       |
| NEXT_PUBLIC_OFFWORK_TIME | 下班时间（24小时制），下班时间前没达到目标工作时间属于还在努力，下班时间后还没达到工作时间我直接重拳出击 | 19                                      |

### 配置文件说明

| 字段        | 说明                                                         | 样例                                    |
| ----------- | ------------------------------------------------------------ | --------------------------------------- |
| customMsg   | 自定义提示语                                                 | 这个这个，看着原本的填就差不多了        |



### todo

- 优化提示（server酱等等）
- 支持更多api
- ...
