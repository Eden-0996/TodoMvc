<template>
  <div class="header">
    <header id="msg">
      <span id="todos">todos</span>
      <div id="ainput">
        <a-input
          style="height:60px"
          id="addtodo"
          @keyup.enter="addTodo"
          v-model="value"
          placeholder="What needs to be done?"
        />
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      value: ""
    };
  },
  methods: {
    addTodo() {
      if (!this.value) return;
      this.$store.commit("addTodo", this.value);
      this.value = "";
    }
  }
};
</script>


<style >
#todos {
  font-size: 100px;
  color: #ead7d7;
}
#ainput {
  width: 30%;
  margin: 0 auto;
}
#addtodo {
  padding: 0 45px;
}
</style>
