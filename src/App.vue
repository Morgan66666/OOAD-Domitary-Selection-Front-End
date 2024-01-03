<template>
  <div id="app">
    <!--    <b-navbar toggleable="lg" type="dark" variant="success" style="padding-left: 20px; padding-right: 20px;">-->
    <!--&lt;!&ndash;      <b-navbar-brand >&ndash;&gt;-->
    <!--&lt;!&ndash;        <img alt="SUSTech logo" src="./assets/logo.png">&ndash;&gt;-->
    <!--&lt;!&ndash;        宿舍选择系统&ndash;&gt;-->
    <!--&lt;!&ndash;      </b-navbar-brand>&ndash;&gt;-->
    <!--      <b-button-group class="nv-bg" v-show="$route.meta.show">-->
    <!--        <b-button @click="jumpHome" >主页</b-button>-->
    <!--        <b-button @click="jumpTeam">队伍</b-button>-->
    <!--        <b-button @click="jumpMessage">消息</b-button>-->
    <!--        <b-button variant="warning" @click="jumpPersonal">个人主页</b-button>-->
    <!--      </b-button-group>-->
    <!--    </b-navbar>-->

    <div role="banner"
         class="cfc-platform-bar-container cfc-platform-bar-shadow cfc-platform-bar-white gm2-platform-bar"
         v-if="$route.meta.show">
      <div class="left-section">

        <router-link :to="{name: 'HomeView'}">
          <div class="project-info">
            <img src="./assets/LOGO.svg" class="logo" alt="">
          </div>
        </router-link>
      </div>
      <div class="right-section">
        <div class="header-actions">
          <router-link to="/chat">
            <div class="button-container" v-if="isStudent">
              <button style="height: 30px; border: none; background-color: transparent">
                <svg height="100%" width="100%" viewBox="0 96 960 960" preserveAspectRatio="xMidYMid meet"
                     focusable="false">
                  <path
                      d="M700 576q0-92-64-156t-156-64q92 0 156-64t64-156q0 92 64 156t156 64q-92 0-156 64t-64 156ZM80 976V256q0-33 23.5-56.5T160 176h400v80H160v480h640V495h80v241q0 33-23.5 56.5T800 816H240L80 976Zm160-320v-80h400v80H240Zm0-120v-80h360v80H240Zm0-120v-80h200v80H240Z"></path>
                </svg>
              </button>
            </div>
          </router-link>
          <div class="avatar-container">
            <img :src="userAvatarUrl" alt="User" class="icon avatar" @click="toggleDropdown"/>
            <div class="dropdown" v-if="showDropdown">
              <ul>
                <router-link :to="`/user/${id}`" style="color: inherit; text-decoration: none;" v-if="isStudent">
                  <li>主页</li>
                </router-link>
                <li @click="logout">
                  <a href="" style="color: inherit; text-decoration: none;">
                    注销
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

    </div>


    <div :class="{ 'margin-top-60': $route.meta.show}">
      <router-view v-on:child-event="getInfo()"></router-view>
    </div>

  </div>
</template>

<script>
import global from "@/components/Global.vue";

export default {

  data() {
    return {
      showDropdown: false,
      userAvatarUrl: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg',
      id: '',
      globalStudentStatus: global.isStudent,
      isStudent: true
    };
  },
  methods: {
    logout() {
      this.$axios.post('/logout')
          .then(response => {

            console.log(response.data)
          })
          .catch(error => {
            console.error('Error fetching student id:', error);
          });
      localStorage.removeItem("jwt");
      this.$router.push("/login");
    },
    toggleDropdown() {
      event.stopPropagation();
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown() {
      if (this.showDropdown) {
        this.showDropdown = false;
      }
    },
    getInfo() {
      // alert("getInfo")
      this.$axios.get('/users/getid')
          .then(response => {
            this.id = response.data.data;
            // alert(this.id)
            // alert(studentId)
            this.isStudent = this.id.startsWith('2');
            localStorage.setItem("isStudent1", this.isStudent ? '1' : '0')
            // alert(this.isStudent)
            this.$axios.get('/users',
                {
                  params: {
                    id: this.id
                  }
                })
                .then(response => {
                  this.userAvatarUrl = response.data.data.imgURL;
                })
                .catch(error => {
                  console.error('Error fetching student data:', error);
                });
          })
          .catch(error => {
            console.error('Error fetching student id:', error);
          });

    }
  },
  mounted() {
    //如果没有设置Auth,而localStorage中有Auth,则将其设置为localStorage中的值
    if (!this.$store.state.Auth && localStorage.getItem('userAuthToken')) {
      // axios.defaults.headers.common['Authorization'] = localStorage.getItem('userAuthToken')

      const sessionId = localStorage.getItem('userAuthToken'); // 从登录等操作获取用户会话 ID
      // 创建 WebSocket 连接
      this.$store.state.ws = new WebSocket('wss://api.cxpcn.site/ws/create?session_id=' + sessionId);

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
          receivedData = event.data;
          if (receivedData.unreadMsgNum !== undefined) {
            localStorage.setItem('unreadMsgNum', receivedData.unreadMsgNum.toString())
          }
          if (receivedData.msgId !== undefined) {
            if (localStorage.getItem('unreadMsgNum') === null || localStorage.getItem('unreadMsgNum') === undefined) {
              localStorage.setItem('unreadMsgNum', '0')
            }
            localStorage.setItem('unreadMsgNum', (parseInt(localStorage.getItem('unreadMsgNum')) + 1).toString())
          }
        } catch (e) {
          console.log("接收到非 JSON 格式的消息:", event.data);
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
    }
    console.log("ws:" + this.$store.state.ws)
    document.addEventListener('click', this.closeDropdown);
    this.getInfo();
  },
  created() {
    // 每秒检查一次
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
    clearInterval(this.interval);
  },
  // computed: {
  //   isStudent() {
  //     return this.globalStudentStatus;
  //   }
  // },
  watch: {
    $route() {
      this.getInfo();
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

.margin-top-60 {
  margin-top: 60px;
}


nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}


.cfc-platform-bar-container {
  display: flex;
  justify-content: space-between; /* 使子元素分散到两边 */
  align-items: center; /* 垂直居中子元素 */
  width: 100%; /* 确保宽度为100% */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 可选的阴影效果 */
  background-color: #fff; /* 背景颜色 */
  padding: 0 20px; /* 根据需要添加内边距 */

}

.cfc-platform-bar-container > .left-section {

}

.cfc-platform-bar-container > .right-section {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* 设置块级元素在交叉轴上（垂直方向）靠右对齐 */
}

.cfc-platform-bar-shadow.cfc-platform-bar-container.gm2-platform-bar {
  box-shadow: none;
  border-bottom: 1px solid #dadce0;
}

.cfc-platform-bar-container.gm2-platform-bar {
  border-bottom: 0;
  height: 60px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

.cfc-platform-bar-white.gm2-platform-bar {
  background-color: #fff;
}


.project-info {
  margin-bottom: 5px;
}


.header-actions {
  display: flex;
  justify-content: flex-end; /* 使内容靠右对齐 */
  align-items: center;
}

.button-container, .avatar-container {
  margin-right: 10px; /* 在元素之间添加一些间隔 */
}

.avatar-container img {
  width: 100%; /* 确保图片填满其容器 */
  height: auto; /* 保持图片的纵横比 */
  vertical-align: middle;
}

.avatar-container {
  max-width: 40px; /* 限制图片的最大宽度 */
  max-height: 40px; /* 限制图片的最大高度 */
  text-align: center;
}

.button-container {
  margin-top: 2%;
}


.logo {
  width: 13vw;
  margin-left: 1vw;
}

.icon {
  margin-left: 20px;
  cursor: pointer;
}

.avatar {
  border-radius: 50%; /* 头像的圆形效果 */
}


.dropdown {
  top: 20px; /* 根据需要调整 */
  right: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 80px;
}

.dropdown ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.dropdown li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.dropdown li:last-child {
  border-bottom: none;
}

.dropdown li:hover {
  background-color: #f6f6f6;
}
</style>
