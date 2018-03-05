<template>
  <div class="simple-pagination">
    <!-- total -->
    <div class="page-total" :style="{'font-size': fontSize, 'height': height + 'px', 'line-height': height + 'px'}" v-if="showTotal">
      共 {{total}} 条
    </div>

    <!-- page-sizes -->
    <div class="page-size" :style="{'height': height + 'px', 'line-height': height + 'px'}" v-if="showSizes">
      <div class="page-select" :style="{'width': selectWidth}">
        <div
          class="select-input"
          :style="selectedColor()"
          @mouseover="selectHover = true"
          @mouseout="selectHover = false"
        >
          <span class="selected-value" :style="{'font-size': fontSize, 'height': height + 'px', 'line-height': height + 'px'}" @click.stop="pageSizeChange">{{currentSize}} 条/页</span>
          <svg class="icon up-down" :class="{'down-up': upAndDown}" :style="{top: dropdownTopPos}" width="24px" height="24.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#7f848f" d="M0 238.50496l511.80032 486.21056L1023.60064 238.50496z" /></svg>
        </div>
        <transition name="dropdown">
          <div class="select-dropdown" :style="{'width': selectWidth}" ref="dropdown" v-if="upAndDown">
            <ul>
              <li
                class="select-item"
                :style="selectChoiceColor(item)"
                v-for="item in pageSizes"
                @click="pageSizeChoise(item)">{{item}} 条/页</li>
            </ul>
          </div>
        </transition>
      </div>
    </div>



    <!-- pages -->

    <ul class="page-wrap">
      <li class="page-pre page-item btn change-btn" :class="{'not-allowed': current === 1}" :style="{color: current === 1 ? mainTextColor : color, cursor: current === 1 ? 'not-allowed' : 'pointer', 'font-size': fontSize, 'height': height + 'px', 'line-height': (height - 2) + 'px', 'min-width': height + 'px'}" @click="prePage">{{preText ? preText : '上一页'}}</li>
      
      <template v-for="(item,index) in pages">

        <template v-if="typeof item === 'object'">
          
          <svg @click="choisePage(item)" 
          @mouseover="pageOver(item,index)" 
          @mouseout="pageOut(item)" class="icon page-item btn svg-padding" :style="{'height': height + 'px', 'line-height': (height - 2) + 'px', 'min-width': height + 'px'}" width="24px" height="24.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path 
          :fill="fillColor(index)" :d="item.svg" /></svg>

        </template>

        <template v-if="typeof item !== 'object'">
          <li
          class="page-item btn"
          :style="pageChoiceColor(item,index)"
          @mouseover="pageOver(item,index)"
          @mouseout="pageOut(item)"
          @click="choisePage(item)">
            <span>{{formatPage(item)}}</span>
        </li>
        </template>
      </template>

      <li class="page-next page-item btn change-btn" :class="{'not-allowed': current === count}"  :style="{color: current === count ? mainTextColor : color, cursor: current === count ? 'not-allowed' : 'pointer',  'font-size': fontSize, 'height': height + 'px', 'line-height': (height - 2) + 'px', 'min-width': height + 'px'}" @click="nextPage">{{nextText ? nextText : '下一页'}}</li>
    </ul>


    <!-- jump -->
    <div class="page-jump" v-if="showJump">
      <span class="no-select" :style="{'float': 'left', 'font-size': fontSize, 'height': height + 'px', 'line-height': height + 'px'}">前往</span>
      <div class="page-input" :style="{'float': 'left', 'font-size': fontSize}">
        <input type="text" class="jump-input" :style="[jumpFocusColor, junpFontSize]" v-model="toPage" @keyup.enter="toPageChange" @focus="jumpFocus" @blur="toPageChange">
      </div>
      <span class="no-select" :style="{'float': 'left', 'font-size': fontSize, 'height': height + 'px', 'line-height': height + 'px'}">页</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pagination',
  data: function () {
    return {
      count: Math.ceil(this.total / this.pageSize),
      current: this._calCuCurrent(),
      leftStatus: false,
      rightStatus: false,
      selectedSize: false,
      pageItemHover: false,
      mainTextColor: '#303133',
      fontSize: '12px',
      height: 28,
      dropdownTopPos: 5,
      droplistTopPos: 5,
      pageMargin: '2px',
      selectWidth: '100px',
      jumpFocusColor: '',
      pageHoverCur: '',
      hover: {},
      selectHover: false,
      upAndDown: false,
      currentSize: this.pageSizes[0],
      toPage: this.currentPage,
      getStep: this._calCuStep(),
      svgPath: {
        normal: 'M144.129509 398.05736c-60.88538 0-110.207655 49.424603-110.207654 110.309983s49.322274 110.309983 110.207654 110.309983S254.439492 569.355051 254.439492 508.367343c0-60.88538-49.424603-110.309983-110.309983-110.309983z m367.563506 0c-60.88538 0-110.207655 49.424603-110.207655 110.309983S450.807635 618.677326 511.693015 618.677326 621.90067 569.252723 621.90067 508.367343 572.578395 398.05736 511.693015 398.05736z m367.563505 0c-60.88538 0-110.207655 49.424603-110.207654 110.309983s49.322274 110.309983 110.207654 110.309983 110.207655-49.424603 110.207655-110.309983-49.322274-110.309983-110.207655-110.309983z',
        pre: 'M159.936619 516.378727l394.22155 394.836557-48.007387 48.00227L111.724571 564.80567l0 0-46.314839-46.310745L519.141654 64.782446l46.309722 46.309722L159.936619 516.378727zM159.936619 516.378727M553.075511 516.378727l394.22155 394.836557-48.007387 48.00227L504.862439 564.80567l0 0-46.314839-46.310745L912.280546 64.782446l46.309722 46.309722L553.075511 516.378727zM553.075511 516.378727',
        next: 'M886.434909 483.979636 527.732364 137.332364C510.580364 120.32 486.772364 116.363636 474.530909 128.512c-12.241455 12.148364-8.261818 35.816727 8.866909 52.852364l350.603636 338.804364-354.909091 344.576c-17.431273 17.338182-21.480727 41.402182-9.029818 53.783273 12.474182 12.381091 36.701091 8.354909 54.132364-8.96l361.960727-351.418182c11.380364-11.287273 16.942545-25.437091 16.011636-37.352727C903.098182 509.067636 897.629091 495.127273 886.434909 483.979636zM584.215273 520.773818c0.884364-11.729455-4.538182-25.646545-15.755636-36.794182L209.710545 137.332364C192.581818 120.32 168.750545 116.363636 156.532364 128.512S148.247273 164.352 165.376 181.387636l350.603636 338.827636L161.117091 864.744727C143.662545 882.082909 139.636364 906.170182 152.087273 918.528 164.538182 930.909091 188.788364 926.882909 206.219636 909.568l361.960727-351.418182C579.560727 546.839273 585.099636 532.712727 584.215273 520.773818z'
      }
    }
  },
  props: {
    total: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    showTotal: {
      type: Boolean,
      default: false
    },
    showSizes: {
      type: Boolean,
      default: false
    },
    showJump: {
      type: Boolean,
      default: false
    },
    preText: {
      type: String
    },
    nextText: {
      type: String
    },
    step: {
      type: Number,
      default: 5
    },
    color: {
      type: String,
      default: '#428bca'
    },
    size: {
      type: String,
      default: 'small'
    },
    pageSizes: {
      type: Array,
      default: function () {
        return [10, 20, 30, 50]
      },
      validator: function (arr) {
        if (arr.length) {
          var filter = arr.filter(function (item) {
            return typeof item !== 'number'
          })
          return filter.length === 0
        } else {
          return false
        }
      }
    }
  },
  methods: {
    _calCuCurrent: function () {
      var current
      var num = Number(this.currentPage)
      if (num) {
        var count = Math.ceil(this.total / this.pageSize)
        current = this.currentPage > count ? count : this.currentPage
      } else {
        current = 1
      }
      return current
    },
    _calCuStep: function () {
      var step
      var num = Number(this.step)
      if (num) {
        var count = Math.ceil(this.total / this.pageSize)
        step = this.step > count ? count : this.step
      } else {
        step = 1
      }
      return step
    },
    svg: function (item) {
      if (typeof item === 'object' && (this.leftStatus === false || this.rightStatus === false)) {
        return this.svgPath.normal
      }
      if (typeof item === 'object' && item.type === 'pre' && this.leftStatus === true && this.rightStatus === false) {
        return this.svgPath.pre
      }
      if (typeof item === 'object' && item.type === 'next' && this.leftStatus === false && this.rightStatus === true) {
        return this.svgPath.next
      }
    },
    selectChoiceColor: function (item) {
      return {'color': this.currentSize === item ? '#fff' : '#495060', 'background': this.currentSize === item ? this.color : '#fff', 'font-size': this.fontSize}
    },
    pageChoiceColor: function (item, index) {
      if (item === this.current) {
        return {'color': '#fff', 'background': this.color, 'border': '1px solid ' + this.color, 'font-size': this.fontSize, 'height': this.height + 'px', 'line-height': this.height - 2 + 'px', 'min-width': this.height + 'px', 'margin': '0 ' + this.pageMargin}
      } else {
        if (this.pageItemHover === index) {
          return {color: this.color, border: '1px solid ' + this.color, 'font-size': this.fontSize, 'height': this.height + 'px', 'line-height': this.height - 2 + 'px', 'min-width': this.height + 'px', 'margin': '0 ' + this.pageMargin}
        } else {
          return {'font-size': this.fontSize, 'height': this.height + 'px', 'line-height': this.height - 2 + 'px', 'min-width': this.height + 'px', 'margin': '0 ' + this.pageMargin}
        }
      }
    },
    selectedColor: function () {
      return {
        'border': (this.selectedSize || this.selectHover) ? '1px solid ' + this.color : '1px solid #DCDFE6', 'height': this.height + 'px', 'line-height': this.height + 'px'
      }
    },
    fillColor: function (index) {
      return this.pageItemHover === index ? this.color : '#7f848f'
    },
    formatPage: function (item) {
      var pageType = typeof item
      if (pageType !== 'object') {
        return item
      }
      return item.val
    },
    choisePage: function (page) {
      var pageType = typeof page
      if (pageType !== 'object') {
        var num = Number(page)
        if (num === this.current) {
        } else if (num >= 1 && num <= this.count) {
          // 正确范围
          this.current = num
        } else {
        }
      } else {
        // 快进和快退
        if (page.type === 'pre') {
          var quickPre = Number(this.current - this.getStep)
          this.current = quickPre > 0 ? quickPre : 1
        } else {
          var quickNext = this.current + this.getStep
          this.current = quickNext < this.count ? quickNext : this.count
        }
      }
      this.toPage = this.current
      this.leftStatus = false
      this.rightStatus = false
      this.$emit('current-change', this.current)
    },
    /*
      上一页
     */
    prePage: function () {
      if (this.current > 1) {
        this.current--
        this.toPage = this.current
        this.$emit('current-change', this.current)
      }
    },
    /*
      下一页
     */
    nextPage: function () {
      if (this.current < this.count) {
        this.current++
        this.toPage = this.current
        this.$emit('current-change', this.current)
      }
    },
    pageOver: function (page, index) {
      var pageType = typeof page
      if (pageType === 'object') {
        if (page.type === 'pre') {
          this.leftStatus = true
          this.rightStatus = false
        } else {
          this.leftStatus = false
          this.rightStatus = true
        }
      }
      this.pageItemHover = index
    },
    pageOut: function (page) {
      var pageType = typeof page
      if (pageType === 'object') {
        this.leftStatus = false
        this.rightStatus = false
      }
      this.pageItemHover = 999
    },
    /*
      每页大小改变
     */
    pageSizeChange: function () {
      var that = this
      this.selectedSize = !this.selectedSize
      this.upAndDown = !this.upAndDown
      if (this.upAndDown) {
        setTimeout(function () {
          var drop = that.$refs.dropdown
          var rect = drop.getBoundingClientRect()
          console.log(drop.getBoundingClientRect())
          if (rect.bottom > rect.height) {
            console.log('this.droplistTopPos', that.droplistTopPos)
            drop.style.top = that.droplistTopPos
          } else {
            drop.style.top = -(rect.height + 10) + 'px'
          }
        })
      }
    },
    pageSizeChoise: function (val) {
      this.currentSize = val
      this.$emit('size-change', val)
    },
    jumpFocus: function () {
      this.jumpFocusColor = {border: '1px solid ' + this.color}
    },
    toPageChange: function () {
      this.jumpFocusColor = {}
      var num = Number(this.toPage)
      num = num > this.count ? this.count : num
      console.log('num', num, this.count)
      if (num) {
        this.choisePage(num)
      } else {
        this.choisePage(1)
      }
    }
  },
  computed: {
    pages: function () {
      var pages = []
      var count = this.count
      var current = this.current
      if (count < 5) {
        for (var i = 1; i <= count; i++) {
          pages.push(i)
        }
      } else {
        if (current === 1) {
          pages = [1, 2, 3, {type: 'next', svg: this.rightStatus ? this.svgPath.next : this.svgPath.normal}, count]
        } else {
          var leftHand = current - 1
          var rightHand = count - current
          /*
            four status
           */
          if (leftHand <= 3 && rightHand <= 3) {
            for (var x = 1; x <= count; x++) {
              pages.push(x)
            }
          }
          if (leftHand <= 3 && rightHand > 3) {
            for (var y = 1; y <= current; y++) {
              pages.push(y)
            }
            pages.push(current + 1, current + 2, {type: 'next', svg: this.rightStatus ? this.svgPath.next : this.svgPath.normal}, count)
          }
          if (leftHand > 3 && rightHand <= 3) {
            pages.push(1, {type: 'pre', svg: this.leftStatus ? this.svgPath.pre : this.svgPath.normal}, current - 2, current - 1, current)
            for (var m = current + 1; m <= count; m++) {
              pages.push(m)
            }
          }
          if (leftHand > 3 && rightHand > 3) {
            pages.push(1, {type: 'pre', svg: this.leftStatus ? this.svgPath.pre : this.svgPath.normal}, current - 2, current - 1, current)
            pages.push(current + 1, current + 2, {type: 'next', svg: this.rightStatus ? this.svgPath.next : this.svgPath.normal}, count)
          }
        }
      }
      return pages
    },
    junpFontSize: function () {
      return {'font-size': this.fontSize, 'height': this.height + 'px', 'line-height': this.height + 'px'}
    }
  },
  mounted: function () {
    var that = this
    document.querySelector('body').addEventListener('click', function (e) {
      that.selectedSize = false
      that.upAndDown = false
    }, false)
    switch (this.size) {
      case 'small':
        this.fontSize = '12px'
        this.selectWidth = '100px'
        this.pageMargin = '2px'
        this.height = 28
        this.dropdownTopPos = '8px'
        this.droplistTopPos = '28px'
        break
      case 'middle':
        this.fontSize = '14px'
        this.selectWidth = '120px'
        this.pageMargin = '3px'
        this.height = 32
        this.dropdownTopPos = '11px'
        this.droplistTopPos = '32px'
        break
      case 'large':
        this.fontSize = '16px'
        this.selectWidth = '140px'
        this.pageMargin = '4px'
        this.height = 36
        this.dropdownTopPos = '13px'
        this.droplistTopPos = '36px'
        break
      default:
        break
    }
  }
}
</script>
<style scoped>
.simple-pagination {
  margin: 0;
  padding: 0;
  text-align: center;
  display: inline-block;
  font-size: 0;
  color: #606266;
  font-family: Arial;
}

.simple-pagination .page-wrap {
  display: inline-block;
  white-space: nowrap;
  vertical-align: top;
  padding: 0 5px;
  color: #303133;
  font-size: 0;
  box-sizing: border-box;
}

.simple-pagination ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.page-wrap .page-item {
  display: inline-block;
  margin: 0 3px;
  color: #303133;
}

.page-wrap .btn {
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  min-width: 28px;
  text-align: center;
  list-style: none;
  background-color: #fff;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  transition: border .2s ease-in-out,color .2s ease-in-o
}
.page-wrap .btn.svg-padding {
  padding: 6px;
}

.page-wrap .btn.change-btn {
  display: inline-block;
  box-sizing: border-box;
  padding: 0 10px;
  text-align: center;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  height: 28px;
  line-height: 26px;
  color: #428bca;
  background-color: #fff;
}

.page-wrap .page-pre {
  margin-left: 0;
  color: #428bca;
}

.page-wrap .page-next {
  margin-right: 0;
  color: #428bca;
}

.page-wrap .btn.not-allowed {
  color: #303133;
  cursor: not-allowed;
}

.page-jump{
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  font-size: 0;
  margin-left: 24px;
}

.page-jump .no-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.page-jump .page-input{
  width: 50px;
  display: inline-block;
  box-sizing: border-box;
  padding: 0 2px;
  margin: 0 4px;
}

.page-jump .page-input .jump-input {
  display: block;
  text-align: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  background-color: #fff;
  background-image: none;
  outline: none;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}

.page-size {
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  font-size: 0;
  margin-right: 24px;
}

.page-size .page-select {
  width: 100px;
  height: 100%;
  position: relative;
}

.page-size .page-select .select-input {
  width: 100%;
  position: relative;
  float: left;
  display: inline-block;
  border: 1px solid #DCDFE6;
  box-sizing: border-box;
  border-radius: 4px;
}

.page-size .page-select .selected-value {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 8px;
  padding-right: 24px;
  cursor: pointer;
  user-select: none;
}

.page-size .page-select .up-down {
  width: 12px;
  height: 12px;
  position: absolute;
  right: 7px;
  top: 8px;
  transform-origin: 50% 6px;
  transition: all .2s ease-in-out;
}

.page-size .page-select .down-up {
  transform:rotate(180deg);
}

.page-select .select-dropdown {
  position: absolute;
  width: 100px;
  top: 0;
  left: 0;
  max-height: 200px;
  overflow: auto;
  margin: 5px 0;
  padding: 5px 0;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
  z-index: 100;
  /*transform: translateY(-100%);*/
}

.page-select .select-dropdown .select-item {
  margin: 0;
  line-height: normal;
  padding: 7px 16px;
  clear: both;
  color: #495060;
  white-space: nowrap;
  list-style: none;
  cursor: pointer;
  transition: background .5s ease-in-out;
}

.page-select .select-dropdown .select-item:hover {
  background-color: #EBEEF5;
}

.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity .5s;
}
.dropdown-enter, .dropdown-leave-to {
  opacity: 0;
}

/*.dropdown-enter-active .select-item, .dropdown-leave-active .select-item {
  transition: padding .5s;
  padding: 7px 16px;
}

.dropdown-enter .select-item, .dropdown-leave-to .select-item {
  padding: 0px 16px;
}*/

.page-total {
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  margin-right: 10px;
}

</style>
