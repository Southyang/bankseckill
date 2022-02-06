import Vue from 'vue';
import { Message } from "element-ui"
//定义一个新的Message方法，多传入一个offset参数，用于this.$messgae中修改offset中的初始值
const $message = options => {
  return Message({
    ...options,
  });
};
//重写一遍success的方法,将offset写入options
["success", "warning", "info", "error"].forEach(type => {
  $message[type] = options => {
    if (typeof options === "string") {
      options = {
        message: options,
        offset: 350,
				showClose	:true,
				duration:2000
      };
    }
    options.type = type;
    return Message(options);
  };
});
//将$message挂载到this上
Vue.prototype.$message = $message;
//如果用要使用 `this.$message.closeAll()`则加上下面
Vue.prototype.$message.closeAll =Message.closeAll;
