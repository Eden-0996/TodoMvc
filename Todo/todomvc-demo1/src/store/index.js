import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoList:[],
    aa:'123',
    bb:'456'
    
  },
  mutations: {
      // setTodoList(state,todoList){
      //   state.todoList = state.todoList.concat({
      //     value: val,
      //     isEditing: false, //是否在编辑状态
      //     isActive: false, //删除X图标是否激活
      //     isChecked: false //是否已完成
      //   });


      //   state.todoList = todoList;
      // }
  },
  actions: {
    // loadTodoList({commit},todoList){
    //   console.log(todoList);
    //   commit('setTodoList',todoList)
    // } 
  },
  modules: {
  }
})
