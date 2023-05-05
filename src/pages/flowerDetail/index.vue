<template>
  <div class="flower-detail">
    <div class="flower-child-block">
      <div class="flower-child-body">
        <div>{{ resInfo.name }}</div>
        <div class="container">
          <img
            :src="resInfo.url"
            alt=""
            width="50px"
            height="50px"
            @click="handlerView"
          />
          <div v-for="(child, indexs) in resInfo.content" :key="indexs">
            {{ child }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <nut-image-preview
    :show="resInfo.showPreview"
    :images="resInfo.imgData"
    @close="hideFn"
  />
</template>

<script setup>
import { reactive } from "vue";
import { debounce } from "lodash";
import Taro from "@tarojs/taro";
const routerParams = Taro.getCurrentInstance();
const detailInfo = JSON.parse(routerParams.router.params.detail);

const resInfo = reactive({
  showPreview: false,
  imgData: [{ src: "" }],
  ...detailInfo,
});

function hideFn() {
  resInfo.showPreview = false;
}
const handlerView = debounce(() => {
  console.log(resInfo);
  resInfo.showPreview = true;
  resInfo.imgData = [{ src: resInfo.url }];
}, 300);
</script>

<style lang="scss" src="./index.scss"></style>
