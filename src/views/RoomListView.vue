<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import store, { functions } from "../store";
import * as livekit from 'livekit-client';
import { RoomInfo } from "@/generated_grpc/room_control_service_pb";

import { PlusOutlined } from '@ant-design/icons-vue';

const dict = reactive({
  tempData: {
    roomList: {
      refreshing: false,
      loading: false,
      finished: true,
      data: [
      ] as RoomInfo[] | undefined,
    },
    showDialog: false,
  },
  data: {
    accessToken: null as string | null | undefined,
    form: {
      roomName: "",
    }
  },
  functions: {
    roomController: {
      updateRooms: (nextThingToDo: () => Promise<void> = async () => { }) => {
        const listRoomRequest = new store.variables.inputAndOutput.roomControlInputAndOutput.ListRoomsRequest();
        store.variables.roomControlService.listRooms(listRoomRequest, store.variables.jwtMetaData, async (err, res) => {
          if (err) {
            // console.log(err);
            dict.tempData.roomList.data = []
            await nextThingToDo()
          } else {
            // console.log(res);
            const roomList = res?.getRoomsList();
            // console.log(roomList)
            dict.tempData.roomList.data = roomList
            await nextThingToDo()
          }
        })
      },
      joinARoom: (roomName: string, afterSuccess: () => Promise<void> = async () => { }) => {
        const joinRoomRequest = new store.variables.inputAndOutput.roomControlInputAndOutput.AllowJoinRequest();
        joinRoomRequest.setIdentity(store.variables.email ?? "");
        joinRoomRequest.setRoomname(roomName);
        store.variables.roomControlService.allowJoin(joinRoomRequest, store.variables.jwtMetaData, async (err, res) => {
          if (err) {
            // console.log(err);
            dict.data.accessToken = null
            functions.basic.showToast(err.message);
          } else {
            // console.log(res);
            const accessToken = res?.getAccesstoken();
            if (accessToken) {
              dict.data.accessToken = accessToken
              console.log(accessToken)
              await afterSuccess();
              // functions.basic.showToast("Join a room successfully.");
            } else {
              dict.data.accessToken = null
            }
          }
        })
      },
    },
    roomListView: {
      onLoad: async (nextThingToDo: () => Promise<void> = async () => { }) => {
        dict.tempData.roomList.finished = false;
        dict.tempData.roomList.loading = true;

        dict.functions.roomController.updateRooms(async () => {
          dict.tempData.roomList.loading = false;
          dict.tempData.roomList.finished = true;
          await nextThingToDo()
        })
      },
      onRefresh: async (nextThingToDo: () => Promise<void> = async () => { }) => {
        dict.tempData.roomList.refreshing = true
        await dict.functions.roomListView.onLoad(async () => {
          dict.tempData.roomList.refreshing = false
          await nextThingToDo()
        })
      },
    },
    dialog: {
      createARoomSubmit: async () => {
        if (dict.data.form.roomName === "") {
          functions.basic.showToast("房间名不能为空");
          return;
        }
        if (dict.data.form.roomName.length > 20) {
          functions.basic.showToast("房间名不能超过20个字符");
          return;
        }
        if (dict.data.form.roomName.length < 2) {
          functions.basic.showToast("房间名不能少于2个字符");
          return;
        }
        if (dict.data.form.roomName.includes(" ")) {
          functions.basic.showToast("房间名不能包含空格");
          return;
        }
        if (dict.data.form.roomName.includes("\n")) {
          functions.basic.showToast("房间名不能包含换行符");
          return;
        }
        if (dict.data.form.roomName.includes("\t")) {
          functions.basic.showToast("房间名不能包含制表符");
          return;
        }
        if (dict.data.form.roomName.includes("\r")) {
          functions.basic.showToast("房间名不能包含回车符");
          return;
        }
        if (dict.data.form.roomName.includes("\v")) {
          functions.basic.showToast("房间名不能包含垂直制表符");
          return;
        }
        if (dict.data.form.roomName.includes("\f")) {
          functions.basic.showToast("房间名不能包含换行符");
          return;
        }
        if (dict.data.form.roomName.includes("\b")) {
          functions.basic.showToast("房间名不能包含退格符");
          return;
        }
        if (dict.data.form.roomName.includes("\v")) {
          functions.basic.showToast("房间名不能包含垂直制表符");
          return;
        }
        dict.functions.roomController.joinARoom(dict.data.form.roomName, async () => {
          dict.tempData.showDialog = false
          await dict.functions.roomListView.onRefresh()
          functions.pages.switchPage(store.variables.routesMap.chatRoom, {
            roomName: dict.data.form.roomName,
            accessToken: dict.data.accessToken,
          })
        })
      }
    }
  }
})

onBeforeMount(async () => {
  functions.pages.jumpToLoginPageIfItMust(async () => {
  })
})

onMounted(async () => {
  functions.pages.loadingOn()

  await dict.functions.roomListView.onRefresh(async () => {
    console.log("resfresh")
    functions.pages.loadingOff()
  })
});

</script>

<template>
  <div ref="parentRefrence" class="PartiesTopTitle">Parties</div>

  <van-pull-refresh class="boxBorder" v-model="dict.tempData.roomList.refreshing" successText="Refresh success"
    pullingText="Refresh" loosingText="Loosing" loadingText="Loading" @refresh="dict.functions.roomListView.onRefresh">
    <van-list class="roomList" v-model:loading="dict.tempData.roomList.loading" loadingText="Loading"
      finishedText="Finished" emptyText="Empty" errorText="Error" :finished="dict.tempData.roomList.finished"
      finished-text="" @load="dict.functions.roomListView.onLoad">
      <van-cell class="oneRow" v-for="item in dict.tempData.roomList.data" :key="item.getRoomname()"
        :title="item.getRoomname()" @click="() => {
          functions.pages.switchPage(store.variables.routesMap.chatRoom, {
            roomName: item.getRoomname(),
            accessToken: dict.data.accessToken,
          })
        }" />
    </van-list>
  </van-pull-refresh>

  <div class="floatingButtonAtTheRightBottomCornor" @click="dict.tempData.showDialog = true">
    <plus-outlined :style="{ fontSize: '20px' }" />
  </div>

  <van-dialog v-model:show="dict.tempData.showDialog" title="Create a room" show-cancel-button
    confirmButtonText="Confirm" cancel-button-text="Cancel" @confirm="dict.functions.dialog.createARoomSubmit">
    <van-form>
      <van-cell-group inset>
        <van-field v-model="dict.data.form.roomName" type="text" name="RoomName" label="Room Name"
          placeholder="_______________" validate-trigger="onSubmit"
          :rules="[{ required: true, message: 'RoomName is required' }]" />
      </van-cell-group>
    </van-form>
  </van-dialog>
</template>

<style lang="scss">
.PartiesTopTitle {
  font-size: x-large;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
}

.boxBorder {
  border: 1px solid #d9d9d9;
  border-radius: 5px;

  margin-top: 35px;
  margin-bottom: 20px;

  margin-left: 40px;
  margin-right: 40px;

  min-height: 720px;
}

.roomList {
  margin-top: 20px;
  margin-bottom: 20px;

  height: 100%;

  padding-left: 20%;
  padding-right: 20%;

  .van-cell__title {
    margin-top: 32px;
    background-color: rgb(187, 226, 245);
  }
}

.floatingButtonAtTheRightBottomCornor {
  right: 20px;
  bottom: 20px;

  visibility: visible;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, .12);
  display: inline-flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 56px;
  height: 56px;
  padding: 0;
  border: none;
  fill: currentColor;
  cursor: pointer;
  user-select: none;
  -webkit-appearance: none;
  overflow: hidden;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);
  color: var(--mdc-theme-on-secondary, #fff);
  --mdc-ripple-fg-size: 0;
  --mdc-ripple-left: 0;
  --mdc-ripple-top: 0;
  --mdc-ripple-fg-scale: 1;
  --mdc-ripple-fg-translate-end: 0;
  --mdc-ripple-fg-translate-start: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  will-change: transform, opacity;
  background-color: var(--mdc-theme-primary, #3aabf6);
  border-radius: 50%;
  --mdc-ripple-fg-opacity: 0.24;
}

#app>div.van-popup.van-popup--center.van-dialog>div.van-dialog__content>form>div>div {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>