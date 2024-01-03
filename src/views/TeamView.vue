<template>
  <div style="height: 100%">
    <div class="team-details-container" style="height: 100%">
      <b-row class="mt-4">
        <b-col md="1"></b-col>
        <b-col md="10">
          <b-card style="align-items: center; justify-content: center">
            <div class="team-details">
              <div v-if="team.groupId !== 0">
                <h2>{{ team.name }}</h2>
                <p style="font-style: italic; color: #888;">{{ team.intro }}</p>
                <p>{{ team.roomId ? "已选择房间: "+team.roomname : "" }}</p>
              </div>
              <div v-else>
                <h2>未加入队伍</h2>
              </div>

              <!-- 如果用户没有队伍 -->
              <div v-if="team.groupId === 0" class="no-team">
                <p>你还没有队伍</p>
                <div class="buttons-1">
                  <button @click="$router.push('/team/search')">搜索队伍</button>
                  <button @click="openCreatePopup">创建队伍</button>
                </div>
              </div>

              <!-- 如果用户有队伍或是队伍成员 -->
              <div v-else class="team-details">
                <!-- 队伍成员表单 -->
                <div v-for="(member, index) in team.members" :key="index" class="member-form">
                  <div class="member-info">
                    <router-link :to="'/chat?userId=' + member.studentId">
                      <img :src="member.imgURL" alt="Member Image" class="member-image"/>
                    </router-link>
                    <div class="member-details">
                      <h3>{{ member.name }} <span v-if="member.studentId === team.leader" class="captain-tag">队长</span></h3>
                      <p>{{
                          (member.intro === '' || member.intro === null) ? '这个用户很懒,没有设置自我介绍!' : member.intro
                        }}</p>
                    </div>
                  </div>

                  <!-- 如果用户是队长，显示踢出按钮 -->
                  <button v-if="isLeader && member.studentId !== team.leader" @click="kickMember(member.studentId)">
                    踢出
                  </button>
                </div>

                <div class="buttons-container">
                  <!-- 显示队伍收藏按钮 -->
                  <button v-if="isMember" @click="viewFavorites">队伍收藏</button>

                  <!-- 加入/退出队伍按钮 -->
                  <button @click="toggleJoinLeave" :disabled="waiting || joinButtonDisabled">
                    {{ isMember ? (waiting ? '等待中' : '退出') : '加入' }}
                  </button>
                </div>
              </div>
            </div>
          </b-card>
        </b-col>
        <b-col md="1"></b-col>
      </b-row>
    </div>
    <!-- 加入队伍弹窗 -->
    <transition name="fade">
      <div v-if="showJoinPopup" class="popup-overlay">
        <div class="popup">
          <h2>申请加入队伍</h2>
          <textarea v-model="applicationText" placeholder="输入申请文本"></textarea>
          <div class="buttons">
            <button @click="cancelJoin">取消</button>
            <button @click="confirmJoin">确定</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 创建队伍弹窗 -->
    <transition name="fade">
      <div v-if="showCreatePopup" class="popup-overlay">
        <div class="popup">
          <h2>创建队伍</h2>
          <input id="teamName" v-model="createTeamName" placeholder="输入队伍名称"/>
          <textarea v-model="introText" placeholder=" 输入队伍介绍"></textarea>
          <div class="buttons">
            <button @click="cancelCreate">取消</button>
            <button @click="confirmCreate">创建</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<style scoped>
.member-form .member-info .member-details h3 .captain-tag {
  font-size: 80%; /* 设置为略小字体，可以根据需要调整百分比 */
  color: #aaa; /* 设置为灰色，可以根据需要调整颜色 */
  margin-left: 5px; /* 可以调整与成员名字的距离 */
}

.no-team {
  text-align: center;
  margin-top: 20px;
  margin-top: 40px;
}

.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

/* 按钮样式 */
button {
  padding: 6px 12px; /* 调整按钮内边距 */
  margin-right: 8px; /* 增加右边距 */
  border: 1px solid #ccc; /* 灰色边框 */
  border-radius: 5px;
  background-color: #000000; /* 白色背景 */
  color: #fff; /* 黑色字体 */
  cursor: pointer;
  width: 90px;
}

button:last-child {
  margin-right: 0; /* 最后一个按钮无右边距 */
}

button:hover {
  background-color: #fff; /* 悬停时的灰色背景 */
  color: #000; /* 悬停时的白色字体 */
}

button[disabled] {
  /* 添加或覆盖禁用按钮的样式 */
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #fff; /* 白色背景 */
  color: #000000; /* 黑色字体 */
  width: 90px;
  /* 其他禁用时的样式设置 */
}


.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

/* 按钮样式 */
button {
  padding: 6px 12px; /* 调整按钮内边距 */
  margin-right: 8px; /* 增加右边距 */
  border: 1px solid #ccc; /* 灰色边框 */
  border-radius: 5px;
  background-color: #000000; /* 白色背景 */
  color: #fff; /* 黑色字体 */
  cursor: pointer;
  width: 90px;
}

button:last-child {
  margin-right: 0; /* 最后一个按钮无右边距 */
}

button:hover {
  background-color: #fff; /* 悬停时的灰色背景 */
  color: #000; /* 悬停时的白色字体 */
}

button[disabled] {
  /* 添加或覆盖禁用按钮的样式 */
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #fff; /* 白色背景 */
  color: #000000; /* 黑色字体 */
  width: 90px;
  /* 其他禁用时的样式设置 */
}


.team-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

}

.member-form {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  width: 70vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.member-form button {
  padding: 6px 12px; /* 调整按钮内边距 */
  margin-right: 8px; /* 增加右边距 */
  border: 1px solid #ccc; /* 灰色边框 */
  border-radius: 5px;
  background-color: #fff; /* 白色背景 */
  color: #333; /* 黑色字体 */
  cursor: pointer;
}

.member-form button:last-child {
  margin-right: 0; /* 最后一个按钮无右边距 */
}

.member-form button:hover {
  background-color: #ccc; /* 悬停时的灰色背景 */
  color: #fff; /* 悬停时的白色字体 */
}


.member-info {
  display: flex;
  align-items: center;
}

.member-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.member-details {
  text-align: left;
}


.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px; /* 设置宽度 */
  margin: 0 auto; /* 水平居中 */
}

.popup textarea {
  width: 100%;
  height: 80px;
  margin: 10px 0;
}

input {
  width: 100%;
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.buttons-container {
  display: flex;
  gap: 10px; /* 设置按钮之间的间距 */
  margin-top: 10px; /* 设置按钮容器与其他元素的上边距 */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
{
  opacity: 0;
}
</style>


<script>


export default {
  data() {
    return {
      team: {
        groupId: 1,
        name: "Team 1",
        leader: 1,
        roomId: 514,
        intro: "This is a team.",
        members: [
          {studentId: 1, name: '张三', intro: "Engineering", imgURL: null},
          {studentId: 2, name: '李四', intro: "Engineering", imgURL: null},
          {studentId: 3, name: '王五', intro: "Engineering", imgURL: null},
          {studentId: 4, name: '赵六', intro: "Engineering", imgURL: null},
        ],
        roomname: "514",
      },
      isMember: false, // 用于判断当前用户是否为此队伍成员,如果是,则查看详细队伍信息,否则只能查看队伍大概信息
      isLeader: false, // 用于判断当前用户是否为此队伍队长,如果是,则可以修改队伍信息以及可以踢人
      waiting: false,  // 用于判断当前用户是否已经发送了加入队伍请求,如果是,则使加入按钮转变为等待中并且不可点击
      joinButtonDisabled: false, // 用于判断当前用户是否可以加入队伍,如果是,则使加入按钮不可点击
      showJoinPopup: false,  // 控制弹窗显示与隐藏
      applicationText: '',  // 用户输入的申请文本
      showCreatePopup: false,  // 控制弹窗显示与隐藏
      createTeamName: '',  // 用户输入的队伍名称
      introText: '',  // 用户输入的队伍介绍
    };
  },
  methods: {
    // 属于队伍详细信息,只有队员才能查看收藏
    viewFavorites() {
      this.$router.push({path: "/team/favour_list"});
    },
    // 绑定在加入/退出队伍按钮上,用于监听用户点击
    toggleJoinLeave() {
      if (this.isMember) {
        // Leave team
        this.$axios.post(`/teams/${this.team.groupId}/leave`)
            .then((response) => {
              console.log(response);
              if (response.data.code !== 200) {
                alert("退出队伍失败: " + response.data.msg);
                return -1;
              }
              alert("退出队伍成功");
              this.initTeam();
            })
            .catch((error) => {
              alert("退出队伍失败: " + error);
              console.log(error);
            })
      } else {
        // Join team
        this.joinButtonDisabled = true;  // 禁用加入按钮
        this.openJoinPopup();
        this.joinButtonDisabled = false;
      }
    },
    kickMember(studentId) {
      this.$axios.post(`/teams/${this.team.groupId}/kick`, {memberId: studentId.toString()})
          .then((response) => {
            console.log(response);
            if (response.data.code !== 200) {
              alert("踢出队员失败: " + response.data.msg);
              return -1;
            }
            alert("踢出队员成功");
            this.initTeam();
          })
          .catch((error) => {
            alert("踢出队员失败: " + error);
            console.log(error);
          })
    },
    // 如果用户没有任何队伍(且此时不是在查看其他队伍),则可以创建队伍
    createTeam() {
      this.$axios.post(`/teams`, {name: this.createTeamName, intro: this.introText})
          .then((response) => {
            console.log(response);
            if (response.data.code !== 200) {
              alert("创建队伍失败: " + response.data.msg);
              return -1;
            }
            alert("创建队伍成功");
            this.initTeam();
          })
          .catch((error) => {
            alert("创建队伍失败: " + error);
            console.log(error);
          })
    },
    // 打开加入弹窗
    openJoinPopup() {
      this.showJoinPopup = true;
    },

    // 取消加入
    cancelJoin() {
      this.showJoinPopup = false;
    },

    // 确认加入
    confirmJoin() {
      // 在这里可以处理用户点击确定按钮的逻辑，例如发送加入请求
      this.$axios.post(`/teams/join`, {leaderId: this.team.leader.toString(), message: this.applicationText})
          .then((response) => {
            console.log(response);
            if (response.data.code !== 200) {
              alert("发送请求失败: " + response.data.msg)
              return -1;
            }
            alert("已发送加入队伍请求");
            this.waiting = true;
          })
          .catch((error) => {
            alert("发送请求失败: " + error);
            console.log(error);
          })
      // 然后关闭弹窗
      this.showJoinPopup = false;
    },

    // 打开创建队伍弹窗
    openCreatePopup() {
      this.createTeamName = '';
      this.showCreatePopup = true;
    },

    // 取消创建队伍
    cancelCreate() {
      this.showCreatePopup = false;
    },

    // 确认创建队伍
    confirmCreate() {
      if (this.createTeamName.trim() === '') {
        alert("队伍名称不能为空");
        return;
      }
      this.createTeam()
      this.showCreatePopup = false;
    },


    // 获取队伍信息
    async fetchTeam() {
      // 获取query参数
      const teamIdString = this.$route.query.teamId;
      let teamId;
      if (!(teamIdString && teamIdString.trim() !== '')) {
        if (localStorage.getItem('teamId') === 'null') {
          console.error("无效的团队 ID:", teamIdString);
          this.team.groupId = 0;
          this.isLeader = false;
          this.isMember = false;

          return -1;
        }
        teamId = parseInt(localStorage.getItem('teamId'));
      } else {
        teamId = parseInt(teamIdString);
      }
      if (isNaN(teamId)) {
        console.error("无效的团队 ID:", teamIdString);
        this.team.groupId = -1;
        return -1;
      }
      return await this.$axios.get(`/teams/${teamId}`)
          .then((response) => {
            const json = response.data;
            if (json.code !== 200) {
              alert("获取队伍信息失败: " + json.msg);
              console.log(response);
              return -1;
            }
            //this.team = json.data;
            this.team.groupId = json.data.groupId;
            this.team.name = json.data.name;
            this.team.leader = json.data.leader;
            this.team.roomId = json.data.roomId;
            this.team.intro = json.data.intro;
            console.log(this._data);

            if(this.team.roomId !== undefined && this.team.roomId !== null && this.team.roomId !== ''){
              this.$axios.get(`/rooms/${this.team.roomId}`)
              .then((response) => {
                if (response.data.code !== 200) {
                  alert("获取房间信息失败: " + response.data.msg);
                  console.log(response);
                  return -1;
                }
                this.team.roomname = response.data.data.name;
                console.log(this.team.roomname);
              })
              .catch((error) => {
                alert("获取房间信息失败: " + error);
                console.log(error);
              })
            }


            return 0;
          })
          .catch((error) => {
            alert("获取队伍信息失败: " + error);
            console.log(error);
            return -1;
          })
    },
    // 获取队伍成员信息
    async fetchTeamMembers() {
      await this.$axios.get(`/teams/${this.team.groupId}/members`)
          .then((response) => {
            if (response.data.code !== 200) {
              alert("获取队伍成员失败: " + response.data.msg);
              console.log(response);
              return -1;
            }
            this.team.members = response.data.data;
            console.log(this.team.members);
            for(let i = 0; i < this.team.members.length; i++){
              if(this.team.members[i].imgURL === undefined || this.team.members[i].imgURL === null || this.team.members[i].imgURL === ''){
                this.team.members[i].imgURL = "https://img2.baidu.com/it/u=3847095998,1084914510&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";
              }
            }
          })
          .catch((error) => {
            alert("获取队伍成员失败: " + error);
            console.log(error);
          })
    },
    // 设置用户权限
    setPermissions() {
      //
      const userId = parseInt(localStorage.getItem('userId'));
      //对齐类型
      this.isMember = this.team.members.some((member) => member.studentId === userId);
      this.isLeader = this.team.leader === userId;
      this.joinButtonDisabled = localStorage['teamId'] !== 'null' && !this.isMember;
    },
    async updateUser() {
      const id = localStorage.getItem('userId');
      await this.$axios.get("/users", {params: {id: id}})
          .then((response) => {
            if (response.data.code !== 200) {
              alert("获取用户信息失败: " + response.data.msg)
              console.log(response)
              return -1
            }
            const user = response.data.data;
            localStorage.setItem('userId', user.studentId);
            localStorage.setItem('teamId', user.groupId);
            localStorage.setItem('account', user.account);
            localStorage.setItem('name', user.name);
          })
          .catch((error) => {
            alert('获取用户信息失败: ' + error.message);
            console.log(error)
            return -1
          })
    },
    async initTeam() {
      await this.updateUser();
      const isInTeam = await this.fetchTeam();
      if (isInTeam !== -1) {
        await this.fetchTeamMembers();
        this.setPermissions();
      }
    },
  },
  mounted() {
    this.initTeam();
  },
};
</script>