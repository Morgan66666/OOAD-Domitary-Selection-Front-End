<template>
  <div >

    <div style="width: 100%;margin-top: 80px;z-index: 9900; display: flex; justify-content: center;"><h1>学生查询</h1></div>
      
    <div class="container">
      <div action="" class="parent" >
        <label for="checkbox" style="position: absolute; left: -20%;">高级</label>
        <input id="radio" type="checkbox" style="position: absolute; left: -10%; width: 10%;"
          @click="heightSelect = !heightSelect">
        <input type="text"  @keyup.enter="search" v-model="query" class="search" placeholder="搜索">
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
    <div v-if="resultsShow.length == 0" style="height: 300px;  display: flex; justify-content: center; align-items: center;">
      <h4 style="opacity: 0.5;">无可展示内容</h4>
    </div>



    <div class="results">
      <div v-for="(result, index) in resultsShow" :key="index" class="result-card" @click="showStudentMessage(index)">
        <div class="profile-picture">
          <img :src="result.imgURL" alt="Profile Picture" class="profile-img">
        </div>

        <h4 style="margin: 20px;">{{ result.name }}</h4>
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

    <div v-if="showStudentVis" class="modal" @click.self="showStudentVis = false">
      <div class="modal-content">
        <div class="profile-picture">
          <img :src="showStudent.imgURL" alt="Profile Picture" class="profile-img">
        </div>
        <h4 class="info-line2">{{ showStudent.name }}</h4>
        <p class="info-line2" style="display: flex; align-items: center; justify-content: space-between;">
        类型： {{  showStudent.type }}</p>
        <div class="info-line2" style="display: flex; align-items: center; justify-content: space-between;">
          <p>
            休息时间：{{ showStudent.sleepTime }} - {{ showStudent.awakeTime }}
          </p>
        </div>
        <div class="introduce" style="display: flex; justify-self: start;margin-bottom: 0.5rem;
        margin-right: 2rem;
        margin-left: 2rem;
        margin-top: 10px;">
          个人介绍：{{ showStudent.intro }}
        </div>
        <div style="display: flex;">
          <button class="submit-button" @click="gotoHomepage">进入主页</button>
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
      showStudentVis: false,
      heightSelect: false,
      showStudent: { name: "默认", type: "默认", awakeTime: "默认", sleepTime: "默认", intro: "默认" },
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
      let url = "/users/finduser/" + sleepTime + "/" + awakeTime + "/" + query
      console.log(url)
      let config = {
        headers: {
          'Authorization': localStorage.getItem("jwt"),
        }
      };
      console.log(config)
      this.$axios.get(url, config).then((response) => {
        if (response.data.code == 200) {
          for (let i in response.data.data) {
            let data = response.data.data[i]
            console.log(data)
            let temp = {
              name: data.name,
              type: data.leader,
              intro: data.intro,
              awakeTime: data.awakeTime,
              sleepTime: data.sleepTime,
              imgURL: data.imgURL,
              id: data.studentId
            }
            if (temp.type == 1 || temp.type == 2) {
              temp.type = "硕士生"
            } else {
              temp.type = "博士生"
            }
            if (temp.type == 1||temp.type == 3) {
              temp.gender = "男"
            } else {
              temp.gender = "女"
            }
            this.results.push(temp)
          }
          this.pageTurning(1)

        }
      }).catch((error) => {
        console.log(error)
      })
    },
    toggleDetails(index) {
      this.students[index].showDetails = !this.students[index].showDetails;

    },


    showStudentMessage(index) {
      this.groupIndex = index + 1
      this.showStudentVis = true
      this.showStudent.name = this.resultsShow[index].name
      this.showStudent.type = this.resultsShow[index].type
      this.showStudent.intro = this.resultsShow[index].intro
      this.showStudent.awakeTime = this.resultsShow[index].awakeTime
      this.showStudent.sleepTime = this.resultsShow[index].sleepTime
      this.showStudent.imgURL = this.resultsShow[index].imgURL
      this.showStudent.id = this.resultsShow[index].id

    },
    gotoHomepage() {
      this.$router.push({ path: '/user/'+this.showStudent.id})
    },
    pageTurning(key) {
      this.pageTotal = Math.ceil(this.results.length / this.pageSize)

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
    }

  },
  created() {
    // alert(global.isStudent)
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
  width: 60px;
  height: 20px;
  border: black solid 1px;
  border-radius: 0.25rem;
  background-color: #d9e6e6;
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
  /* 缩小字体大小 */
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
}

.profile-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}


</style>
