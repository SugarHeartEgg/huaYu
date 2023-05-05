<template>
  <div class="flower-item">
    <div
      v-for="(item, index) in resData.showData"
      :key="index"
      class="flower-class-warp"
    >
      <div class="flower-class-title">{{ item.name }}</div>
      <div
        v-for="(items, indexs) in item.children"
        :key="indexs"
        class="flower-child-block"
      >
        <div class="flower-child-body" @click="handlerBodyClick(items, item)">
          <div>{{ items.name }}</div>
          <div class="container">
            <img
              :src="items.url"
              alt=""
              width="50px"
              height="50px"
              @click.stop="handlerView(items.url)"
            />
            <div v-for="(child, indexs) in items.content" :key="indexs">
              {{ child }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <nut-image-preview
    :show="resData.showPreview"
    :images="resData.imgData"
    @close="hideFn"
  />
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";
import { cloneDeep, debounce } from "lodash";
import { matchTreeData } from "../../assets/utils/index";
import flowerData from "../../assets/flower/huayu.json";

const props = defineProps({
  keyword: { type: String, default: "" },
});
const emit = defineEmits(["click"]);
const listData = cloneDeep(flowerData);

const resData = reactive({
  showPreview: false,
  imgData: [{ src: "" }],
  showData: listData,
});

const itemsConten = computed(() => (content: any[]) => {
  return content.join(",");
});

watch(
  () => props.keyword,
  (newVal) => {
    searchFunc(newVal);
  }
);

const searchFunc = debounce((val: string) => {
  const arr: any[] = matchTreeData(listData, val);
  resData.showData = arr;
}, 300);

const handlerView = debounce((url) => {
  resData.showPreview = true;
  resData.imgData = [{ src: url }];
}, 300);

function hideFn() {
  resData.showPreview = false;
}

function handlerBodyClick(node: any, parentNode: any) {
  emit("click", node, parentNode);
}
</script>

<style lang="scss">
.flower-item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  .flower-class-warp {
    width: 100%;
    margin-top: 10px;
    box-sizing: border-box;
    .flower-class-title {
      width: 100%;
      height: 50px;
      padding-left: 10px;
      line-height: 30px;
      font-size: 35px;
      font-weight: 800;
      border-radius: 4px 4px 0 0;
      box-sizing: border-box;
    }
    .flower-child-block {
      width: 100%;
      margin-bottom: 10px;
      border-radius: 4px;
      border: 1px solid #ebeef5;
      transition: 0.3s;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
      background-color: #fff;
      color: #303133;
      box-sizing: border-box;

      .flower-child-body {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;

        .container {
          padding: 15px 0;
          img {
            vertical-align: middle;
          }
          div {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
