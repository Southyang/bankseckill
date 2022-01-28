<template>
  <div>
    {{$store.state.title}}
    <button @click="getStudents">获取学生信息</button>
    <button @click="getSchool">获取学校信息</button>
    <button @click="getCars">获取汽车信息</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  methods: {
    getStudents () {
      axios.get('http://localhost:8080/user/students').then(
        response => {
          console.log('请求成功了', response.data)
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    getSchool () {
      axios.get('http://localhost:8080/user/school').then(
        response => {
          console.log('请求成功了', response.data)
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    },
    getCars () {
      axios.get('http://localhost:8080/manager/cars').then(
        response => {
          console.log('请求成功了', response.data)
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
