<template>
  <div class="main" @click="closeDropdown">
    <!-- <div role="banner"
         class="cfc-platform-bar-container cfc-platform-bar-shadow cfc-platform-bar-white gm2-platform-bar">
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
                    d="M700 576q0-92-64-156t-156-64q92 0 156-64t64-156q0 92 64 156t156 64q-92 0-156 64t-64 156ZM80 976V256q0-33 23.5-56.5T160 176h400v80H160v480h640V495h80v241q0 33-23.5 56.5T800 816H240L80 976Zm160-320v-80h400v80H240Zm0-120v-80h360v80H240Zm0-120v-80h200v80H240Z"></path>
              </svg>
            </button>
          </div>
          <div class="avatar-container">
            <img :src="userAvatarUrl" alt="User" class="icon avatar" @click="toggleDropdown"/>
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
            <span>学号/工号：{{ studentId }}&nbsp;&nbsp;</span>
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
          <a class="quick-access-card" href="#" @click="jumpRoomSearch">
            <div class="quick-access-card-content-wrapper">
              <div class="content">
                <div class="centered-icon">
                  <svg data-icon-name="bigquerySectionIcon" viewBox="0 0 24 24" width="24" height="24"
                       fill="currentColor"
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
          <a class="quick-access-card" href="#" @click="jumpTeamSearch" v-if="isStudent">
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
          <a class="quick-access-card" href="#" @click="jumpUserSearch">
            <div class="quick-access-card-content-wrapper">
              <div class="content">
                <div class="centered-icon">
                  <svg data-icon-name="iamSectionIcon" viewBox="0 0 24 24" width="24" height="24"
                       fill="currentColor" fill-rule="evenodd" aria-hidden="true">
                    <path
                        d="M12 2.084V5.44a2.56 2.56 0 010 5.12V12c1.335 0 4 .824 4 2.46v1.265c-.065.094-.126.19-.195.283A7.433 7.433 0 0112 18.738v2.827a11.062 11.062 0 008-10.667v-5.48l-8-3.334z"
                        opacity=".8"></path>
                    <path
                        d="M12 2.084V5.44a2.56 2.56 0 000 5.12V12c-1.335 0-4 .824-4 2.46v1.265c.065.094.126.19.195.283A7.433 7.433 0 0012 18.738v2.827a11.062 11.062 0 01-8-10.667v-5.48l8-3.334z"></path>
                  </svg>
                </div>
                <div class="content-text">
                  <div class="page-title">查找同学</div>
                </div>
              </div>
            </div>
          </a>
          <a class="quick-access-card" href="#" @click="jumpTeam" v-if="isStudent">
            <div class="quick-access-card-content-wrapper">
              <div class="content">
                <div class="centered-icon">
                  <svg data-icon-name="computeSectionIcon" viewBox="0 0 24 24" width="24" height="24"
                       fill="currentColor" fill-rule="evenodd" aria-hidden="true">
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
                  <div class="page-title">队伍管理</div>
                </div>
              </div>
            </div>
          </a>
          <a class="quick-access-card" href="#" @click="inputGroup" v-if="isTeacher">
            <div class="quick-access-card-content-wrapper">
              <div class="content">
                <div class="centered-icon">
                  <svg fill="currentColor" fill-rule="evenodd" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 17h-1v5H8V11H3V8h9v9zm0-10c-1.65 0-3-1.35-3-3s1.35-3 3-3v6z"></path>
                    <path d="M16 11v11h-3v-5h-1V8h9v3h-5zm-4-4V1c1.65 0 3 1.35 3 3s-1.35 3-3 3z" opacity=".8"></path>
                  </svg>
                </div>
                <div class="content-text">
                  <div class="page-title">数据管理</div>
                </div>
              </div>
            </div>
          </a>
          <el-dialog title="" :visible.sync="dialogFormVisible" class="dialog-st" width="30%" v-if="isTeacher">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
              <el-form-item label="姓名" prop="name">
                <el-input type="text" v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="学号" prop="account">
                <el-input type="text" v-model="ruleForm.account"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="ruleForm.gender">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>

              <!-- 教育程度 -->
              <el-form-item label="教育程度" prop="educationLevel">
                <el-radio-group v-model="ruleForm.educationLevel">
                  <el-radio :label="0">硕士</el-radio>
                  <el-radio :label="1">博士</el-radio>
                </el-radio-group>
              </el-form-item>

              <!-- 密码 -->
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>

              <!-- 确认密码 -->
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input type="password" v-model="ruleForm.confirmPassword" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="submitFormTeacher('ruleForm')">提交</el-button>
            </div>
          </el-dialog>
          <a class="quick-access-card" href="#" @click="setTime" v-if="isTeacher">
            <div class="quick-access-card-content-wrapper">
              <div class="content">
                <div class="centered-icon">
                  <svg data-icon-name="computeSectionIcon" viewBox="0 0 24 24" width="24" height="24"
                       fill="currentColor" fill-rule="evenodd" aria-hidden="true">
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
                  <div class="page-title">设置选房时段</div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>


      <div class="modal-overlay" :style="{ display: isInput ? 'flex' : 'none' }">
        <div class="modal-content">
          <div class="close-button" @click="closeInputForm">x</div>
          <button class="button" @click="inputRoom">批量导入房间</button>
          <button class="button" @click="inputUser">批量导入学生</button>
          <button class="button" @click="outputRoom">批量导出选房情况</button>
          <button class="button" @click="dialogFormVisible = true">创建单个学生</button>
        </div>
      </div>

      <div class="modal-overlay" :style="{ display: isSetting ? 'flex' : 'none' }">
        <div class="modal-content">
          <div class="close-button" @click="closeSettingForm">x</div>

          <form @submit.prevent="submitForm">
            <!-- Dropdown for selecting an option -->
            <div>
              <label for="selectOption">选择一个选项:</label>
              <select id="selectOption" v-model="type" @change="setTime">
                <option value = 1>硕士（男）</option>
                <option value = 2>硕士（女）</option>
                <option value = 3>博士（男）</option>
                <option value = 4>博士（女）</option>
              </select>
            </div>

            <div class="time-pickers-container">
              <!-- Time pickers -->
              <div class="time-picker">
                <label for="time1">选房时段1:</label>
                <input type="datetime-local" id="time1" v-model="beginTime1">
              </div>
              <div class="time-picker">
                <label for="time2">~</label>
                <input type="datetime-local" id="time2" v-model="endTime1">
              </div>
              <div class="time-picker">
                <label for="time3">选房时段2:</label>
                <input type="datetime-local" id="time3" v-model="beginTime2">
              </div>
              <div class="time-picker">
                <label for="time4">~:</label>
                <input type="datetime-local" id="time4" v-model="endTime2">
              </div>
              <div class="time-picker">
                <label for="time5">选房时段3:</label>
                <input type="datetime-local" id="time5" v-model="beginTime3">
              </div>
              <div class="time-picker">
                <label for="time6">~:</label>
                <input type="datetime-local" id="time6" v-model="endTime3">
              </div>
              <div class="time-picker">
                <label for="time7">选房时段4:</label>
                <input type="datetime-local" id="time7" v-model="beginTime4">
              </div>
              <div class="time-picker">
                <label for="time8">~:</label>
                <input type="datetime-local" id="time8" v-model="endTime4">
              </div>
            </div>
            <button class="button" type="submitForm">提交</button>
          </form>
        </div>
      </div>

      <div id="errorModal" class="modal-overlay" :style="{ display: showErrorModal ? 'flex' : 'none' }">
        <div class="modal-content">
          <div class="close-button" @click="closeErrorModal">x</div>
          <p id="errorMessage">{{ errorType }}</p>
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
    var checkRequired = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('该字段不能为空'));
      } else {
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }

    };
    return {
      dialogFormVisible: false,
      config: null,
      showDropdown: false,
      studentId: '11910101',
      studentName: '张三',
      currentPeriod: '选房阶段',
      isStudent: true,
      isTeacher: false,
      isInput: false,
      isInputRoom: true,
      isSetting: false,
      type: 0,
      beginTime1: "", 
      endTime1: "", 
      beginTime2: "", 
      endTime2: "", 
      beginTime3: "", 
      endTime3: "", 
      beginTime4: "", 
      endTime4: "", 
      showErrorModal: false,
      errorType: '',
      ruleForm: {
        studentId: '',
        name: '',
        account: '',
        gender: '',
        educationLevel: '',
        password: '',
        confirmPassword: '',
        type: '',
      },
      rules: {
        name: [
          { validator: checkRequired, trigger: 'blur' }
        ],
        account: [
          { validator: checkRequired, trigger: 'blur' }
        ],
        gender: [
          { validator: checkRequired, trigger: 'change' }
        ],
        educationLevel: [
          { validator: checkRequired, trigger: 'change' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitFormTeacher(formName) {
      if (this.ruleForm.gender === 1) {
        if (this.ruleForm.educationLevel === 0) {
          this.ruleForm.type = 1;
        } else {
          this.ruleForm.type = 3;
        }
      } else {
        if (this.ruleForm.educationLevel === 0) {
          this.ruleForm.type = 2;
        } else {
          this.ruleForm.type = 4;
        }
      }

      if (this.ruleForm.password === '' ) {
        this.$message({
          message: "密码为空",
          type: "error"
        })
        return false
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/users',
              {
                name: this.ruleForm.name,
                type: this.ruleForm.type,
                account: this.ruleForm.account,
                password: this.ruleForm.password
              })
              .then(response => {
                if (response.data.code === 200) {
                  this.$message({
                    message: "创建成功",
                    type: 'success'
                  });
                } else
                  this.$message({
                    message: response.data.msg,
                    type: 'error'
                  });
                  this.dialogFormVisible = false;
                  this.fetchStudentData();
                }
              )
              .catch(error => {
                console.error('Error updating student data:', error);
              });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
    jumpRoomSearch() {
      this.$router.push({path:"/room/search"})
    },
    jumpTeamSearch() {
      this.$router.push({path:"/team/search"})
    },
    jumpUserSearch() {
      this.$router.push({path:"/student/search"})
    },
    jumpTeam() {
      const id = localStorage.getItem("teamId")
      this.$router.push({path:"/team",query: {id}})
    },
    inputGroup() {
      this.isInput = true;
    },
    setTime() {
      this.$axios.get('/selection-time/' + this.type)
        .then(response => {
          this.beginTime1 = new Date(response.data.data.beginTime1).toISOString().slice(0, 16);
          this.endTime1 = new Date(response.data.data.endTime1).toISOString().slice(0, 16);
          this.beginTime2 = new Date(response.data.data.beginTime2).toISOString().slice(0, 16);
          this.endTime2 = new Date(response.data.data.endTime2).toISOString().slice(0, 16);
          this.beginTime3 = new Date(response.data.data.beginTime3).toISOString().slice(0, 16);
          this.endTime3 = new Date(response.data.data.endTime3).toISOString().slice(0, 16);
          this.beginTime4 = new Date(response.data.data.beginTime4).toISOString().slice(0, 16);
          this.endTime4 = new Date(response.data.data.endTime4).toISOString().slice(0, 16);
        })
        .catch(error => {
          console.error('Error fetching selection time:', error);
        });
      this.isSetting = true;
    },
    closeInputForm() {
      this.isInput = false;
    },
    closeOutputForm() {
      this.isOutput = false;
    },
    closeSettingForm(){
      this.isSetting = false;
    },
    inputRoom(){
      this.isInputRoom = true;
      // 创建一个<input>元素
      var fileInput = document.createElement('input');
      
      // 设置input类型为文件
      fileInput.type = 'file';

      // 设置文件选择对话框只接受CSV格式的文件
      fileInput.accept = '.csv';

      // 设置文件选择对话框可以选择多个文件
      fileInput.multiple = false;

      // 添加change事件监听器，以便在用户选择文件后触发
      fileInput.addEventListener('change', this.handleFileSelection);

      // 模拟点击文件选择对话框
      fileInput.click();
    },

    inputUser(){
      this.isInputRoom = false;
      // 创建一个<input>元素
      var fileInput = document.createElement('input');
      
      // 设置input类型为文件
      fileInput.type = 'file';

      // 设置文件选择对话框只接受CSV格式的文件
      fileInput.accept = '.csv';

      // 设置文件选择对话框可以选择多个文件
      fileInput.multiple = false;

      // 添加change事件监听器，以便在用户选择文件后触发
      fileInput.addEventListener('change', this.handleFileSelection);

      // 模拟点击文件选择对话框
      fileInput.click();
    },

    outputRoom(){
      let url="/users/export"
      this.$axios.get(url, this.config, { responseType: 'blob' })  // 设置 responseType 为 'blob'
        .then((response) => {
          // 创建一个Blob对象，表示二进制数据
          const blob = new Blob([response.data], { type: response.headers['content-type'] });

          // 创建一个a标签，并设置href为Blob URL
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);

          // 设置下载的文件名（你可以根据实际情况调整）
          link.download = 'exportedRoomSelectionData.csv';

          // 将a标签添加到DOM中，模拟点击下载
          document.body.appendChild(link);
          link.click();

          // 移除添加的a标签
          document.body.removeChild(link);
        })
        .catch(error => {
          console.error("导出房间选择情况失败:", error);
        });
    },

    submitForm() {
      // Handle form submission logic here
      let url = "/selection-time"
      const requestBody = {
        type: this.type,
        beginTime1: this.beginTime1,
        endTime1: this.endTime1,
        beginTime2: this.beginTime2,
        endTime2: this.endTime2,
        beginTime3: this.beginTime3,
        endTime3: this.endTime3,
        beginTime4: this.beginTime4,
        endTime4: this.endTime4,
      };
      this.$axios.post(url,requestBody,this.config)
        .then((response) => {
          console.log(response.msg);
          this.$message({
            message: '修改成功!!!',
            type: 'success'
          });
        })
        .catch(error => {
          // 处理请求失败的情况
          this.errorType = "修改房间失败";
          this.showErrorModal = true;
          console.error(error);
        });
      // Add any additional logic based on the selected option and time values
    },
    // openFilePicker() {
    //   // 创建一个<input>元素
    //   var fileInput = document.createElement('input');
      
    //   // 设置input类型为文件
    //   fileInput.type = 'file';

    //   // 设置文件选择对话框只接受CSV格式的文件
    //   fileInput.accept = '.csv';

    //   // 设置文件选择对话框可以选择多个文件
    //   fileInput.multiple = false;

    //   // 添加change事件监听器，以便在用户选择文件后触发
    //   fileInput.addEventListener('change', this.handleFileSelection);

    //   // 模拟点击文件选择对话框
    //   fileInput.click();
    // },

    handleFileSelection(event) {
      // 获取选定的文件
      var selectedFile = event.target.files[0];
      let url="/"
      let formData = new FormData();
      formData.append("file", selectedFile);
      if (this.isInputRoom) {
        // 导入房间
        url = url + "dormitories/import";
        this.$axios.post(url, formData)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error("导入房间失败:", error);
          });
      } else {
        // 导入用户
        url = url + "users/import";
        this.$axios.post(url, formData)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error("导入房间失败:", error);
          });
      }
    },
    closeErrorModal(){
      this.showErrorModal = false;
    },
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
    this.config = {
      headers: {
        'Authorization': localStorage.getItem("jwt"),
      }
    }
    this.studentId = localStorage.getItem("id");
    this.studentName = localStorage.getItem("name");

    // let isStudent1 = localStorage.getItem("isStudent1")







    // this.$axios.get("/users?id=" + localStorage.getItem("userId"), this.config)
    // .then(response => {
    //   this.type = response.data.type;
    // })
    
    let url = "/selection-time";
    // let isS = localStorage.getItem("isStudent1") === '1';
    try {
      setTimeout(() => {
        let isS = localStorage.getItem("isStudent1") === '1';
        if(!isS){
          this.isTeacher = true;
          this.isStudent = false;
        } else {
          this.isTeacher = false;
          this.isStudent = true;
        }
        if (isS) {
          this.$axios.get('/timestage')
              .then(response =>
          {
            let timeRanges
            this.$axios.get(url)
                .then(response => {
                  timeRanges = [
                    {
                      beginTime: new Date(response.data.data.beginTime1),
                      endTime: new Date(response.data.data.endTime1)
                    },
                    {
                      beginTime: new Date(response.data.data.beginTime2),
                      endTime: new Date(response.data.data.endTime2)
                    },
                    {
                      beginTime: new Date(response.data.data.beginTime3),
                      endTime: new Date(response.data.data.endTime3)
                    },
                    {beginTime: new Date(response.data.data.beginTime4), endTime: new Date(response.data.data.endTime4)}
                  ];
                  console.log(response.data.data)
                  if (c == 1) {
                    this.currentPeriod = "看房阶段"
                  } else if (c == 2) {
                    this.currentPeriod = "收藏限定选房阶段"
                  } else if (c == 3) {
                    this.currentPeriod = "选房阶段"
                  } else if (c == 4) {
                    this.currentPeriod = "调换阶段"
                  } else {
                    this.currentPeriod = "当前并未处于任何选房阶段"
                  }
                })
                .catch(e => {
                  console.log(e)
                })
            let c = response.data.data
            alert(JSON.stringify(timeRanges))

          })
              .catch(error => {
                console.error( error);
              });
          // alert("学生")
          // this.$axios.get(url)
          //     .then(response => {
          //           const timeRanges = [
          //             {beginTime: new Date(response.data.data.beginTime1), endTime: new Date(response.data.data.endTime1)},
          //             {beginTime: new Date(response.data.data.beginTime2), endTime: new Date(response.data.data.endTime2)},
          //             {beginTime: new Date(response.data.data.beginTime3), endTime: new Date(response.data.data.endTime3)},
          //             {beginTime: new Date(response.data.data.beginTime4), endTime: new Date(response.data.data.endTime4)}
          //           ];
          //           console.log(timeRanges)
          //           let currentRange = null;
          //           for (const range of timeRanges) {
          //             if (currentTime >= range.beginTime && currentTime < range.endTime) {
          //               currentRange = range;
          //               break;
          //             }
          //           }
          //           console.log('aduihasuiduisa'+currentRange)
          //           if (currentRange == 1) {
          //             this.currentPeriod = "看房阶段"
          //           } else if (currentRange == 2) {
          //             this.currentPeriod = "收藏限定选房阶段"
          //           } else if (currentRange == 3) {
          //             this.currentPeriod = "选房阶段"
          //           } else if (currentRange == 4) {
          //             this.currentPeriod = "调换阶段"
          //           } else {
          //             this.currentPeriod = "当前并未处于任何选房阶段"
          //           }
          //         },
          //     )
        }
      }, 200);
    }
    catch (e) {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }


  },
  created() {
    this.$axios.get('/check')
        .then(response => {
          if (response.data.code !== 200) {
            this.$router.push({path:"/login"})
          }
          console.log('Success fetching data:', response)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          this.$router.push({path:"/login"})
        });
  },

  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
  }
}
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


.main {
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
  background-color: #2b7de9; /* 页脚背景色 */ text-align: center; width: 100%; position: absolute; bottom: 0;
}


.avatar-container img{
  width: 100%; /* 确保图片填满其容器 */
  height: auto; /* 保持图片的纵横比 */
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

.modal-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    max-width: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .button {
    margin-top: 1rem;
    display: inline-block;
    padding: 5px 10px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    border: 2px solid #3498db; /* 边框颜色 */
    color: #3498db; /* 文字颜色 */
    background-color: #fff; /* 背景颜色 */
    border-radius: 5px; /* 圆角 */
    transition: background-color 0.3s, color 0.3s; /* 添加过渡效果 */
  }

  .button:hover {
    background-color: #3498db; /* 鼠标悬停时的背景颜色 */
    color: #fff; /* 鼠标悬停时的文字颜色 */
  }

  .time-picker{
    margin-top: 1rem;
  }

  .time-pickers-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end; /* Align items to the right */
    margin-right: 2rem;
  }
</style>

