<template>
  <nut-sticky top="50" parent-height="0">
    <nut-searchbar
      v-model="searchValue"
      placeholder="花名......"
    ></nut-searchbar>
  </nut-sticky>

  <div class="search-warp">
    <div class="child-item">
      <flowerItem :keyword="searchValue" @click="handlerClick"></flowerItem>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Taro from "@tarojs/taro";
import flowerItem from "../../common/flower/index.vue";

const searchValue = ref("");

function handlerClick(node) {
  const params = JSON.stringify(node);

  Taro.navigateTo({
    url: `/pages/flowerDetail/index?detail=${params}`,
  });
}
</script>

<style lang="scss" src="./index.scss"></style>
