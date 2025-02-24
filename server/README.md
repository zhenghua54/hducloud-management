# harvestserver

## 项目说明
云计算实验室的毕业生管理系统（主要功能是这个）后端，基于 Springboot 2.1.x 开发

项目前后端据说由某一漂亮师姐 solo 完成，后经手的同学修改与新增了系统的部分功能

由于系统在此前经手的几届师兄师姐手中并未留下任何相关文档，因此本文档记录的内容时间实际开始于 2023年6月1日

## 更新日志
- 2023-06-11  
修改了 /downloadFile 对应的 controller 逻辑，将文件读写方式改为使用 Hutool 实现的版本  
前端部分修改对应请求处的 js 逻辑
- 2023-06-09  
新增了 /markCheckedStudent 接口，用来标记毕业生的交接情况  
前端部分修改对应请求处的 js 逻辑
- 2024-11-04  
mysql账号root密码root
打包操作
mvn clean package
target目录下生成Harvest-1.0.jar。
打包好的 `.jar` 放置于服务器(192.168.100.203,需要找袁俊峰老师申请VPN账号) `/hdu/lab` 目录中
启动命令：nohup java -jar Harvest-1.0.jar > output.log 2>&1 &


