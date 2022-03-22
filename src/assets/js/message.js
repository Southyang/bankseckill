import Vue from 'vue';
import { Message, MessageBox, Loading, Notification } from "element-ui"
//定义Message方法
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
        showClose: true,
        duration: 2000
      };
    }
    options.type = type;
    return Message(options);
  };
});
//将$message挂载到this上
Vue.prototype.$message = $message;

//定义Messagebox方法
const $messagebox = (message, option) => {
  return MessageBox.confirm(message, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: option
  })
}
//将$messagebox挂载到this上
Vue.prototype.$messagebox = $messagebox;

//定义Loading方法
const $loading = (message) => {
  return Loading.service({
    lock: true,
    text: message,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.1)'
  })
}
//将$loading挂载到this上
Vue.prototype.$loading = $loading;

//定义Notification方法
const $notification = (message, type) => {
  return Notification({
    title: '通知',
    message: message,
    type: type,
    showClose: true,
    duration: 5000,
    offset: 100
  })
}
//将$notification挂载到this上
Vue.prototype.$notification = $notification;
