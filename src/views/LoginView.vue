<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import store from "../store";

import { functions } from "../store";

const formRef = ref(null) as any;

const dict = reactive({
  tempData: {
    showDialog: false
  },
  data: {
    form: {
      email: "",
      verifyCode: "",
    },
  },
  functions: {
    onEmailSubmit: async () => {
      functions.pages.loadingOn();

      const registerRequest = new store.variables.inputAndOutput.accountInputAndOutput.RegisterRequest();
      registerRequest.setEmail(dict.data.form.email);

      store.variables.accountService.userRegisterRequest(registerRequest,
        async (err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.log(res);
            console.log(res?.getError());
            const error = res?.getError();
            if (error === "") {
              dict.tempData.showDialog = true;
            } else {
              functions.basic.showToast(String(error));
            }
          }
          functions.pages.loadingOff()
        })
    },
    onVerifySubmit: async () => {
      if (dict.data.form.verifyCode === "") {
        functions.basic.showToast("验证码不能为空");
        return;
      }

      const registerRequest = new store.variables.inputAndOutput.accountInputAndOutput.RegisterConfirmRequest();
      registerRequest.setEmail(dict.data.form.email);
      registerRequest.setRandomString(dict.data.form.verifyCode);

      store.variables.accountService.userRegisterConfirm(registerRequest,
        async (err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.log(res);
            console.log(res?.getError());
            const error = res?.getError();
            if (error === "") {
              dict.tempData.showDialog = false;
              const jwt = res?.getResult()?.getJwt();
              console.log(jwt);
              store.variables.localStorage.set("jwt", jwt);
              functions.pages.switchPage(store.variables.routesMap.home);
            } else {
              functions.basic.showToast(String(error));
            }
          }
        })
    }
  }
})

onMounted(async () => {
  await functions.pages.jumpToLoginPageIfItMust(async () => {
    functions.pages.switchPage(store.variables.routesMap.home);
  })
});
</script>

<template>
  <div class="bigBackground">
    <div class="container">
      <van-form :ref="formRef" @submit="dict.functions.onEmailSubmit">
        <van-cell-group inset>
          <van-field v-model="dict.data.form.email" name="Email" label="Email" placeholder="Email" type="email"
            validate-trigger="onSubmit" :rules="[{ required: true, message: 'Email is required' }]" />

          <!-- <van-field v-model="dict.data.form.email" name="VerifyCode" label="Verify Code" placeholder="Verify Code"
            validate-trigger="onSubmit" :rules="[{ required: true, message: 'VerifyCode is required' }]" /> -->
        </van-cell-group>

        <van-row justify="center">
          <van-button class="submitButton" round block type="primary" native-type="submit" @click="formRef?.submit()">
            Submit</van-button>
        </van-row>
      </van-form>

      <van-dialog v-model:show="dict.tempData.showDialog" title="Verify" show-cancel-button confirmButtonText="Confirm"
        cancel-button-text="Cancel" @confirm="dict.functions.onVerifySubmit">
        <van-form>
          <van-cell-group inset>
            <van-field v-model="dict.data.form.verifyCode" type="text" name="VerifyCode" label="Verify Code"
              placeholder="Verify Code" validate-trigger="onSubmit"
              :rules="[{ required: true, message: 'VerifyCode is required' }]" />
          </van-cell-group>
        </van-form>
      </van-dialog>
    </div>
  </div>
</template>


<style lang="scss">
@import "../scss/base.scss";

.bigBackground {
  background-color: #c6e5ff;
  // background-image: url("/img/R.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
}

.Center {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  min-height: 100vh;
  font-size: large;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .submitButton {
    margin-top: 18px;
    width: 90%;
  }
}

.gradientGreen {
  background: rgb(2, 0, 36);
  background: -moz-linear-gradient(90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(183, 223, 71, 1) 0%,
      rgba(0, 212, 255, 1) 100%);
  background: -webkit-linear-gradient(90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(183, 223, 71, 1) 0%,
      rgba(0, 212, 255, 1) 100%);
  background: linear-gradient(90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(183, 223, 71, 1) 0%,
      rgba(0, 212, 255, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#020024", endColorstr="#00d4ff", GradientType=1);
}

.gradientRed {
  background: rgb(2, 0, 36);
  background: -moz-linear-gradient(90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(0, 212, 255, 1) 0%,
      rgba(255, 0, 144, 1) 100%);
  background: -webkit-linear-gradient(90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(0, 212, 255, 1) 0%,
      rgba(255, 0, 144, 1) 100%);
  background: linear-gradient(90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(0, 212, 255, 1) 0%,
      rgba(255, 0, 144, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#020024", endColorstr="#ff0090", GradientType=1);
}
</style>