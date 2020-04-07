<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html, body {
  height: 100%;
} 
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  height: 100%;
  background: #464c5b;
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}

.ivu-form .ivu-form-item-label {
    font-weight: bold
}
img {
  border: 0;
  outline: none
}
.m-file-list {
    white-space: nowrap;
    overflow-x: auto;
    height:106px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    margin:10px 0;
}
.ivu-modal {
    /* position: absolute; */
    top: 20px;
    /* transform: translateY(-48%); */
}
</style>
