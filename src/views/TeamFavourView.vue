<template>
  <div class="about" :key="favorKey">
    <b-card header="已收藏房间">
      <div class="team-info">
        <span>队伍目前收藏数: {{ favorNum }}</span>
        <span> / 6</span>
      </div>
      <b-table
          show-empty
          small
          stacked="md"
          :items="rooms"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filterIncludedFields="filterOn"
          @filtered="onFiltered"
      >
        <template v-slot:cell(actions)="row">
          <div class="chat-box">
            <button v-if="row.item.status === 0" @click="chooseRoom(row.item)"
                    :disabled="selectedRoomId !== -1 || row.item.status === 1 || timeStage === 1 || timeStage === 4">
              选房
            </button>
            <button v-else-if="selectedRoomId === row.item.roomId" disabled>
              已选择
            </button>
            <button v-else disabled>
              已被选走
            </button>
            <button @click="viewRoomDetails(row.item)">
              查看详情
            </button>
            <button v-if="selectedRoomId !== row.item.roomId  || (selectedRoomId === row.item.roomId && flag)"   @click="deleteFavourRoom(row.item)" :disabled="timeStage !== 1">
              解除收藏
            </button>
          </div>
        </template>
      </b-table>
      <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
      ></b-pagination>
    </b-card>
  </div>
</template>

<style>

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

button[disabled] {
  /* 添加或覆盖禁用按钮的样式 */
  opacity: 0.5;
  cursor: not-allowed;
  /* 其他禁用时的样式设置 */
}

.about {
  margin-top: 6rem;
  margin-left: 20rem;
  margin-right: 20rem;
  margin-bottom: 1rem;
}
</style>


<script>


export default {
  data() {
    return {
      rooms: [], // Store room data here
      fields: [
        {key: 'roomId', label: 'Room Id', sortable: false},
        {key: 'name', label: 'Name', class: 'text-center'},
        {key: 'statusStr', label: 'Status', sortable: false},
        {key: 'region', label: 'Region', class: 'text-center'},
        {key: 'building', label: 'Building', class: 'text-center'},
        {key: 'floor', label: 'Floor', class: 'text-center'},
        {key: 'capacity', label: 'Capacity', class: 'text-center'},
        {key: 'favoriteNum', label: 'FavoriteNum', class: 'text-center'},
        {key: 'actions', label: 'Actions'}
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      //pageOptions: [5, 10, 15],
      filter: null,
      filterOn: [],
      teamId: -1,
      selectedRoomId: -1,
      timeStage: 0,
      favorKey: 0,
      flag: false,
      favorNum: 0,
    };
  },
  methods: {
    onFiltered() {
    },
    async fetchFavourRooms() {
      await this.$axios.get(`/teams/${this.teamId}/favorites`)
          .then(async (response) => {
            if (response.data.code !== 200) {
              alert("获取收藏失败: " + response.data.msg)
              console.log(response)
              return -1
            }
            this.rooms = []
            for (let i = 0; i < response.data.data.length; i++) {
              this.rooms.push(response.data.data[i])
              this.rooms[i].statusStr = this.rooms[i].status === 1 ? "已被选择" : "未被选择"
              this.rooms[i].capacity = (this.rooms[i].type - 1) % 4 + 1;

              await this.$axios.get("/rooms/info/" + this.rooms[i].roomId)
                  .then(async (response) => {
                    if (response.data.code !== 200) {
                      alert("获取房间信息失败: " + response.data.msg)
                      console.log(response)
                      return -1
                    }
                    this.rooms[i].region = response.data.data.region
                    this.rooms[i].building = response.data.data.building
                    this.rooms[i].floor = response.data.data.floor
                    await this.$axios.get(`/rooms/favorite/${this.rooms[i].roomId}/size`)
                        .then((response) => {
                          if (response.data.code !== 200) {
                            alert("获取房间收藏失败: " + response.data.msg)
                            console.log(response)
                            return -1
                          }
                          this.rooms[i].favoriteNum = response.data.data


                        })
                        .catch((error) => {
                          alert('获取房间收藏失败: ' + error.message);
                          console.log(error)
                          return -1
                        });

                  })
                  .catch((error) => {
                    alert('获取房间信息失败: ' + error.message);
                    console.log(error)
                    return -1
                  });
            }
            this.totalRows = response.data.data.length
            this.favorNum = response.data.data.length
            console.log(response)

            if (this.currentPage !== 1 && this.currentPage >= Math.ceil(this.totalRows / this.perPage)) {
              this.currentPage = Math.ceil(this.totalRows / this.perPage)
            }
          })
          .catch((error) => {
            alert('获取收藏失败: ' + error.message);
            console.log(error)
            return -1
          })
    },
    async fetchSelectedRooms() {
      await this.$axios.get(`teams/${this.teamId}`)
          .then((response) => {
            if (response.data.code !== 200) {
              alert("获取队伍信息失败: " + response.data.msg)
              console.log(response)
              return -1
            }
            if (response.data.data.roomId === null || response.data.data.roomId === undefined || response.data.data.roomId === 0) {
              return -1
            }
            this.selectedRoomId = response.data.data.roomId
          })
          .catch((error) => {
            alert('获取队伍信息失败: ' + error.message);
            console.log(error)
            return -1
          })
      if (this.selectedRoomId !== -1) {
        //检测这个房间是不是被收藏了 没有的话要加入列表
        this.flag = false
        for (let i = 0; i < this.rooms.length; i++) {
          if (this.rooms[i].roomId === this.selectedRoomId) {
            this.flag = true
            break
          }
        }
        if (!this.flag) {
          await this.$axios.get("/rooms/info/" + this.selectedRoomId)
              .then(async (response) => {
                if (response.data.code !== 200) {
                  alert("获取房间信息失败: " + response.data.msg)
                  console.log(response)
                  return -1
                }
                let room = response.data.data

                room.roomId = this.selectedRoomId
                await this.$axios.get(`/rooms/favorite/${this.selectedRoomId}/size`)
                    .then((response) => {
                      if (response.data.code !== 200) {
                        alert("获取房间收藏失败: " + response.data.msg)
                        console.log(response)
                        return -1
                      }
                      room.favoriteNum = response.data.data
                    })
                    .catch((error) => {
                      alert('获取房间收藏失败: ' + error.message);
                      console.log(error)
                      return -1
                    });

                await this.$axios.get("/rooms/info/" + room.roomId)
                    .then(async (response) => {
                      if (response.data.code !== 200) {
                        alert("获取房间信息失败: " + response.data.msg)
                        console.log(response)
                        return -1
                      }
                      room.region = response.data.data.region
                      room.building = response.data.data.building
                      room.floor = response.data.data.floor
                    })
                    .catch((error) => {
                      alert('获取房间信息失败: ' + error.message);
                      console.log(error)
                      return -1
                    });
                await this.$axios.get("/rooms/" + room.roomId)
                    .then((response) => {
                      if (response.data.code !== 200) {
                        alert("获取房间信息失败: " + response.data.msg)
                        console.log(response)
                        return -1
                      }
                      room.name = response.data.data.name
                      room.type=response.data.data.type
                      room.status = response.data.data.status
                      room.statusStr = room.status === 1 ? "已被选择" : "未被选择"
                      room.capacity = (room.type - 1) % 4 + 1;
                    }).catch((error) => {
                      alert('获取房间信息失败: ' + error.message);
                      console.log(error)
                      return -1
                    });

                this.rooms.push(room)
                this.totalRows = this.rooms.length
                console.log(response)
              })
              .catch((error) => {
                alert('获取房间信息失败: ' + error.message);
                console.log(error)
                return -1
              });
        }
      }
    },

    chooseRoom(room) {
      const roomId = room.roomId
      this.$axios.post(`/teams/select-room`, {teamId: this.teamId.toString(), roomId: room.roomId.toString()})
          .then(async (response) => {
            console.log(response)
            if (response.data.code === 200) {
              alert("选房成功!");
            } else {
              alert("选房失败: " + response.data.msg);
              return -1
            }
            await this.fetchFavourRooms()
            await this.fetchSelectedRooms()
          })
          .catch((error) => {
            alert('选房失败: ' + error.message);
            console.log(error)
            return -1
          })
      return roomId
    },
    viewRoomDetails(room) {
      const roomId = room.roomId
      this.$router.push({path: "/room", query: {roomId}});
    },
    deleteFavourRoom(room) {
      const roomId = room.roomId.toString()
      this.$axios.delete(`/teams/${this.teamId}/favorites`, {data: {roomId}})
          .then(async (response) => {
            console.log(response)
            if (response.data.code === 200) {
              alert("删除成功!");
            } else {
              alert("删除失败: " + response.data.msg);
              return
            }
            await this.fetchFavourRooms()
            await this.fetchSelectedRooms()
          })
          .catch((error) => {
            alert('删除失败: ' + error.message);
            console.log(error)
            return -1
          })
      return roomId
    },
  }
  ,
  async mounted() {
    if (localStorage.getItem('teamId') === 'null') {
      alert("请先加入队伍")
      await this.$router.push('/home')
    }
    this.currentPage = 1
    this.teamId = parseInt(localStorage.getItem('teamId'))

    await this.$axios.get("/timestage")
        .then((response) => {
          if (response.data.code !== 200) {
            alert("获取时间阶段失败: " + response.data.msg)
            console.log(response)
            return -1
          }
          this.timeStage = response.data.data
          if (this.timeStage === 0 || this.timeStage === 5) {
            console.log(this.timeStage)
            alert("当前不在可用时间段")
            this.$router.push('/team')
          }
        })
        .catch((error) => {
          alert('获取时间阶段失败: ' + error.message);
          console.log(error)
          return -1
        });

    await this.fetchFavourRooms(); // Fetch teams when the component is mounted
    await this.fetchSelectedRooms();
    this.favorKey = this.favorKey + 1
    console.log(this.rooms)
  }
  ,
}
;
</script>