# react-native 学习笔记

## 常用组件

### View 和 Text

View 是对 ios 中的 UIView 和 android 中的 View 或是网页中`<div>`的封装，是所有页面组件的父组件，但只能存放容器，不能存放文字。

Text 是对 ios 中的 UILabel 和 android 中的 TextView 的封装，专门用来显示基本的文本信息。

### Image 和 ImageBackground

Image 是用来加载图片文件，包括网络图片、静态资源、临时的本地图片、以及本地磁盘上的图片（如相册）等。

1. 加载本地图片

   ```html
   <Image style={{width:100,height:200}}
   source={require('@expo/snack-static/react-native-logo.png')} />
   ```

2. 加载网络图片，source 使用对象`{uri: src}`

   ```html
   <Image style={{width:100,height:200}} source={{ uri:
   'https://reactnative.dev/img/tiny_logo.png' }} />
   ```

ImageBackground 图片作为背景，可作为图片容器，相当于带背景的 View

### TextInput

TextInput输入组件。本组件的属性提供了多种特性的配置，譬如自动完成、自动大小写、占位文字，以及多种不同的键盘类型（如纯数字键盘）等等。

## API

### 获取屏幕宽高以及分辨率

      const {height, width,scale} = Dimensions.get('window');

### 获取运行环境

1.  系统

        Platform.OS // 返回ios android

2.  版本

        Platform.Version // android返回数字表示api level，例如10，ios返回字符串表示当前系统版本，例如"10.3"

3.  根据不同的系统读取不同的值

    ```javascript
    import { Platform, StyleSheet } from "react-native";

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        ...Platform.select({
          ios: {
            backgroundColor: "red",
          },
          android: {
            backgroundColor: "blue",
          },
        }),
      },
    });
    ```
