<template>
  <div class="footer" v-show="ShowFooter">

    <a-row :gutter="20">
      <a-col class="gutter-row" :span="7">
        <div class="gutter-box">
          <span class="todo-lenght">
            <strong>{{unfinishCount}}</strong> item left
          </span>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="10">
        <div class="gutter-box">
          <ul class="filters">
            <li>
              <a-button :class="{selected: type === 'all'}" href="#/" @click="change('all')">All</a-button>
            </li>
            <li>
              <a-button
                :class="{selected: type === 'active'}"
                href="#/active"
                @click="change('active')"
              >Active</a-button>
            </li>
            <li>
              <a-button href="#/completed" @click="change('completed')">Completed</a-button>
            </li>
          </ul>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="7">
        <div class="gutter-box">
          <a-button
            type="link"
            id="toComp"
            class="clear-completed"
            v-show="ShowClearComplated"
            @click="clearComplated"
            block
          >Clear completed</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Footer",
  data() {
    return {
      type: "all"
    };
  },
  computed: {
    // isShowFooter判断todoList里面长度
    ...mapGetters(["unfinishCount", "ShowFooter", "ShowClearComplated"])
  },
  methods: {
    change(type) {
      this.type = type;
      this.$store.commit("change", this.type);
    },
    clearComplated() {
      this.$store.commit("clearComplated");
    }
  },
  created() {
    this.$store.commit("change", this.type);
  }
};
</script>

<style>
.footer {
  display: flex;
  width: 30%;
  margin: 5px auto;
  font-size: 16px;
}
.filters {
  display: flex;
}
.gutter-example >>> .ant-row > div {
  background: transparent;
  border: 0;
}
.gutter-box {
  /* background: #00a0e9; */
  padding: 5px 20px;
}
</style>
