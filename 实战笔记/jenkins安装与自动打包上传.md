## jenkins安装与自动打包

* 首先去jenkins官网下载jar包，地址：[jenkins下载地址](https://jenkins.io/zh/download/)
* jenkins的启动需要安装java包，建议先安装java包
* 在jar包所在的文件夹目录下打开命令行输入：java -jar jenkins.war --ajp13Port=-1 --httpPort=10086 // 打开本地端口为10086的地址，需要判断10086地址是否被占用
* 访问localhost:10086等到页面加载完成，然后按照官网文档，设置输入密码进入安装插件页面，地址：[jenkins安装](https://jenkins.io/zh/doc/book/installing/#setup-wizard)
* 点击选中推荐安装，等待插件安装完毕。（可能会因为网络问题，导致安装慢或者安装失败，可在之后再重新安装）
* 进入主页面之后还需要下载NodeJS Plugin、Publish Over SSH插件，步骤： Manage Jenkins -> Manage Plugins -> 可选插件，如图
<img src="https://github.com/rocketsbigfan/notes/blob/master/%E5%AE%9E%E6%88%98%E7%AC%94%E8%AE%B0/screenshots/step1.jpg"/>

* 下载安装之后，还需要进行全局设置，配置ssh和nodejs版本，步骤：Manage Jenkins -> Configure System； 输入之后点击保存，回到主页面
<img src="https://github.com/rocketsbigfan/notes/blob/master/%E5%AE%9E%E6%88%98%E7%AC%94%E8%AE%B0/screenshots/step2.jpg"/>
`需要注意的是，服务端是要安装ssh`

* 点击左侧菜单新建Item，输入名称，选择Freestyle project 点击确定
<img src="https://github.com/rocketsbigfan/notes/blob/master/%E5%AE%9E%E6%88%98%E7%AC%94%E8%AE%B0/screenshots/step3.jpg"/>

* 源码管理： 选择svn，然后输入以下信息
<img src="https://github.com/rocketsbigfan/notes/blob/master/%E5%AE%9E%E6%88%98%E7%AC%94%E8%AE%B0/screenshots/step4.jpg"/>

* 构建触发器： 勾选Poll SCM即可，其他可忽略，可查看相关资料选择，轮寻时间
<img src="https://github.com/rocketsbigfan/notes/blob/master/%E5%AE%9E%E6%88%98%E7%AC%94%E8%AE%B0/screenshots/step5.jpg"/>

* 构建环境： 选择Provide Node & npm bin/ folder to PATH，然后选择之前配置的node
<img src="https://github.com/rocketsbigfan/notes/blob/master/%E5%AE%9E%E6%88%98%E7%AC%94%E8%AE%B0/screenshots/step6.jpg"/>

* 构建：进行更新插件，打包
<img src="https://github.com/rocketsbigfan/notes/blob/master/%E5%AE%9E%E6%88%98%E7%AC%94%E8%AE%B0/screenshots/step7.jpg"/>

* 构建后操作： 在更新打包完之后，上传目标服务器
<img src="https://github.com/rocketsbigfan/notes/blob/master/%E5%AE%9E%E6%88%98%E7%AC%94%E8%AE%B0/screenshots/step8.jpg"/>

* 点击保存

`
需要注意点：
* node配置的版本最好跟本地环境一样
* 需要注意目标服务器是否有ssh
* 打包配置文件若配置BundleAnalyzerPlugin插件，有可能上传失败
`