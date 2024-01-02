<template>
  <div class="cloud-dashboard" @click="closeDropdown">
    <!-- <div role="banner" class="cfc-platform-bar-container cfc-platform-bar-shadow cfc-platform-bar-white gm2-platform-bar">
      <div class="left-section">
        <div class="project-info">
          <img src="../assets/LOGO.svg" class="logo" alt="">
        </div>
      </div>
      <div class="right-section">
        <div class="header-actions">
          <div class="button-container">
            <button style="height: 30px; border: none; background-color: transparent">
              <svg height="100%" width="100%" viewBox="0 96 960 960" preserveAspectRatio="xMidYMid meet"
                focusable="false">
                <path
                  d="M700 576q0-92-64-156t-156-64q92 0 156-64t64-156q0 92 64 156t156 64q-92 0-156 64t-64 156ZM80 976V256q0-33 23.5-56.5T160 176h400v80H160v480h640V495h80v241q0 33-23.5 56.5T800 816H240L80 976Zm160-320v-80h400v80H240Zm0-120v-80h360v80H240Zm0-120v-80h200v80H240Z">
                </path>
              </svg>
            </button>
          </div>
          <div class="avatar-container">
            <img :src="userAvatarUrl" alt="User" class="icon avatar" @click="toggleDropdown" />
          </div>
          <div class="dropdown" v-if="showDropdown">
            <ul>
              <li>Profile</li>
              <li>Settings</li>
              <li>Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </div> -->

    <main class="dashboard-main">
      <img src="../assets/background_illustration_v2.svg" alt="background" class="background_img">
      <div class="welcome-container">
        <img src="../assets/SUSTech.svg" alt="Cloud Logo" class="welcome-logo">
        <h1 class="welcome-header">&nbsp;欢迎</h1>
        <br>
        <br>
        <div class="welcome-text">
          <h5>欢迎进入南方科技大学宿舍选择系统</h5>
        </div>
        <div class="project-info">
          <h5>
            <span>学号：{{ studentId }}&nbsp;&nbsp;</span>
            <span>姓名：{{ studentName }}</span>
            <br>
            <br>
            <span>当前选房阶段：&nbsp;{{ currentPeriod }}</span>
          </h5>
        </div>
      </div>


      <div class="quick-access-board">
        <div>
          <h2 class="quick-access-head">
            快速访问
          </h2>
        </div>
        <br>
        <div class="quick-access-grid">
          <a class="quick-access-card" href="" @click="jumpRoomSearch()">
            <div class="quick-access-card-content-wrapper">
              <div class="content">
                <div class="centered-icon">
                  <svg data-icon-name="bigquerySectionIcon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"
                    fill-rule="evenodd" aria-hidden="true">
                    <path d="M7 11v1.922c.25.87 1.176 1.48 2 1.85V11H7z" opacity=".6"></path>
                    <path d="M10 9v5.933c.34.04.688.067 1.045.067.326 0 .643-.023.955-.058V9h-2z"></path>
                    <path
                      d="M13.007 12v2.7c.836-.373 1.618-.825 2-1.85V12h-2zm7.883 7.072l-3.19-3.188a.363.363 0 00-.304-.095 7.8 7.8 0 01-1.61 1.6.37.37 0 00.097.3l3.187 3.18a.38.38 0 00.537 0l1.28-1.28a.38.38 0 000-.54z"
                      opacity=".6"></path>
                    <path d="M11 3a8 8 0 100 16 8 8 0 000-16m0 14a6 6 0 110-12 6 6 0 010 12"></path>
                  </svg>
                </div>
                <div class="content-text">
                  <div class="page-title">查找房间</div>
                </div>
              </div>
            </div>
          </a>
          <a class="quick-access-card" href="" @click="jumpTeamSearch()">
            <div class="quick-access-card-content-wrapper">
              <div class="content">
                <div class="centered-icon">
                  <svg fill="currentColor" fill-rule="evenodd" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 17h-1v5H8V11H3V8h9v9zm0-10c-1.65 0-3-1.35-3-3s1.35-3 3-3v6z"></path>
                    <path d="M16 11v11h-3v-5h-1V8h9v3h-5zm-4-4V1c1.65 0 3 1.35 3 3s-1.35 3-3 3z" opacity=".8"></path>
                  </svg>
                </div>
                <div class="content-text">
                  <div class="page-title">查找队伍</div>
                </div>
              </div>
            </div>
          </a>
          <a class="quick-access-card" href="" @click="jumpStudentSearch()">
            <div class="quick-access-card-content-wrapper">
              <div class="content">
                <div class="centered-icon">
                  <svg data-icon-name="iamSectionIcon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"
                    fill-rule="evenodd" aria-hidden="true">
                    <path
                      d="M12 2.084V5.44a2.56 2.56 0 010 5.12V12c1.335 0 4 .824 4 2.46v1.265c-.065.094-.126.19-.195.283A7.433 7.433 0 0112 18.738v2.827a11.062 11.062 0 008-10.667v-5.48l-8-3.334z"
                      opacity=".8"></path>
                    <path
                      d="M12 2.084V5.44a2.56 2.56 0 000 5.12V12c-1.335 0-4 .824-4 2.46v1.265c.065.094.126.19.195.283A7.433 7.433 0 0012 18.738v2.827a11.062 11.062 0 01-8-10.667v-5.48l8-3.334z">
                    </path>
                  </svg>
                </div>
                <div class="content-text">
                  <div class="page-title">查找同学</div>
                </div>
              </div>
            </div>
          </a>
          <a class="quick-access-card" href="" @click="jumpTeam()">
            <div class="quick-access-card-content-wrapper">
              <div class="content">
                <div class="centered-icon">
                  <svg data-icon-name="computeSectionIcon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"
                    fill-rule="evenodd" aria-hidden="true">
                    <path d="M7 3h2v2H7zM3 7h2v2H3z" opacity=".8"></path>
                    <path d="M19 7h2v2h-2z" opacity=".6"></path>
                    <path d="M3 11h2v2H3z" opacity=".8"></path>
                    <path d="M19 11h2v2h-2z" opacity=".6"></path>
                    <path d="M3 15h2v2H3z" opacity=".8"></path>
                    <path d="M19 15h2v2h-2zM7 19h2v2H7z" opacity=".6"></path>
                    <path d="M11 3h2v2h-2z" opacity=".8"></path>
                    <path d="M11 19h2v2h-2z" opacity=".6"></path>
                    <path d="M15 3h2v2h-2z" opacity=".8"></path>
                    <path d="M15 19h2v2h-2z" opacity=".6"></path>
                    <path d="M5 19h14V5H5v14zm12-2H7V7h10v10z"></path>
                    <path d="M15 9H9v6l3-3z"></path>
                    <path d="M12 12l-3 3h6z" opacity=".8"></path>
                    <path d="M15 15V9l-3 3z" opacity=".6"></path>
                  </svg>
                </div>
                <div class="content-text">
                  <div class="page-title">我的队伍</div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>


    </main>

  </div>
</template>

<script>

export default {
  name: 'CloudDashboard',
  // 在这里添加JavaScript逻辑
  data() {
    return {
      showDropdown: false,
      studentId: '11910101',
      studentName: '张三',
      currentPeriod: '选房阶段',
      userAvatarUrl: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg'
    };
  },
  methods: {
    toggleDropdown() {
      event.stopPropagation();
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown() {
      if (this.showDropdown) {
        this.showDropdown = false;
      }
    },
    jumpTeamSearch() {
      console.log('jump');
      this.$router.push('/team/search')
    },
    jumpRoomSearch() {
      this.$router.push('/room/search')
    },
    jumpTeam() {
      this.$router.push({ path: '/team', query: { teamId: 1 } })
    },
    jumpStudentSearch() {
      this.$router.push('/student/search')
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
    let student = JSON.parse(localStorage.getItem('user'));
    this.studentId = student.studentId;
    this.studentName = student.name;

  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.dashboard-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  background-color: #fff;
  color: #202124;
  font-family: 'Roboto', sans-serif;
  position: relative;
}






.welcome-container {
  font-family: Arial, sans-serif;
  position: absolute;
  top: 11%;
  left: 18.5%;
  text-align: left;
}

.background_img {
  position: absolute;
  top: 0;
  left: 15%;
  width: 72%;
  height: auto;
}


.quick-access-board {
  position: relative;
  top: 10%;

}


.quick-access-head {
  font-size: 22px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: normal;
  text-align: left;
}


.quick-access-card {
  border: 1px solid #dadce0;
  border-radius: 8px;
  background-color: #fff;
  display: inline-flex;
  flex-shrink: 0;
  height: 86px;
  width: 256px;
}

.quick-access-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.page-title {
  color: #3c4043;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.centered-icon {
  align-items: center;
  color: #3c4043;
  display: flex;
  flex: 0 0 32px;
  justify-content: center;
}

.content {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  padding: 8px 0 12px;
  position: relative;
  top: 25%;

}

.quick-access-card-content-wrapper {
  height: 86px;
  width: 256px;
  padding-left: 12px;
}


.welcome-logo {
  width: 3vw;
  vertical-align: middle;
  display: inline-block;
}

.welcome-header {
  display: inline-block;
  margin: 0 0 0 1%;
  vertical-align: middle;
}

.welcome-text {
  color: #333;
  margin-bottom: 20px;
}

.project-info {
  margin-bottom: 5px;
}


.cloud-dashboard {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  width: 100vw;
  margin: 0;
  padding: 0;
  background-color: #eceff1;
  color: #202124;
  font-family: 'Roboto', sans-serif;
  position: absolute;
}


.dashboard-footer {
  padding: 0.5rem;
  background-color: #2b7de9;
  /* 页脚背景色 */
  text-align: center;
  width: 100%;
  position:
    absolute;
  bottom: 0;
}


.avatar-container img {
  width: 100%;
  /* 确保图片填满其容器 */
  height: auto;
  /* 保持图片的纵横比 */
  vertical-align: middle;
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

