<template>
  <div class="container1">
    <div class="basic-info" v-if="student">
      <div class="header">
        <h2>基本信息</h2>
        <p class="description">
          某些信息可能会对使用南方科技大学宿舍选择系统的其他人可见。
        </p>
      </div>
      <div class="content">
        <div class="info-section">
          <div class="info-item">
            <span class="label">Name</span>
            <span class="value">{{ student.name }}</span>
          </div>
          <div class="info-item">
            <span class="label">Gender</span>
            <span class="value">{{ studentGender }}</span>
          </div>
          <div class="info-item">
            <span class="label">Education Level</span>
            <span class="value">{{ studentEducationLevel }}</span>
          </div>
          <div class="info-item">
            <span class="label">Sleep Time</span>
            <span class="value">{{ student.sleepTime | timeFilter }}</span>
          </div>
          <div class="info-item">
            <span class="label">Wake Time</span>
            <span class="value">{{ student.awakeTime | timeFilter }}</span>
          </div>
          <div class="info-item full-width">
            <span class="label">Introduction</span>
            <p class="value about-me">{{ student.intro }}</p>
          </div>
        </div>
        <div class="profile-picture">
          <img :src="imageUrl" alt="Profile Picture" class="profile-img">
        </div>
      </div>
      <el-button type="primary" class="edit-button" @click="edit" v-if="self1 || teacher" >编辑信息</el-button>
      <el-button v-if="!self1" @click="chat">聊天</el-button>
    </div>
    <div v-else>Loading...</div>
    <el-dialog title="" :visible.sync="dialogFormVisible" class="dialog-st" width="31%" v-if="self1">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="起床时间">
          <el-time-picker
              v-model="form.awakeTime"

              >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="睡觉时间">
          <el-time-picker
              v-model="form.sleepTime"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input type="textarea" v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
              class="upload-demo"
              drag
              :action="uploadUrl"
              :http-request="handleUpload"
              multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="" :visible.sync="dialogFormVisible" class="dialog-st" width="30%" v-if="teacher">
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
  </div>
</template>

<script>


import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
export default {
  props: ['id'],
  name: 'UserInfo',
  data() {
    var checkRequired = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('该字段不能为空'));
      } else {
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (this.ruleForm.confirmPassword === '' && value === '') {
        callback();
      } else if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
          if (this.ruleForm.password === '' && value === '') {
            callback();
          } else if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }

        };
    return {
      student: null,
      uploadUrl: '',
      studentEducationLevel: '',
      studentGender: '',
      imageUrl: '',
      editMode: false,
      editableStudent: {},
      dialogFormVisible: false,
      form: {
        name: null,
        type: null,
        account: null,
        awakeTime: null,
        sleepTime: null,
        intro: null,
        imgURL: ''
      },
      studentId: '',
      self1: false,
      teacher: false,
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
  filters: {
    timeFilter(value) {
      // 将从数据库获取的Time对象转换为人类可读的格式
      return value ? value.substring(0, 5) : 'N/A'; // 假设时间格式为 'HH:mm:ss'
    }
  },
  methods: {
    handleUpload(file) {
      this.getOssSignature().then(signatureInfo => {
        console.log('获取签名信息成功', signatureInfo);
        let formData = new FormData();
        // const extension = file.name.split('.').pop();
        const extension = file.file.name.split('.').pop();
        const uniqueFilename = uuidv4() + '.' + extension;
        console.log('uniqueFilename', uniqueFilename);
        if (extension !== 'jpg' && extension !== 'png') {
          this.$message({
            message: '只能上传jpg/png文件',
            type: 'error'
          });
          return;
        }
        formData.append('key', signatureInfo.dir + uniqueFilename);
        formData.append('policy', signatureInfo.policy);
        formData.append('OSSAccessKeyId', signatureInfo.accessid);
        formData.append('signature', signatureInfo.signature);
        formData.append('file', file.file);

        axios.post(signatureInfo.host, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
          console.log('上传成功', response);
          // 处理上传成功的逻辑
          this.imageUrl = signatureInfo.host + '/' + uniqueFilename;
          this.$message({
            message: '上传成功',
            type: 'success'
          });
        }).catch(error => {
          console.error('上传失败', error);
          // 处理上传失败的逻辑
          this.$message({
            message: '上传失败',
            type: 'error'
          });
        });
      }).catch(error => {
        console.error('获取签名信息失败', error);
        // 处理获取签名信息失败的逻辑
        this.$message({
          message: '获取签名信息失败',
          type: 'error'
        });
      });
    },
    getOssSignature() {
      // 实现获取OSS签名信息的逻辑，返回一个Promise
      // 示例中省略了具体实现
      return new Promise((resolve, reject) => {
        // 假设这是您的服务器端API端点，用于获取OSS签名信息

        this.$axios.get('/oss').then(response => {
          if(response.data) {
            resolve(response.data);
          } else {
            reject('No signature data received');
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
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

      let updatePassword = false;
      if (this.ruleForm.password.length > 0 && this.ruleForm.password === this.ruleForm.confirmPassword) {
        updatePassword = true;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.put('/users',
              {
                studentId: this.ruleForm.studentId,
                name: this.ruleForm.name,
                type: this.ruleForm.type,
                account: this.ruleForm.account,
              })
              .then(response => {
                if (response.data.code === 200) {
                  console.log(response.data.data);
                  if (updatePassword) {
                    this.$axios.put('/users/' + this.id + '/password',
                        {
                          password: this.ruleForm.password,
                          oldPassword: ''
                        })
                        .then(response => {
                          if (response.data.code === 200) {
                            this.$message({
                              message: '修改成功',
                              type: 'success'
                            });
                            this.dialogFormVisible = false;
                            this.fetchStudentData();
                          } else {
                            this.$message({
                              message: response.data.msg,
                              type: 'error'
                            });
                            this.dialogFormVisible = false;
                            this.fetchStudentData();
                          }
                        })
                        .catch(error => {
                          console.error('Error updating student data:', error);
                        });
                  }
                  else {
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                    this.dialogFormVisible = false;
                    this.fetchStudentData();
                  }
                } else {
                  this.$message({
                    message: response.data.msg,
                    type: 'error'
                  });
                  this.dialogFormVisible = false;
                  this.fetchStudentData();
                }
              })
              .catch(error => {
                console.error('Error updating student data:', error);
              });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    chat() {
      this.$router.push({path: '/chat', params: {id: this.id}})
    },
    formatTime(time) {
      if (!time) return '';

      let date = new Date(time);
      let hours = String(date.getHours()).padStart(2, '0');
      let minutes = String(date.getMinutes()).padStart(2, '0');
      let seconds = String(date.getSeconds()).padStart(2, '0');
      return hours + ':' + minutes + ':' + seconds;
    },
    submitForm() {
      this.form.awakeTime = this.formatTime(this.form.awakeTime);
      this.form.sleepTime = this.formatTime(this.form.sleepTime);
      // alert(this.form.awakeTime)
      this.$axios.put('/users/' + this.studentId,
          {
            awakeTime: this.form.awakeTime,
            sleepTime: this.form.sleepTime,
            intro: this.form.intro,
            imgURL: this.imageUrl
          })
          .then(response => {
            if (response.data.code === 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.fetchStudentData();
            } else {
              this.$message({
                message: response.data.msg,
                type: 'error'
              });
              this.dialogFormVisible = false;
              this.fetchStudentData();
            }
          })
          .catch(error => {
            console.error('Error updating student data:', error);
          });
    },
    edit() {
      // alert(this.student.awakeTime)

      this.form.awakeTime = new Date('2020-01-01 ' + this.student.awakeTime);
      this.form.sleepTime = new Date('2020-01-01 ' + this.student.sleepTime);
      this.form.intro = this.student.intro;
      this.form.imgURL = this.student.imgUrl;
      this.dialogFormVisible = true;
    },
    fetchStudentData() {
      // 从localstorge中获取学生id
      // let studentId = '';
      // this.$axios.setHeader('Authorization', localStorage.getItem('token'));
      this.$axios.get('/users/getid')
          .then(response => {
            this.studentId = response.data.data;
            // alert(studentId)
            if (this.studentId === this.id) {
              this.self1 = true;
            }
            if (this.studentId.startsWith('1')) {
              this.teacher = true;
            }
            this.$axios.get('/users',
                {
                  params: {
                    id: this.id
                  }
                })

                .then(response => {
                  this.student = response.data.data;
                  // this.student.imgUrl = 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg';
                  this.studentEducationLevel = this.getEducationLevel(this.student.type);
                  this.studentGender = this.genderFilter(this.student.type)
                  this.imageUrl = this.student.imgURL;
                  this.ruleForm.name = this.student.name;
                  this.ruleForm.account = this.student.account;
                  this.ruleForm.gender = this.student.type % 2;
                  this.ruleForm.educationLevel = this.student.type < 3 ? 0 : 1;
                  this.ruleForm.password = '';
                  this.ruleForm.confirmPassword = '';
                  this.ruleForm.studentId = this.id;
                })
                .catch(error => {
                  console.error('Error fetching student data:', error);
                });
          })
          .catch(error => {
            console.error('Error fetching student id:', error);
          });

    },
    getEducationLevel(type) {
      // 将学生类型编号转换为实际的教育水平
      const levels = {
        1: 'MASTER',
        2: 'MASTER',
        3: 'PhD',
        4: 'PhD',
        // ... 其他类型
      };
      return levels[type] || 'Unknown';
    },
    genderFilter(value) {
      // 实现一个过滤器，用于转换性别的表示方式
      const genderMap = {
        1: 'Male',
        2: 'Female',
        3: 'Male',
        4: 'Female',
      };
      return genderMap[value] || 'Rather not say';
    },

  },
  mounted() {
    this.fetchStudentData();
  }
};
</script>

<style scoped>
.container1 {
  max-width: 900px;
  margin: 60px auto auto;
//margin: auto; //height: calc(100vh - 60px); //overflow: hidden;

}




.basic-info {
  position: relative;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-top: 15%;
}

.header h2 {
  margin: 0;
  font-size: 20px;
  color: #202124;
}

.header .description {
  font-size: 14px;
  color: #5f6368;
}

.description a {
  color: #1a0dab;
  text-decoration: none;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.info-section {
  flex: 1;
  border-right: 1px solid #e0e0e0;
  padding-right: 20px;
}

.profile-picture {
  margin-top: 50px;
  padding-left: 20px;
  width: 200px;
}

.profile-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.info-item.full-width {
  align-items: flex-start;
}

.info-item.full-width .value {
  margin-top: 4px;
}

.info-item .about-me {
  color: #5f6368;
  margin: 0;
}

.label {
  font-size: 16px;
  color: #202124;
}

.value {
  font-size: 16px;
  color: #5f6368;
}


/* Add any additional styling or responsive design features as needed */
</style>
