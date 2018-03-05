<template>
  <div id="app">
    <div style="text-align: center;">
	    <pagination
	      :total="55"
	      :page-size="13"
	      :current-page="1"
	      :show-total="true"
	      :show-sizes="true"
	      :show-jump="true"
	      @current-change="currentChange"
	      @size-change="sizeChange">
	    </pagination>
	  </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    currentChange: function (cur) {
    },
    sizeChange: function (size) {
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    margin-top: 60px;
}
</style>
