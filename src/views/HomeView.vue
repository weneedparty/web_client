<template>
  <div ref="parentRefrence">hi</div>
  <van-button type="primary" @click="async () => {
    if (dict.data.room?.canPlaybackAudio) {
      await dict.data.room?.startAudio()
      functions.basic.log(dict.data.room)
    }
  }">Play</van-button>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import store, { functions } from "../store";
import * as livekit from 'livekit-client';
import { RoomInfo } from "@/generated_grpc/room_control_service_pb";
import { Room, RoomEvent, Track } from "livekit-client";

const dict = reactive({
  data: {
    roomList: [] as RoomInfo[] | undefined,
    accessToken: "",
    room: null as unknown as Room | undefined,
  },
  functions: {
    updateRooms: () => {
      const listRoomRequest = new store.variables.inputAndOutput.roomControlInputAndOutput.ListRoomsRequest();
      store.variables.roomControlService.listRooms(listRoomRequest, store.variables.jwtMetaData, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
          const roomList = res?.getRoomsList();
          console.log(roomList)
          dict.data.roomList = roomList
        }
      })
    },
    createARoom: () => {
      const createRoomRequest = new store.variables.inputAndOutput.roomControlInputAndOutput.CreateRoomRequest();
      store.variables.roomControlService.createRoom(createRoomRequest, store.variables.jwtMetaData, (err, res) => {
        if (err) {
          console.log(err);
          functions.basic.showToast(err.message);
        } else {
          console.log(res);
          const success = res?.getSuccess();
          console.log(success)
          functions.basic.showToast("Create a room successfully.");
        }
      })
    },
    joinARoom: (roomName: string, afterSuccess: () => Promise<void> = async () => { }) => {
      const joinRoomRequest = new store.variables.inputAndOutput.roomControlInputAndOutput.AllowJoinRequest();
      joinRoomRequest.setIdentity(store.variables.localStorage.get("email"));
      joinRoomRequest.setRoomname(roomName);
      store.variables.roomControlService.allowJoin(joinRoomRequest, store.variables.jwtMetaData, async (err, res) => {
        if (err) {
          console.log(err);
          functions.basic.showToast(err.message);
        } else {
          console.log(res);
          const accessToken = res?.getAccesstoken();
          if (accessToken) {
            dict.data.accessToken = accessToken
            console.log(accessToken)
            await afterSuccess();
            functions.basic.showToast("Join a room successfully.");
          }
        }
      })
    },
  }
})

const parentRefrence = ref(null as unknown as HTMLElement);

function handleTrackSubscribed(
  track: livekit.RemoteTrack,
  publication: livekit.RemoteTrackPublication,
  participant: livekit.RemoteParticipant,
) {
  if (track.kind === Track.Kind.Video || track.kind === Track.Kind.Audio) {
    // attach it to a new HTMLVideoElement or HTMLAudioElement
    const element = track.attach();
    parentRefrence?.value?.appendChild(element);
  }
}

onMounted(async () => {
  functions.pages.jumpToLoginPageIfItMust(async () => {
    dict.functions.joinARoom("test", async () => {
      const room = new livekit.Room({
        adaptiveStream: true,
        dynacast: true,
      });
      const result = await room.connect(
        // "ws://localhost:7880",
        "ws://106.52.12.33:7880",
        dict.data.accessToken,
        {
          autoSubscribe: true,
        }
      );
      console.log(result)
      dict.data.room = room;

      room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed)

      // await room.localParticipant.setMicrophoneEnabled(true);
      // await room.startAudio();
    })
  })
});

</script>

<style>
</style>