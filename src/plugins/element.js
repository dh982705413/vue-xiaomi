import Vue from 'vue'
import { Button, Message, Popconfirm, MessageBox } from 'element-ui'

Vue.use(Button)
Vue.use(Popconfirm)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
