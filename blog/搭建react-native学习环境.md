# [初学 react 时，安装 react-native 学习环境学习环境](https://github.com/StarShi/Big-Monster/tree/master/source/react-learn)

## 前期准备

1. 安装 [10.16.3](https://nodejs.org/download/release/v10.16.3/) 版本的 Node
2. 安装 [2.7.17](https://www.python.org/ftp/python/2.7.17/python-2.7.17.amd64.msi) 版本的 Python
3. 安装 [8u71](https://github.com/frekele/oracle-java/releases/download/8u71-b15/jdk-8u71-windows-x64.exe)版本的 JDK，[Github](https://github.com/frekele/oracle-java/releases)上有备份，官网下载略显复杂，还要注册账号才能下载
4. 安装 Android Studio，需要科学工具
5. 安装 yarn，可以加速 node 模块的下载，npm install -g yarn

### 安装 Python

1. 安装 python2.7 时，如系统中已经存在 python3 的环境，需要重新配置环境变量 D:\software\python2.7 和 D:\software\python2.7\Scripts；
2. 修改 python2.7 目录下的 python.exe 和 pythonw.exe 的名称为 python2.exe、pythonw2.exe；
3. 运行 python2 -m pip install --upgrade pip --force-reinstall，使得不同版本的 pip 可以共存。

### 安装 JDK

1. 安装时，最好默认安装；
2. 默认安装，无需配置环境变量，Android Studio 也不会报错。

### 安装 Android Studio

1.  安装 Android Studio 时，选择默认安装，可更改安装目录，但安装的内容基本不变；
2.  等待安装完成后，设置安装 Android 9 (Pie)，在右下角勾选"Show Package Details"，确保勾选了 Android 9 下的 Android SDK Platform 28 和 Intel x86 Atom_64 System Image；

    ![](https://starshi.github.io/my-images/blog/android_studio_setting1.png)

3.  然后点击 SDK Tools，在右下角勾选"Show Package Details"，确保勾选了 Android SDK Build-Tools 下的 React Native 所必须的 28.0.3 版本；

    ![](https://starshi.github.io/my-images/blog/android_studio_setting2.png)

4.  配置环境变量，创建一个名为 ANDROID_HOME 的环境变量，指向 Android SDK 所在的目录

    ![](https://starshi.github.io/my-images/blog/android_path.png)

5.  把一些工具目录添加到环境变量 Path 中

        %ANDROID_HOME%\platform-tools
        %ANDROID_HOME%\emulator
        %ANDROID_HOME%\tools
        %ANDROID_HOME%\tools\bin

    ![](https://starshi.github.io/my-images/blog/android_path2.png)

## 创建项目

1.  创建

         npx react-native init AwesomeProject

2.  编译并运行

         cd AwesomeProject
         yarn android
