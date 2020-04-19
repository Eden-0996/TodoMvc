<template>
  <div class="main">
    <div id="checkbox">
      <a-checkbox id="toggle-all" v-model="toggleChecked" v-show="todoListLength>0"></a-checkbox>
    </div>
    <span for="toggle-all"></span>

    <a-list id="tlist" size="small" bordered :dataSource="showtodoList" v-show="todoListLength>0">
      <a-list-item
        id="li"
        style="height:60px"
        :class="{completed: item.flag, editing: item.id === currentId}"
        slot="renderItem"
        slot-scope="item"
        :key="item.id"
      >
        <div class="view">
          <a-checkbox @change="changeState(item.id)" :checked="item.flag" class="toggle"></a-checkbox>
          <label
            style="margin-left:15px;font-size:18px;"
            @dblclick="showEdit(item.id)"
          >{{item.name}}</label>
        </div>
        <input
          class="edit"
          @keyup.enter="editTodo(item.id, $event)"
          :value="item.name"
          v-todo-focus="item.name"
          @blur="hideEdit(item.id)"
        />
        <span class="destroy">
          <a-icon type="close" @click="delTodo(item.id)" />
        </span>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
  name: "MainTodo",
  data() {
    return {
      currentId: -1
    };
  },
  computed: {
    todoListLength() {
      return this.$store.state.todoList.length;
    },

    showtodoList() {
      return this.$store.state.showtodoList;
    },
    toggleChecked: {
      get() {
        return this.$store.getters.isCheckedAll;
      },
      set(value) {
        this.$store.commit("toggleChecked", value);
      }
    }
  },
  methods: {
    delTodo(id) {
      // 删除单条todo
      this.$store.commit("delTodo", id);
    },
    showEdit(id) {
      // show出编辑input框
      // this.$store.commit('showEdit', id)
      // console.log("双击了" + id);
      this.currentId = id;
    },
    editTodo(id, e) {
      // 修改todo内容
      this.$store.commit("editTodo", { id, value: e.target.value });
      this.hideEdit(id);
    },
    changeState(id) {
      // 多选框通过id找每条todo的内容
      this.$store.commit("changeState", id);
    },
    hideEdit(id) {
      // 编辑后回车 修改对应的内容
      this.currentId = -1;
    }
  },
  directives: {
    //自定义focus指令
    "todo-focus": function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
};
</script>

<style>
#tlist {
  width: 30%;
  margin: 0 auto;
}
.edit {
  display: none;
}
.editing .edit {
  display: block;
  width: calc(100% - 43px);
  padding: 12px 16px;
  border-radius: 5px;
  transition: all 0.6s;
}
.editing .edit:hover {
  border: 1px solid #40a9ff;
}
.editing .view {
  display: none;
}
#checkbox .ant-checkbox {
  position: relative;
  top: 200px;
  left: -264px;
  top: -41px;
}
</style>
