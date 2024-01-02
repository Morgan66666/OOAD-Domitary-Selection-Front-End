<template>
  <div>
    <div style="width: 100%;margin-top: 80px;z-index: 9900; display: flex; justify-content: center;"><h1>宿舍查询</h1></div>
      
    <div class="select-boxes">
      <select v-model="selectedRegion" @change="handleChange('region', $event)">
        <option disabled value="">请选择区域</option>
        <option v-for="region in regions" :key="region.regionId" :value="region">{{ region.name }}</option>
      </select>

      <select v-model="selectedBuilding" @change="handleChange('building', $event)">
        <option disabled value="">请选择建筑</option>
        <option v-for="building in buildings" :key="building.buildingId" :value="building">{{ building.name }}</option>
      </select>

      <select v-model="selectedFloor" @change="handleChange('floor', $event)">
        <option disabled value="">请选择楼层</option>
        <option v-for="floor in floors" :key="floor.floorId" :value="floor">{{ floor.name }}</option>
      </select>

      <select v-model="selectedCapacity" @change="handleChange('capacity', $event)">
        <option disabled value="">请选择容量</option>
        <option v-for="capacity in capacities" :key="capacity" :value="capacity">
          {{ capacity }}
          <p v-if = "capacity != '-'">人间</p></option>
      </select>

    </div>



    <div class="results">
      <div v-for="(result, index) in resultsShow" :key="index"  class="result-card" @click="gotoHomepage(index)">
        <div>
            <h4>{{ result.region }} 
                <h6 v-if="result.chose != null&&result.chose.memberList.length == result.capacity" style="color: red;">(已选)</h6>
                <h6 v-else-if="result.chose != null&&result.chose.memberList.length >= 1" style="color: orange;">(未满{{ result.chose.memberList.length }}/{{ result.capacity }})</h6></h4>
        </div>
        
        <p>{{ result.building }}</p>
        <div class="introduce">
          {{ result.floor }} {{ result.room }}
        </div>
        <div>
          {{ result.capacity }}人间 {{ result.starNum }}星
        </div>
      </div>
      <div v-if="resultsShow.length == 0" style="height: 300px; width: 100%; display: flex; justify-content: center; align-items: center;">
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
  </div>
</template>

<script>
export default {
  mounted() {
    this.config = {
        headers: {
          'Authorization': localStorage.getItem("jwt"),
        }
      }
    let url = "/regions"
        this.$axios.get(url,this.config).then((response) => {
          this.regions = response.data.data
          console.log(this.regions)
        }).catch((error) => {
          console.log(error)
        })
  },
  data() {
    return {
      config: null,
      selectedRegion: '',
      selectedBuilding: '',
      selectedFloor: '',
      selectedRoom: '',
      selectedCapacity: '',
      regions: [],
      buildings: [],
      floors: [],
      rooms: [],
      capacities: ['-',2,3,4],
      pages: [],
      page: 0,
      pageSize: 8,
      pageTotal: 0,
      groupIndex: 1,
      results: [],
      resultsAll: [],
      resultsShow: [],
      showModal: false,
      showRoomMes: false,
      heightSelect: true,
    };
  },
  methods: {

    handleChange(type, event) {
      console.log(`你选择了${type}: ${event.target.value}`);
      if (type == 'region') {
        let url = "/regions/"+this.selectedRegion.regionId+"/dormitories"
        this.$axios.get(url,this.config).then((response) => {
          this.buildings = response.data.data
        }).catch((error) => {
          console.log(error)
        })
      }
      if (type == 'building') {
        console.log(this.selectedBuilding)
        let url = "/dormitories/"+this.selectedBuilding.buildingId+"/floors"
        this.$axios.get(url,this.config).then((response) => {
          this.floors = response.data.data
        }).catch((error) => {
          console.log(error)
        })
      }
      if (type == 'floor') {
        let url = "/floors/"+this.selectedFloor.floorId+"/rooms"
        this.$axios.get(url,this.config).then((response) => {

          let data = response.data.data[0]
          let data2 = response.data.data[1]
          console.log("返回的是")
          console.log(response.data.data[1])
          
          this.results = []
          this.resultsAll = []
          for (let i = 0; i < data.length; i++) {
            let temp = {region: this.selectedRegion.name, building: this.selectedBuilding.name, floor: this.selectedFloor.name,
              capacity: (data[i].type - 1)%4 + 1,
              starNum: data2[data[i].roomId].starList.length,
              chose: data2[data[i].roomId].chose[0],
              room: data[i].name}
            this.resultsAll.push(temp)
          }
          if(this.selectedCapacity != '-'&&this.selectedCapacity != ''){
            this.results = this.resultsAll.filter((item) => {
              return item.capacity == this.selectedCapacity
            })
          }else{
            this.results = this.resultsAll
          }
          console.log(this.results)
          console.log(this.resultsAll)
          this.pageTotal = Math.ceil(this.results.length / this.pageSize)
          this.updateShowResult(1)
          this.pageTurning(1)
        }).catch((error) => {
          console.log(error)
        })
      }
      if (type == 'capacity') {
        if(this.selectedCapacity != '-'||this.selectedCapacity != ''){
          this.results = this.resultsAll.filter((item) => {
            return item.capacity == this.selectedCapacity
          })
        }else{
          this.results = this.resultsAll
        }
        this.pageTotal = Math.ceil(this.results.length / this.pageSize)
        this.updateShowResult(1)
        this.pageTurning(1)
      }
    },
    gotoHomepage() {
      //todo 转移到主页
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
        console.log(this.results[temp])
        temp++
      }
    }

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
  overflow: hidden;
  word-wrap: break-word;
}

.submit-button:hover {
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
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

.select-boxes {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
}

.select-boxes select {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.select-boxes select:hover {
  border-color: #888;
}
</style>
