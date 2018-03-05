<template>
  <div style="text-align: center;">
    <pagination
      :total="55"
      :page-size="13"
      :current-page="1"
      :show-total="true"
      :show-sizes="true"
      :show-jump="true"
      size='large'
      @current-change="currentChange"
      @size-change="sizeChange">
    </pagination>
  </div>
</template>
<script>
  export default {
    methods: {
      currentChange: function (cur) {
      },
      sizeChange: function (size) {
      }
    }
  }
</script>
<style>
  html, body{
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>