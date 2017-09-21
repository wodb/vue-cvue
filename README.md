# vue
> 接口调用https://www.vue-js.com/api/

# 运行

```
> npm run dev （正常编译模式）

> npm run dist （发布生产版本，对代码进行混淆压缩，提取公共代码，分离css文件）
```

# webpack
>  定义了别名，可以在其它页面使用vue和@static

>  vue-style-loader样式抽离还有些问题，正在研究

>  热替换真心好用，但是有时候报错不知道是什么原因，可能是配置还没有配置完整。

>  代码分割
```
	const Index = resolve => {
	    require.ensure(['../Components/index/index'], () => {
	        resolve(require('../Components/index/index'));
	    });
	}
	const Create = resolve => {
	    require.ensure(['../Components/Create/index'], () => {
	        resolve(require('../Components/Create/index'));
	    });
	}
	const Article = resolve => {
	    require.ensure(['../Components/Article/Article'], () => {
	        resolve(require('../Components/Article/Article'));
	    });
	}
	const Login = resolve => {
	    require.ensure(['../Components/Login/index'], () => {
	        resolve(require('../Components/Login/index'));
	    });
	}
	const Me = resolve => {
	    require.ensure(['../Components/Me/index'], () => {
	        resolve(require('../Components/Me/index'));
	    });
	}
	在webpack里面配置输出路径会单独打包
    chunkFilename: '[name].[chunkhash:5].min.js'
```
# 登陆数据
> 把登陆的数据存到了localstorage里这样刷新就不会从新登陆了

# 一些问题
> 要在模版里使用webpack配置的别名{alias}需要动态引入；用require('@xx/xxx.xx')

> 在使用动态引入的同时需要用v-bind绑定当前属性或者使用:xxx

> 导航菜单跳转详情页面缓存数据到session中，在回退的时候调用生命周期mounted钩子来进行判断;回退到scrolltop位置在this.$nextTick里面设置

> 一开始纠结为什么退回去会一直在顶部感觉scrolltop没有生效，后来发现是element的keep-alive组件问题