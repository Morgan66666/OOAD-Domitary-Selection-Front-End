<template>
  <div>
    <div style="width: 100%;margin-top: 80px;z-index: 9900; display: flex; justify-content: center;">
      <h1>队伍查询</h1>
    </div>

    <div class="container">
      <div action="" class="parent">
        <label for="checkbox" style="position: absolute; left: -20%;">高级</label>
        <input id="radio" type="checkbox" style="position: absolute; left: -10%; width: 10%;"
          @click="heightSelect = !heightSelect">
        <input type="text" @keyup.enter="search" v-model="query" class="search" placeholder="搜索">
        <input type="button" class="btn" @click="search()">
      </div>
    </div>
    <div v-if="heightSelect"
      style="width: 100%; height: 30px; background-color: white; display: flex; justify-content: center; align-items: center; ">
      <p>起床时间</p>
      <input type="time" v-model="awakeTime" style="width: 7%;margin: 10px;">
      <p>睡觉时间</p>
      <input type="time" v-model="sleepTime" style="width: 7%;margin: 10px;">
    </div>



    <div class="results">
      <div v-for="(result, index) in resultsShow" :key="index" class="result-card" @click="showGroupMessage(index)">
        <h4>{{ result.teamName }}</h4>
        <p>队长：{{ result.leader }}</p>
        <div class="introduce">
          {{ result.intro }}
        </div>
      </div>
      <div v-if="resultsShow.length == 0" style="height: 300px; display: flex; justify-content: center; align-items: center;">
      <h4 style="opacity: 0.5;">无可展示内容</h4>
    </div>


      <div v-if="pageTotal > 1" class="center">
        <ul class="pagination">
          <li><a @click="pageTurning(page - 1)">&laquo;</a></li>
          <li v-for="index in pages" :key="index"><a :class="{ active: page == index }" @click="pageTurning(index)">{{
            index
          }}</a></li>
          <li><a @click="pageTurning(page + 1)">&raquo;</a></li>
        </ul>
      </div>
    </div>

    <div v-if="showGroupVis" class="modal" @click.self="showGroupVis = false">
      <div class="modal-content">
        <h4 class="info-line2">{{ showGroup.teamName }}</h4>
        <p class="info-line2" style="display: flex; align-items: center; justify-content: space-between;">队长：{{
          showGroup.leader }}</p>
        <div class="info-line2" style="display: flex; align-items: center; justify-content: space-between;">


          <p>
            成员：
            <template v-for="(student) in students">
              {{ student.name }}
            </template>
          </p>

          <button class="members-button" @click="showModalFuc()">详情</button>
        </div>
        <div class="introduce" style="display: flex; justify-self: start;margin-bottom: 0.5rem;
        margin-right: 2rem;
        margin-left: 2rem;
        margin-top: 10px;">
          队伍介绍：{{ showGroup.intro }}
        </div>
        <div style="display: flex;">
          <button class="submit-button" @click="gotoHomepage()" >进入主页</button>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal" @click.self="showModal = false">
      <div class="modal-content">
        <div v-for="(student, index) in students" :key="index" @click="toggleDetails(index)" class="student-info">
          <div class="info-line">
            <span>{{ student.name }}</span>
            <span>{{ student.gender }}</span>
            <span>{{ student.type }}</span>
          </div>
          <div v-if="student.showDetails">
            <div class="info-line">
              <p>睡觉时间：{{ student.sleepTime }}</p>
              <p>起床时间：{{ student.awakeTime }}</p>
            </div>
            <div class="info-line">
              <span>个人介绍：{{ student.intro }}</span>
            </div>
            <div style="display: flex; justify-content: center;">
              <button class="enterHomePage-button" @click="sendApply(student.studentId)">进入主页</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      awakeTime: '00:00',
      sleepTime: '00:00',
      hobby: '',
      pages: [],
      page: 1,
      pageSize: 8,
      pageTotal: 1,
      groupIndex: 1,
      results: [],
      resultsShow: [],
      showModal: false,
      showGroupVis: false,
      heightSelect: false,
      showGroup: { teamName: "默认", leader: "默认", intro: "默认",leaderId:0 },
      students: [],
    };
  },
  methods: {
    search() {
      this.results = []
      this.resultsShow = []
      let sleepTime = this.sleepTime + ':00'
      let awakeTime = this.awakeTime + ':00'
      if (!this.heightSelect) {
        sleepTime = "00:00:00"
        awakeTime = "00:00:00"
      }
      let query = this.query
      if (query == "")
        query = "%20"
      let url = "/teams/teams/findteam/" + sleepTime + "/" + awakeTime + "/" + query
      console.log(url)
      let config = {
        headers: {
          'Authorization': localStorage.getItem("jwt"),
        }
      };
      console.log(config)
      this.$axios.get(url, config).then((response) => {
        if (response.data.code == 200) {
          console.log(response.data.data)
          let leader;
          for (let i in response.data.data) {
            let data = response.data.data[i]
            this.$axios.get("users?id=" + data.leader, config).then(
              (response1) => {
                let temp = response1.data.data

                leader = temp.name
                console.log(leader)
                temp = { groupId: data.groupId, leader: leader, leaderId: data.leader, teamName: data.name, intro: data.intro }
                this.results.push(temp)

                this.updateShowResult(this.page)
                this.pageTotal = Math.ceil(this.results.length / this.pageSize)
                this.pages = []
                if (this.pageTotal < 1) {
                  this.pages = []
                } else {
                  for (let i = 1; i <= this.pageTotal + 1; i++) {
                    this.pages.push(i)
                    if (i == this.pageSize) break
                  }

                }
              }).catch((error) => {
                console.log(error)
              })
            console.log("获取到的results" + this.results + "for循环结束")
          }

        }
      }).catch((error) => {
        console.log(error)
      })
    },
    toggleDetails(index) {
      this.students[index].showDetails = !this.students[index].showDetails;

    },

    showModalFuc() {
      this.showModal = true;

    },

    showGroupMessage(index) {
      this.groupIndex = index + 1
      this.showGroupVis = true
      this.showGroup.teamName = this.resultsShow[index].teamName
      this.showGroup.leader = this.resultsShow[index].leader
      this.showGroup.intro = this.resultsShow[index].intro
      this.showGroup.leaderId = this.resultsShow[index].leaderId
      this.showGroup.groupId = this.resultsShow[index].groupId
      console.log(index)

      index = this.groupIndex - 1
      console.log(index)
      //todo 从后端获取数据，填充到students中
      let groupId = this.resultsShow[index].groupId
      let config = {
        headers: {
          'Authorization': localStorage.getItem("jwt"),
        }
      }
      this.$axios.get("/teams/" + groupId + "/members", config).then(
        (response) => {
          let data = response.data.data
          console.log(data)
          this.students = []
          for (let i in data) {
            let temp = data[i]
            let type = temp.type
            if (type == 1 || type == 2) {
              temp.type = "硕士生"
            } else {
              temp.type = "博士生"
            }
            if (type == 1||type == 3) {
              temp.gender = "男"
            } else {
              temp.gender = "女"
            }
            temp.showDetails = false
            this.students.push(data[i])
          }
        }
      ).catch((error) => {
        console.log(error)
      })
    },
    gotoHomepage() {
      this.$router.push('/team?teamId=' + this.showGroup.groupId)
    },
    pageTurning(key) {
      console.log("选择页码" + key)
      console.log("总页数" + this.pageTotal)
      if (key < 1 || key > this.pageTotal)
        return
      let left = key
      let right = key
      this.pages = [key]
      while (this.pages.length < this.pageSize) {

        if (left > 1) {
          this.pages.unshift(left - 1)
          left--
        }
        if (right < this.pageTotal) {
          this.pages.push(right + 1)
          right++
        }
        if (left == 1 && right == this.pageTotal) {
          break
        }
      }
      this.page = key
      this.updateShowResult(key)
    },

    updateShowResult(page) {
      let temp = page * this.pageSize - this.pageSize;
      this.resultsShow = []
      while (this.resultsShow.length < this.pageSize) {
        if (this.results[temp] == null) break
        this.resultsShow.push(this.results[temp])
        temp++
      }
    },
    sendApply(index) {

      this.$router.push({ path: '/user/'+ index})
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
  }
};
</script>

<style scoped>
form {
  margin-bottom: 1rem;
}

.results {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 15%;
  margin-right: 15%;
}

.result-card {
  width: 200px;
  height: 200px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  /* 添加阴影过渡效果 */
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.1);
  /* 添加阴影效果 */
}

.result-card:hover {
  background-color: #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  /* 鼠标移入时的阴影效果 */
}

.result-card p {
  display: block;
  width: 100%;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 10px;
}



.introduce {
  width: 85%;
  height: 45%;
  overflow: hidden;
  margin-top: 10px;
  word-wrap: break-word;
}

input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin: 1rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #000;
  color: #fff;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
}

* {
  margin: 0;
  padding: 0;
}

.container {
  height: 70px;
  width: 100%;
  margin: 40px auto 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.parent {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
}


.search {
  width: 100%;
  height: 40px;
  border-radius: 18px;
  outline: none;
  border: 1px solid #ccc;
  padding-left: 20px;
  position: absolute;
}

.btn {
  height: 35px;
  width: 35px;
  position: absolute;
  background: url("../assets/搜索.svg") no-repeat;
  background-size: 80%;
  top: -24px;
  left: 265px;
  cursor: pointer;
  outline: none;
  border: none;
  z-index: 50;
}

.modal {
  display: block;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 35%;
}



.student-info {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 1rem;
  margin: 1rem 0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.student-info:hover {
  background-color: #e9ecef;
}

.info-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  margin-right: 2rem;
  margin-left: 2rem;
  margin-top: 10px;
}

.info-line span {
  color: #6c757d;
}

.members-button {
  width: 6rem;
  height: 2rem;
  border: black solid 1px;
  border-radius: 0.25rem;
  background-color: #000000;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.members-button:hover {
  width: 6rem;
  height: 2rem;
  border: black solid 1px;
  border-radius: 0.25rem;
  background-color: #ffffff;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.enterHomePage-button {
  width: 6rem;
  height: 2rem;
  border: black solid 1px;
  border-radius: 0.25rem;
  background-color: #000000;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.enterHomePage-button:hover {
  width: 6rem;
  height: 2rem;
  border: black solid 1px;
  border-radius: 0.25rem;
  background-color: white;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-line2 {
  margin-bottom: 0.5rem;
  margin-right: 2rem;
  margin-left: 2rem;
  margin-top: 10px;
}


ul.pagination {
  display: inline-block;
  padding: 0;
  margin: 0;
}

ul.pagination li {
  display: inline;
}

ul.pagination li a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  font-size: 18px;
}

ul.pagination li a.active {
  background-color: rgba(34,167,242);
  color: white;
  border-radius: 5px;
}


ul.pagination li a:hover:not(.active) {
  background-color: #ddd;
  border-radius: 5px;
}

ul.pagination li:first-child a {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

ul.pagination li:last-child a {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

ul.pagination li a {
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 0 4px;
  transition: background-color .3s;
}

div.center {
  text-align: center;
  width: 100%;
}</style>
