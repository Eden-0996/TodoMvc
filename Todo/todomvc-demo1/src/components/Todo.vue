<template>
  <div id="todo">
    <header class="header">todos</header>

    <section class="content">
      <span class="icon-down el-icon-arrow-down">
        <a-icon
          type="down"
          style="font-size:13px"
          v-show="todoList.length>0"
          @click="selectAllTodos"
        />
      </span>

      <a-input
        id="ainput"
        placeholder="What needs to be done?"
        ref="curInput"
        @keyup.enter="addTodo($event.target)"
      />

      <a-list size="small" bordered :dataSource="todoList" v-show="todoList.length>0">
        <a-list-item style="height:60px;"
          slot="renderItem"
          slot-scope="item,index"
          @mouseover="item.isActive = true"
          @mouseleave="item.isActive=false"
        >
          <div>
            <a-row :gutter="20">
              <a-col class="gutter-row" :span="1">
                <div class="gutter-box">
                  <a-checkbox v-model="item.isChecked"></a-checkbox>
                </div>
              </a-col>


              <a-col style="width:280px;" class="gutter-row" :span="20">
                <div
                  style="width:50px;"
                  class="gutter-box"
                  v-show="!item.isEditing"
                  :class="{deleted:item.isChecked}"
                >
                  <label @dblclick="todoEdit(item)">{{item.value}}</label>
                </div>
                <a-input style="width:100%"
                  class="content_todoList_main main_input"
                  placeholder="Basic usage"
                  v-model="item.value"
                  v-show="item.isEditing"
                  v-todo-focus="item.value"
                  @blur="untodoEdit(item)"
                />
              </a-col>


            </a-row>
          </div>
          <span :class="{show: item.isActive}" class="el-icon-close content_todoList_delete">
            <a-icon type="close" @click="deletetodo(index)" />
          </span>
        </a-list-item>
      </a-list>
    </section>

    <footer class="data" v-show="todoList.length > 0">
      <div class="data_times" v-show="todolength  === 0">
        <span>{{todolength}}</span> item left
        <!-- <left></left> -->
      </div>
      <div class="data_times" v-show="todolength > 0">
        <span>{{todolength}}</span> items left
      </div>

      <div class="data_status">
        <a
          href="#"
          :class="{active:index === dataStatusIndex}"
          v-for="(item,index) in dataStatus"
          @click="switchStatus(index)"
          :key="index"
        >{{item}}</a>
      </div>
      <div class="data_clearTodos" @click="clearTodos" v-show="todolength < todoList.length">
        <a href="#">clear completed</a>
      </div>
      <div class="data_clearTodos" v-show="todolength === todoList.length">
        <a href="#"></a>
      </div>
    </footer>
     {{aa}}
  </div>
 
</template>
<script>
export default {
  name: "Todo",
  data() {
    return {
      todoList: [],
      // dataStatus: ["All", "Active", "Completed"],
      // dataStatusIndex: 0,
      // whichShow: true,
      // defaultShow: true
    };
  },
  //方法
  computed: {
    // aa(){
    //   return this.$store.state.aa
    // },
    todolength() {
      let todoArr = this.todoList;
      let num = 0;
      for (let i = 0; i < todoArr.length; i++) {
        if (todoArr[i].isChecked === false) {
          num++;
        }
      }
      return num;
    }
  },
  methods: {
    todoEdit(obj) {
      obj.isEditing = true;
    },
    //使添加的todo不可编辑
    untodoEdit(obj) {
      obj.isEditing = false;
    },
    // 添加todo
    addTodo(e) {
      const val = event.target.value.trim();
      console.log(val);
      if (val === "") {
        return;
      }
      this.todoList = this.todoList.concat({
        value: val,
        isEditing: false, //是否在编辑状态
        isActive: false, //删除X图标是否激活
        isChecked: false //是否已完成
      });
      this.$refs.curInput.value = ""; //input清除内容
      window.localStorage.setItem("content", JSON.stringify(this.todoList));
    },
    // 删除单条todo
    deletetodo(index) {
      this.todoList.splice(index, 1);
      window.localStorage.setItem("content", JSON.stringify(this.todoList));
    },
    //清空已完成的todo
    clearTodos() {
      this.todoList = this.todoList.filter(todo => todo.isChecked === false);
      window.localStorage.setItem("content", JSON.stringify(this.todoList));
    },
    // 将状态变成已完成
    selectAllTodos() {
      this.todoList.map(
        todo => (todo.isChecked = todo.isChecked ? false : true)
      );
    },
    // switchStatus(index) {
    //   this.dataStatusIndex = index;
    //   if (this.dataStatus[index] === "Active") {
    //     this.defaultShow = false;
    //     this.whichShow = false;
    //   } else if (this.dataStatus[index] === "Completed") {
    //     this.defaultShow = false;
    //     this.whichShow = true;
    //   } else if (this.dataStatus[index] === "All") {
    //     this.defaultShow = true;
    //   }
    // }
  },
  directives: {
    //自定义focus指令
    "todo-focus": function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  },
  // 本地存储数据
  created() {
    let myStorage = window.localStorage.getItem("content");
    this.todoList = JSON.parse(myStorage) || []; //因为todoList初始值是null,使用或运算符，如果为null设为空数组
  }
};
</script>










<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
}

input {
  outline: none;
}

#ainput {
  padding: 0 40px;
}

.header {
  font-size: 100px;
  font-weight: 100;
  color: rgba(175, 47, 47, 0.15);
}

.content {
  width: 28%;
  margin: 0 auto;
  /* box-shadow: 0 3px 3px 2px rgba(0, 0, 0, 0.25); */
  position: relative;
}

.icon-down {
  position: absolute;
  font-size: 24px;
  top: -5px;
  left: 16px;
  cursor: pointer;
  /* border:1px solid red; */
  z-index: 1;
}

.content_todoLists {
  position: relative;
  z-index: 3;
}

.content_todoList {
  display: flex;
  flex-direction: row;
  border-top: 1px solid #ccc;
  font-size: 24px;
  padding: 8px;
  background-color: white;
  align-items: center;
}

.checkBox {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}

.content_todoList_main {

  flex: 1;
  text-align: left;
  margin-left: 16px;
  font-size: 20px;
  padding: 6px 0;
}

.main_input {
  position: relative;
  z-index: 1;
}

.content_todoList_delete {
  position: absolute;
  right: 16px;
  color: rgb(252, 55, 55);
  font-weight: 500;
  display: none;
  cursor: pointer;
}

.show {
  display: block;
}

.deleted {
  text-decoration-line: line-through;
  color: #bbb;
}

.show:hover {
  color: rgb(255, 0, 0);
  font-weight: 700;
}

/* ::-moz-placeholder {
  color: rgb(221, 218, 218);
}

::-webkit-input-placeholder {
  color: rgb(221, 218, 218);
}

:-ms-input-placeholder {
  color: rgb(221, 218, 218);
} */

.data {
  display: flex;
  width: 29%;
  height: 50px;
  /* border:1px solid red; */
  justify-content: space-between;
  margin: 0 auto;
  padding: 12px;
  font-size: 14px;
  font-weight: 300;
  color: rgb(145, 145, 145);
}

a {
  text-decoration: none;
  color: rgb(145, 145, 145);
}

.data_times {
  width: 85px;
}

.data_clearTodos {
  width: 142px;
}

.data_status a {
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 1px 4px;
  margin: 0 2px;
}

.data_status a:hover {
  border-color: #bbb;
}

.data_clearTodos a:hover {
  text-decoration-line: underline;
}

.active {
  box-shadow: 0 0 1px black;
}

.filters {
  display: flex;
  margin: 0 5px;
}

.filters li {
  margin-left: 10px;
}
</style>