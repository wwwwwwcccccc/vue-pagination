# vue-pagination
Vue pagination component for use with Bootstrap and Laravel pagination.

<p align="center">
  <a href="">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="Software License" />
  </a>

</p>

* [Vue.js](http://vuejs.org/) (tested with 2.2.1).


### Installation
```
npm install --save vue-pagination-simple
```


### Example
```js
<template>
  <div id="app">
    <vue-pagination
      :total="55"
      :page-size="13"
      :current-page="1"
      :show-total="true"
      :show-sizes="true"
      :show-jump="true"
      @current-change="currentChange"
      @size-change="sizeChange">
    </vue-pagination>
  </div>
</template>

<script>
import VuePagination from '../dist/vue-pagination.min.js'

export default {
  name: 'App',
  components: {
    VuePagination
  },
  methods: {
    currentChange (val) {
      console.log(`current page is ${val}`);
      console.log(`当前页 ${val}`);
    },
    sizeChange (val) {
      console.log(`pageSize is ${val}`);
      console.log(`每页的大小 ${val}`);
    }
  }
}
</script>
```


#### Props
| Name          | Type     | Default | optional | Description
| :------------ | :--------| :-------| :--------| :-----------
| total         | Number   | 1       |          | The total number of data (required)
| pageSize      | Number   | 10      |          | The number of bars displayed per page (required)
| currentPage   | Number   | 1       |          | Current page (required)
| showTotal     | Boolean  | false   |          | Displays the attributes of the total number
| showSizes     | Boolean  | false   |          | Displays properties that change the size of each page
| showJump      | Boolean  | false   |          | Displays the properties of the current page jump
| preText       | String   |         |          | The text inside the front page button
| nextText      | Boolean  | false   |          | The text inside the back page button
| step          | Number   | 5       |          | Quick page turning step
| color         | String   | #428bca |          | Theme colors
| size          | String   | small   | small/middle/large    | Component size
| pageSizes     | Array    | [10, 20, 30, 50] |     | The number of optional values per page.


##### Events
| Name                | Callback                      | Description
| :-------------------| :-----------------------------| :----------
| size-change         | Size per page                 | PageSize is triggered when it changes.
| current-change      | The current page currentPage  | The currentPage change will trigger.

##

#### Props
| 名称           | 类型      | 默认值   | 可选值    | 描述
| :------------ | :--------| :-------| :--------| :-----------
| total         | Number   | 1       |          | 数据总数 （必填）
| pageSize      | Number   | 10      |          | 每页显示的数量 （必填）
| currentPage   | Number   | 1       |          | 当前的页数 （必填）
| showTotal     | Boolean  | false   |          | 显示总数的属性
| showSizes     | Boolean  | false   |          | 显示每页大小的属性
| showJump      | Boolean  | false   |          | 显示跳转的属性
| preText       | String   |         |          | 向前翻页按钮内的文本
| nextText      | Boolean  | false   |          | 向后翻页按钮内的文本
| step          | Number   | 5       |          | 快速翻页的步长
| color         | String   | #428bca |          | 主题颜色
| size          | String   | small   | small/middle/large    | 组件的尺寸大小
| pageSizes     | Array    | [10, 20, 30, 50] |     | 每页显示个数选择器的选项设置


##### Events
| Name                | Callback                      | Description
| :-------------------| :-----------------------------| :----------
| size-change         | 每页条数size                   | pageSize 改变时会触发
| current-change      | 当前页currentPage              | currentPage 改变时会触发
