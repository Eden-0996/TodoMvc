import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  // flag 是否完成任务
  state: {
    todoList: [
      { id: 1, name: '睡觉', flag: true },
      { id: 2, name: '吃饭', flag: false },
    ],
    showtodoList: []
  },
  getters:{
    unfinishCount (state) {
      return state.todoList.filter(item => !item.flag).length
    },
    //todoList数据长度
    ShowFooter (state) {
      return state.todoList.length
    },
    // 每个todo是否满足条件 返回true  false
    // 检测已经完成的todo
    ShowClearComplated (state) {
      return state.todoList.some(item => item.flag)
    },
    // 所有todo
    isCheckedAll (state) {
      return state.todoList.every(item => item.flag)
    }
    
  },
  mutations: {
    // 添加todo
    addTodo(state,name){
      state.todoList.unshift({
        id:+new Date(),
        name,
        flag:false
      })
    },
    // 删除todo
    delTodo (state, id) {
      state.todoList = state.todoList.filter(item => item.id !== id)
      state.showtodoList = state.todoList
    },
    // 编辑
    editTodo (state, { id, value }) {
      state.todoList.find(item => item.id === id).name = value
    },
    changeState (state, id) {
      const todo = state.todoList.find(item => item.id === id)
      todo.flag = !todo.flag
    },
    change (state, type) {
      state.showList = []
      switch (type) {
        case 'all':
          state.showtodoList = state.todoList
          break
        case 'active':
          state.showtodoList = state.todoList.filter(item => !item.flag)
          break
        case 'completed':
          state.showtodoList = state.todoList.filter(item => item.flag)
          break
        default:
          break
      }
    },
    clearComplated (state) {
      state.todoList = state.todoList.filter(item => !item.flag)
      state.showtodoList = state.todoList
    },
    toggleChecked (state, value) {
      state.todoList.forEach(item => {
        item.flag = value
      })
    }

  },
  actions: {
   
  },
  modules: {
  }
})
