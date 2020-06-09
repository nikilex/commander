<template>
  <div id="app">
    <div class="container-fluid">
        <div class="row">
            <div class="col">
              <div class="form-group">
                <select class="form-control" v-model="parrentDirRight">
                  <option value="./" checked>Корневая папка</option>
                </select>
              </div>
            </div>
            <div class="col">{{fullPath}}</div>
          </div>
          <div class="row">
            <div class="col">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th></th>
                    <th>Имя файла</th>
                    <th>Размер файла</th>
                    <th>Дата создания</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-show="post.path != './'" @dblclick="backFolder" class="pointer">
                    <td ></td>
                    <td >..</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr v-for="items in params.data" :key="items.file" @dblclick="addDir(items.file, items.isFile)" class="pointer">
                    <td :class="{ folder: !items.isFile }" :type="items.file"> </td>
                    <td >{{items.file}}</td>
                    <td v-if="items.isFile">{{formatSize(items.size)}}</td>
                    <td v-else>[Папка]</td>
                    <td >{{items.birthtime | moment("MM-DD-YYYY")}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
</template>

<script>

const axios = require("axios");

export default {
  name: "Table",
  mounted() {
    this.getFolders();
  },
  data() {
    return {
      post: {
        path: "./"
      },
      parrentDirRight: './',
      fullPath: "",
      folders: [],
      params: {
        data: [],
      }
    };
  },
  methods: {
    next() {
      this.post.path = "./folder/";
      this.getFolders();
    },
    formatSize(length){
        var i = 0, type = ['б','Кб','Мб','Гб','Тб','Пб'];
        while((length / 1000 | 0) && i < type.length - 1) {
            length /= 1024;
            i++;
        }
        return length.toFixed(2) + ' ' + type[i];
    },
    sortByName(field) {
        return (a, b) => a[field].toLowerCase() > b[field].toLowerCase() ? 1 : -1 ;
    },
    getFolders() {
      axios
        .post("http://localhost:3000/dir", {
          body: this.post
        })
        .then(response => {

          var sortedArray = [];
          var obj = response.data.tableData;
          var files = this.objFilter(obj, true).sort(this.sortByName('file'));
          var folders = this.objFilter(obj, false).sort(this.sortByName('file'));
          sortedArray = folders.concat(files);

          this.params.data = sortedArray;
          this.fullPath = response.data.fullPath;
        });
    },
    objFilter(obj, bool) {
         var arr = [];
             Object.keys(obj)
                .forEach( (key) => {
                if (obj[key].isFile == bool) {
                   arr.push(obj[key]);
                }
            });
            return arr;
        },
    addDir(newPath, isFile) {
      if (!isFile){
        this.post.path += newPath + "/";
        this.getFolders();
      }
    },
    backFolder() {
      if (this.post.path != "./") {
        var newPath = this.post.path.split("/");
        newPath.pop();
        newPath.pop();
        newPath = newPath.join("/") + "/";
        this.post.path = newPath;
        this.getFolders();
      }
    }
  }
};
</script>

<style>

td[type$='.pdf']:before, td[type$='.PDF']:before {
    font: 400 20px/1 FontAwesome;
    display: inline-block;
    content: "\f1c1";
    margin-right: 7px;
}
td[type$='.js']:before, td[type$='.JS']:before {
    font: 400 20px/1 FontAwesome;
    display: inline-block;
    content: "\f1c9";
    margin-right: 7px;
}

.folder:before {
    font: 400 20px/1 FontAwesome;
    display: inline-block;
    content: "\f114";
    margin-right: 7px;
}

.pointer{
  cursor: pointer;
}
</style>
