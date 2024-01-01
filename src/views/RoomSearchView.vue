<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label for="name">姓名:</label>
      <input id="name" v-model="form.name" type="text">

      <label for="age">年龄:</label>
      <input id="age" v-model.number="form.age" type="number">

      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        age: null
      }
    };
  },
  methods: {
    onSubmit() {
      console.log('表单提交', this.form);
      // 这里可以添加发送数据到服务器的代码
    }
  }
};
</script>
