<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import store from "../store";
import { functions } from "../store";

const dict = reactive({
  hoverButton: false,
  backgoundImageUrl: require("@/assets/sky-background.jpg"),
})
</script>

<template>
  <div class="HomePageContainer" :style="{
    backgroundImage: dict.hoverButton ? `url(${dict.backgoundImageUrl})` : 'none',
  }">
    <div class="contentBlock">
      <div class="WeLovePartyTitle ColorFulGradient">We Love Party</div>
      <van-button @mouseover="dict.hoverButton = true" @mouseleave="dict.hoverButton = false" class="getInButton" plain
        type="success" @click="() => {
          functions.pages.switchPage(store.variables.routesMap.login);
        }">Get In</van-button>
    </div>
  </div>
</template>

<style lang="scss">
.HomePageContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;

  // background-image: url('@/assets/sky-background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  > :first-child {
    // margin-top: 200px;

    height: 200px;
    width: 100%;

    background-color: rgba(65, 71, 77, 0.05);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: rgba(65, 71, 77, 0.1);
    }
  }

  .WeLovePartyTitle {
    font-size: xx-large;
    font-weight: bold;
  }

  .getInButton {
    margin-top: 40px;
    // width: 200px;
    width: 20%;

    &:hover {
      opacity: 0.8;
      color: black;

      // width: 25%;
      font-size: medium;

      background: rgb(2, 0, 36);
      background: -moz-linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(192, 135, 229, 1) 0%, rgba(0, 255, 199, 1) 100%);
      background: -webkit-linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(192, 135, 229, 1) 0%, rgba(0, 255, 199, 1) 100%);
      background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(192, 135, 229, 1) 0%, rgba(0, 255, 199, 1) 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#020024", endColorstr="#00ffc7", GradientType=1);

      // &>* :has(.HomePageContainer) {
      //   background-image: url('@/assets/sky-background.jpg');
      // }
    }
  }
}

.ColorFulGradient {
  background: rgb(2, 0, 36);
  background: -moz-linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(0, 212, 255, 1) 0%, rgba(255, 0, 161, 1) 100%);
  background: -webkit-linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(0, 212, 255, 1) 0%, rgba(255, 0, 161, 1) 100%);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(0, 212, 255, 1) 0%, rgba(255, 0, 161, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#020024", endColorstr="#ff00a1", GradientType=1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>