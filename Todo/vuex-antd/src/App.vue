<template>
  <div id="app">
      <Header/>
      <MainTodo/>
      <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import MainTodo from './components/MainTodo'
import Footer from './components/Footer'
export default{
  name:'App',
  components:{
    Header,MainTodo,Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
  color: #2c3e50;
}



</style>
