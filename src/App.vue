<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <Table></Table>
        </div>
        <div class="col">
          <Table></Table>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button class="btn btn-outline-info m-2">Скопировать</button>
          <button class="btn btn-outline-info m-2">Переместить</button>
          <button class="btn btn-outline-info m-2">Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "./components/Table.vue";

export default {
  name: "App",
  components: {
    Table
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
