import { createApp } from 'vue'
import UnlineText from "./unline-text.vue"


const app = createApp({})

// 寻找所有组件
// const commonComponents = require.context('./', true, /\.vue/)

// commonComponents.keys().forEach(fileName => {
// 	const module = commonComponents(fileName);
// 	const componentName = module.default.name;
// 	console.log(module);

// 	// 全局注册组件
// 	Vue.component(componentName, module.default);
// })

app.component('UnlineText', UnlineText);