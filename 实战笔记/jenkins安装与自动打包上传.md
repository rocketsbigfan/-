## jenkins安装与自动打包

* 首先去jenkins官网下载jar包，地址：[jenkins下载地址](https://jenkins.io/zh/download/)
* jenkins的启动需要安装java包，建议先安装java包
* 在jar包所在的文件夹目录下打开命令行输入：java -jar jenkins.war --ajp13Port=-1 --httpPort=10086 // 打开本地端口为10086的地址，需要判断10086地址是否被占用
* 访问localhost:10086等到页面加载完成，然后按照官网文档，设置输入密码进入安装插件页面，地址：[jenkins安装](https://jenkins.io/zh/doc/book/installing/#setup-wizard)
* 点击选中推荐安装，等待插件安装完毕。（可能会因为网络问题，导致安装慢或者安装失败，可在之后再重新安装）
* 进入主页面之后还需要下载NodeJS Plugin插件，步骤： Manage Jenkins -> Manage Plugins -> 可选插件，如图
[安装插件](/screenshots/step1.jpg)
