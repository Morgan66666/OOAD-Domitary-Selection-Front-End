<template>
  <div class="chat-container">
    <!-- 左侧聊天用户列表 -->
    <div class="chat-sidebar">
      <div v-for="(user, index) in users" :key="index" @click="selectUser(index)"
           :class="{ 'active': user === selectedUser }">
        {{ user.name }}
        <span v-if="user.hasNewMessage" class="new-message-dot"></span>
      </div>
    </div>

    <!-- 右侧聊天框 -->
    <div class="chat-box">
      <div v-if="selectedUser">
        <div class="chat-header">
          <!--          <img :src="selectedUser.avatar" alt="User Avatar" class="user-avatar"/>-->
          <h2>{{ selectedUser.name }}</h2>
        </div>
        <div class="chat-messages">
          <div v-for="(message, index) in selectedUser.messages" :key="index" class="message"
               :class="{ 'own-message': message.isOwn }">
            <div v-if="!message.isOwn" class="message-content">
              <router-link :to="'/user?id=' + selectedUser.id">
                <img :src="selectedUser.avatar" alt="Sender Avatar" class="sender-avatar" v-if="selectedUser.id!==0"/>
              </router-link>

              <div :class="[(message.type === 1 || message.type === 3) && (message.status === 0 || message.status === 1) ? 'message-details-apply':'message-details']">
                <div class="sender-name">
                  {{ selectedUser.name }}
                  <span class="message-time">{{ formatTime(message.timestamp) }}</span>
                </div>
                <div v-if="message.type === 1 || message.type === 3" class="message-card own-card">
                  <p style="width: 100%;text-align: center; font-weight:bold">{{ message.type === 1 ? '入队申请' : '换房申请'}}</p>
                  <div  class="card-body">

                    <p style="width: 100%;text-align: center">{{ message.body }}</p></div>
                  <div style="" v-if="message.status === 0 || message.status === 1" class="card-footer">
                    <button style="margin-top: 10px;margin-left: 60px " @click="acceptApplication(message)">同意</button>
                    <button style="margin-top: 10px;margin-right: 60px " @click="rejectApplication(message)">拒绝</button>
                  </div>
                  <div v-else-if="message.status === 2" class="card-footer">
                    <div class="footer-text">你已同意申请</div>
                  </div>
                  <div v-else-if="message.status === 3" class="card-footer">
                    <div class="footer-text">你已拒绝申请</div>
                  </div>
                </div>
                <div v-else class="message-text">{{ message.body }}</div>
              </div>
            </div>
            <div v-else class="own-message-content">
              <div class="message-details">
                <div class="own-name">
                  {{ username }}
                  <span class="message-time">{{ formatTime(message.timestamp) }}</span>
                </div>
                <div v-if="message.type === 1 || message.type === 3" class="message-card">
                  <div class="card-body">{{ message.body }}</div>
                  <div class="card-footer">
                    <div class="footer-text">你已发送申请</div>
                  </div>
                </div>
                <div v-else class="message-text">{{ message.body }}</div>

              </div>
              <img :src="userAvatar" alt="Sender Avatar" class="user-avatar"/>
            </div>
          </div>

        </div>
        <div v-if="selectedUser.id !== 0" class="chat-input">
          <textarea v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..."></textarea>
          <button @click="sendMessage">Send</button>
        </div>
        <div v-else class="system-message">
          System messages are not editable.
        </div>
      </div>
      <div v-else>
        <h2>Select a user to start chatting.</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>

.active {
  background-color: #888;
}

.message-content {
  display: flex;
  align-items: center;
}

.message-content {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.own-message-content {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 10px;
}


.message-card,
.own-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  height: 100%;
}

.card-body {
  margin-bottom: 5px;
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ddd; /* 添加细线 */
  padding-top: 5px; /* 增加上边距 */
  width: 100%;
  
}

.footer-text {
  font-size: 12px; /* 设置较小的字体大小 */
  color: #888; /* 较淡的颜色 */
  text-align: center; /* 居中对齐 */
}

.own-message-content .message-details {
  margin-right: 15px; /* 或者您需要的间隔大小 */
}

.sender-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.message-details {
  text-align: left;
}

.message-details-apply{
  text-align: left;
  width: 400px;
  height: 240px;
}

.sender-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.own-name {
  font-weight: bold;
  margin-bottom: 5px;
  text-align: right;
}

.message-text {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  margin-top: 5px;
}


.chat-container {
  display: flex;
  height: 100vh;
  background-color: #f0f0f0;
}

.chat-sidebar {
  width: 20%;
  padding: 20px;
  background-color: #fff;
  color: #333;
  overflow-y: auto;
}

.chat-sidebar div {
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s; /* 添加 color 过渡效果 */
}

.chat-sidebar div:hover {
  background-color: #ddd; /* 修改鼠标悬停时的背景颜色 */
  color: #777; /* 修改鼠标悬停时的文字颜色 */
}

.new-message-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  margin-left: 5px;
}

.chat-box {
  flex-grow: 1;
  padding: 20px;
  font-size: 20px; /* 添加字体大小属性，调整为适当的大小 */
}

.chat-header {
  background-color: #444;
  color: #fff;
  padding: 10px;
  text-align: center;
}

.chat-messages {
  height: 60vh;
  overflow-y: auto;
}

.message {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.own-message {
  background-color: #f0f0f0;
  color: #000000;
  align-self: flex-end;
}


.system-message {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.chat-input textarea {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}

.message-time {
  font-size: 12px;
  color: #888;
  margin-left: 5px;
}

/* 按钮样式 */
.chat-box button {
  padding: 6px 12px; /* 调整按钮内边距 */
  margin-right: 8px; /* 增加右边距 */
  border: 1px solid #ccc; /* 灰色边框 */
  border-radius: 5px;
  background-color: #fff; /* 白色背景 */
  color: #333; /* 黑色字体 */
  cursor: pointer;
}

.chat-box button:last-child {
  margin-right: 0; /* 最后一个按钮无右边距 */
}

.chat-box button:hover {
  background-color: #ccc; /* 悬停时的灰色背景 */
  color: #fff; /* 悬停时的白色字体 */
}

.chat-input {
  height: calc(40vh - 120px);
  margin-top: 20px;
  display: flex;
}

.chat-input input {
  flex-grow: 2; /* 增大输入框宽度 */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
}

.chat-input button {
  padding: 14px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  /* 底部距离边框10px*/
  margin-bottom: 10px;


}

</style>

<script>
// import this.$axios from "this.$axios";

export default {
  data() {
    return {
      users: [
        {
          id: 0, name: 'System', hasNewMessage: false, messages: []
        },
        {
          id: 1,
          name: 'User 1',
          avatar: "https://t7.baidu.com/it/u=239897349,3420349069&fm=193&f=GIF",
          hasNewMessage: false,
          messages: [
            {
              msgId: 1,
              type: 0,
              srcId: 1,
              dstId: 2,
              body: 'Hello!1213213212121',
              isOwn: false,
              timestamp: 877.2000000029802, // 可能的发送时间
              status: 0,
            },
            {
              msgId: 1, // 不用管
              type: 1,
              srcId: 1, // 不用管
              dstId: 2, // 不用管
              body: 'Hi!32132132131232123',
              isOwn: true, // 是否是自己发送的消息
              timestamp: '2024-01-01T12:34:56', // 可能的发送时间
              status: 0,
            },
          ]
        },
        {
          id: 2, name: 'User 2', avatar: "url", hasNewMessage: false, messages: []
        },
      ],
      index: -1,
      userId: -1,
      username: "小明",
      userAvatar:
          "https://img2.baidu.com/it/u=3847095998,1084914510&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      //selectedUser:null,
      newMessage: '',
    }
        ;
  },
  methods: {
    formatTime(time) {
      return new Date(time).toLocaleString();
    },
    selectUser(index) {
      console.log("selectUser: " + index)
      this.index = index
      let user = this.selectedUser;
      if (user.hasNewMessage) {
        user.hasNewMessage = false;
        //遍历msg,有status=0的全部改为1
        for (let i = 0; i < user.messages.length; i++) {
          if (user.messages[i].status === 0) {
            user.messages[i].status = 1;
          }
        }
      }
      this.$axios.post("/user/msgs", {
        oppoId: user.id.toString(),
      })
          .then((response) => {
            if (response.data.code !== 200) {
              alert("更新状态失败: " + response.data.msg)
              return -1
            }
          })
          .catch((error) => {
            console.log(error)
            alert("获取消息失败: " + error)
          })
    },
    // 处理接受申请
    acceptApplication(message) {
      this.$axios.post('/teams/accept', {
        msgId: message.msgId.toString(),
        isAccepted: '1',
      })
          .then((response) => {
            if (response.data.code !== 200) {
              alert("接受申请失败: " + response.data.msg)
              return -1
            }
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
            alert("接受申请失败: " + error)
          })
      console.log(`Accept application from ${this.selectedUser.name}`);
      // 更新消息状态
      message.status = 2;
    },

    // 处理拒绝申请
    rejectApplication(message) {
      this.$axios.post('/teams/accept', {
        msgId: message.msgId.toString(),
        isAccepted: '0',
      })
          .then((response) => {
            if (response.data.code !== 200) {
              alert("拒绝申请失败: " + response.data.msg)
              return -1
            }
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
            alert("拒绝申请失败: " + error)
          })

      // 处理拒绝申请的逻辑，可以发送请求到后端
      console.log(`Reject application from ${this.selectedUser.name}`);
      // 更新消息状态
      message.status = 3;
    },
    sendMessage() {
      if (this.newMessage.trim() === '') return;

      const msg = {
        body: this.newMessage,
        srcId: this.userId,
        dstId: this.selectedUser.id,
        status: 0,
        type: 0,
        isOwn: true,
        timestamp: new Date().toLocaleString(),
      };

      try {
        this.sendWSMessage(msg);
      } catch (e) {
        console.log(e);
        alert("发送失败: " + e);
      }
      this.selectedUser.messages.push(msg);

    },
    async addPeople(id) {
      await this.$axios.get("/users?id=" + id.toString())
          .then((response) => {
            if (response.data.code !== 200) {
              console.log(response)
              alert("获取用户信息失败: " + response.data.msg)
              return -1
            }
            let user = response.data.data
            if (user.img_url === null || user.img_url === "" || user.img_url === "undefined" || user.img_url === undefined) {
              user.img_url = "https://img2.baidu.com/it/u=3847095998,1084914510&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";
            }
            console.log(user)
            this.users.push({
              id: user.studentId,
              name: user.name,
              avatar: user.img_url,
              hasNewMessage: false,
              messages: []
            })
          })
          .catch((error) => {
            console.log(error)
            alert("获取用户信息失败: " + error)
          })
    },
    // 向服务器发送消息的示例
    sendWSMessage(message) {
      const msg = {
        type: 0,
        srcId: message.srcId,
        dstId: message.dstId,
        body: message.body,
      };
      this.ws.send(JSON.stringify(msg));
    },
    async addMessage(message) {
      let isOwn, oppositeUser;
      if (message.srcId === this.userId) {
        isOwn = true;
        oppositeUser = message.dstId;
      } else {
        isOwn = false;
        oppositeUser = message.srcId;
      }
      oppositeUser = parseInt(oppositeUser)
      console.log("oppositeUser: " + oppositeUser)
      let user = this.users.find(user => (user.id === oppositeUser));
      if (user === undefined || user === null) {
        await this.addPeople(oppositeUser);
        user = this.users.find(user => (user.id === oppositeUser));
      }
      user.messages.push({
        body: message.body,
        dstId: message.dstId,
        msgId: message.msgId,
        srcId: message.srcId,
        status: message.status,
        timestamp: message.timestamp,
        type: message.type,
        isOwn: isOwn,
      })
      if (this.index !== this.users.indexOf(user) && (message.status === 0 && !isOwn)) {
        user.hasNewMessage = true;
      }
    },
    async initWS() {

      //关闭原有链接
      this.$store.state.ws.close();

      const sessionId = localStorage.getItem('userAuthToken'); // 从登录等操作获取用户会话 ID
      // 创建 WebSocket 连接
      this.$store.state.ws = await new WebSocket('wss://api.cxpcn.site/ws/create?session_id=' + sessionId);

      // 在 WebSocket 连接建立时触发
      this.$store.state.ws.addEventListener("open", (event) => {
        console.log("WebSocket 连接已建立:", event);
      });
      // 在接收到 WebSocket 消息时触发
      this.$store.state.ws.addEventListener("message", (event) => {
        // 处理接收到的消息，更新前端界面等操作
        // 可以简单的认为localStorage里这个值不等于0就是有新消息
        let receivedData;
        try {
          receivedData = JSON.parse(event.data);
          if (receivedData.unreadMsgNum !== undefined) {
            return;
          }
          this.addMessage(receivedData);
        } catch (e) {
          console.log("接收到非 JSON 格式的消息:", event.data);
          return
        }
        console.log("接收到消息:", receivedData);
        // 这里可以根据消息类型进行不同的处理
      });


      // 在连接关闭时触发
      this.$store.state.ws.addEventListener("close", (event) => {
        console.log("WebSocket 连接已关闭:", event);
      });

      // 在连接发生错误时触发
      this.$store.state.ws.addEventListener("error", (error) => {
        console.error("WebSocket 连接发生错误:", error);
      });
    },

    async initMsgs() {
      await this.$axios.get("/user/msgs")
          .then(async (response) => {
            console.log(response)
            if (response.data.code !== 200) {
              alert("获取消息失败: " + response.data.msg)
              return -1
            }
            const msgs = response.data.data;
            for (let i = 0; i < msgs.length; i++) {
              await this.addMessage(msgs[i])
            }
          })
          .catch((error) => {
            console.log(error)
            alert("获取消息失败: " + error)
          })
    }
  },
  created() {
    this.users = [{
      id: 0, name: 'System', hasNewMessage: false, messages: []
    },];
  },
  async mounted() {
    localStorage.setItem('unreadMsgNum', '0');


    this.userId = parseInt(localStorage.getItem('userId'));
    this.username = localStorage.getItem('name');
    if (localStorage.getItem('avatar') === "null" || localStorage.getItem('avatar') === null || localStorage.getItem('avatar') === "" || localStorage.getItem('avatar') === "undefined") {
      this.userAvatar = "https://img2.baidu.com/it/u=3847095998,1084914510&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";
    } else {
      this.userAvatar = localStorage.getItem('avatar');
    }

    if (localStorage.getItem('userAuthToken') !== null && localStorage.getItem('userAuthToken') !== undefined && localStorage.getItem('userAuthToken') !== "") {
      await this.initWS()
      console.log(this.users)
      await this.initMsgs()
      const opponentId = this.$route.query.userId;
      console.log(opponentId)
      if (opponentId !== undefined && opponentId !== null && opponentId !== "") {
        this.index = this.users.findIndex(user => user.id === parseInt(opponentId));
        if (this.index === -1) {
          await this.addPeople(opponentId);
          this.index = this.users.findIndex(user => user.id === parseInt(opponentId));
          this.selectUser(this.index)
        }else{
          this.selectUser(this.index)
        }
      }


    }
  },
  computed: {
    ws() {
      return this.$store.state.ws;
    },
    selectedUser() {
      return this.users[this.index]
    },
  }
};
</script>
