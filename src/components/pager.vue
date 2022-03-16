<template>
  <div class="pager-wrapper"
       ref="pager">
    <div class="pager-box">
      <a class="pager-prev"
         :class="{'pager-disabled':prevDisable}"
         href="javascript:;"
         @click="jumpPrev()">上一页</a>
      <template v-for="i in pageSize">
        <span v-if="i==pageNow"
              class="pager-curr">
          <em class="pager-em"></em><em>{{i}}</em>
        </span>
        <a v-else-if="pageNow<5&&(i)<6"
           href="javascript:;"
           @click="jump(i)">
          {{i}}
        </a>
        <a v-else-if="pageSize<7||i==1||i==pageSize||(pageNow-2<=i&&i<=pageNow+2)"
           href="javascript:;"
           @click="jump(i)">
          {{i}}
        </a>
        <template v-else>
          <span v-if="pageNow<5&&i==6"
                class="pager-spr">…</span>
          <span v-if="pageNow==4&&i==7"
                class="pager-spr">…</span>
          <span v-if="pageNow>4&&i==pageNow-3"
                class="pager-spr">…</span>
          <span v-if="pageNow>4&&i==pageNow+3"
                class="pager-spr">…</span>
        </template>
      </template>
      <a class="pager-next"
         :class="{'pager-disabled':nextDisable}"
         href="javascript:;"
         @click="jumpNext()">下一页</a>
    </div>
    <div class="pager-input">
      <input type="text"
             v-model="jumpPage">
      <a class="pager-btn-go"
         href="javascript:;"
         @click="Go()">GO</a>
    </div>
  </div>
</template>

<script>
export default {
  model: { //通过v-model传过来的参数
    prop: 'pageNow',
    event: 'jumpPage'
  },
  props: {
    pageSize: {
      type: Number,
      default: 1
    },
    pageNow: { //通过v-model传过来的参数
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      jumpPage: '' //避免操作props参数
    }
  },
  computed: {
    prevDisable: function () { //“上一页”按钮是否可点
      if (this.pageNow > 1) {
        return false;
      } else {
        return true
      }
    },
    nextDisable: function () { //“下一页”按钮是否可点
      if (this.pageNow < this.pageSize && this.pageSize > 1) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    jumpPrev: function () { //点击上一页
      if (this.pageNow == 1) {
        return;
      } else {
        this.$emit('jumpPage', this.pageNow - 1);
        this.$emit('on-jump', this.pageNow - 1);
      }
    },
    jumpNext: function () { //点击下一页
      if (this.pageNow == this.pageSize) {
        return;
      } else {
        this.$emit('jumpPage', this.pageNow + 1); //修改当前页码
        this.$emit('on-jump', this.pageNow + 1); //跳转
      }
    },
    jump: function (id) { //直接跳转
      if (id > this.pageSize) {
        id = this.pageSize;
      }
      this.jumpPage = '';
      this.$emit('jumpPage', id); //修改当前页码
      this.$emit('on-jump', id); //跳转
    },
    Go: function () {
      if (this.jumpPage == '') { //判空处理
        return;
      } else if (/^\d*$/.test(parseInt(this.jumpPage))) { //填写数字才能跳转
        this.jump(parseInt(this.jumpPage));
        this.jumpPage = '';
      } else {
        this.jumpPage = '';
        return;
      }
    }
  }
}
</script>

<style scoped>
.pager-wrapper {
  display: flex;
  justify-content: center;
}
.pager-box {
  text-align: center;
}
.pager-box .pager-curr em {
  font-style: normal;
}
.pager-box a,
.pager-box span,
.pager-btn-go {
  display: inline-block;
  vertical-align: middle;
  height: 30px;
  line-height: 30px;
  margin: 7px;
  background-color: #fff;
  padding: 0 10px;
  font-size: 15px;
  color: #333;
  text-decoration: none;
  border: 1px solid #ececec;
  border-radius: 4px;
  box-sizing: content-box;
}
.pager-box .pager-curr {
  position: relative;
}
.pager-box .pager-curr .pager-em {
  position: absolute;
  left: 0;
  top: 0;
  padding: 1px;
  width: 100%;
  height: 100%;
  background-color: #1ebca5;
  border-radius: 4px;
}
.pager-box .pager-curr em {
  position: relative;
  color: #fff;
}
.pager-box .pager-disabled {
  background-color: #ececec;
}
.pager-input {
  margin-left: 30px;
}
.pager-input input {
  width: 40px;
  height: 30px;
  line-height: 28px;
  border: 1px solid #ececec;
  box-sizing: border-box;
  padding: 0 5px;
  border-radius: 4px;
}
</style>