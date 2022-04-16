<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import store, { functions } from "../store";
import * as livekit from 'livekit-client';
import { RoomInfo } from "@/generated_grpc/room_control_service_pb";
import { Room, RoomEvent, Track } from "livekit-client";

import { useRoute } from "vue-router";

import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons-vue';
import { PlayCircleFilled } from '@ant-design/icons-vue';

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

const itemsPerRow = 3;

const dict = reactive({
  tempData: {
    microphoneOn: false,
    speakerOn: false,
  },
  data: {
    roomName: "",
    accessToken: null as string | null | undefined,

    room: null as unknown as Room | undefined | null,
    participants: [] as Array<livekit.Participant>,
  },
  functions: {
    roomController: {
      joinARoom: (roomName: string, afterSuccess: () => Promise<void> = async () => { }) => {
        const joinRoomRequest = new store.variables.inputAndOutput.roomControlInputAndOutput.AllowJoinRequest();
        joinRoomRequest.setIdentity(store.variables.email ?? "");
        joinRoomRequest.setRoomname(roomName);
        store.variables.roomControlService.allowJoin(joinRoomRequest, store.variables.jwtMetaData, async (err, res) => {
          if (err) {
            console.log(err);
            dict.data.accessToken = null
            functions.basic.showToast(err.message);
          } else {
            console.log(res);
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
      connectToTheRoom: (afterSuccess: () => Promise<void> = async () => { }) => {
        dict.functions.roomController.joinARoom(dict.data.roomName, async () => {
          const room = new livekit.Room({
            adaptiveStream: true,
            dynacast: true,
          });

          const result = await room.connect(
            store.variables.liveKitURL,
            dict.data.accessToken ?? "",
            {
              autoSubscribe: true,
            }
          );
          console.log(result)
          dict.data.room = room;

          room.on(RoomEvent.StateChanged, () => {
            dict.functions.roomController.updateParticipants()
          });
          room.on(RoomEvent.LocalTrackPublished, () => {
            dict.functions.roomController.updateParticipants()
          });
          room.on(RoomEvent.LocalTrackUnpublished, () => {
            dict.functions.roomController.updateParticipants()
          });
          room.on(RoomEvent.DataReceived, () => {
            dict.functions.roomController.updateParticipants()
          });
          room.on(RoomEvent.Reconnected, () => {
            dict.functions.roomController.updateParticipants()
          });
          room.on(RoomEvent.TrackSubscribed, (
            track: livekit.RemoteTrack,
            publication: livekit.RemoteTrackPublication,
            participant: livekit.RemoteParticipant,
          ) => {
            handleTrackSubscribed(
              track,
              publication,
              participant,
            )

            dict.functions.roomController.updateParticipants()
          })
          room.on(RoomEvent.TrackUnpublished, () => {
            dict.functions.roomController.updateParticipants()
          });
          room.on(RoomEvent.ActiveSpeakersChanged, (activeSpeakers: Array<livekit.Participant>) => {
            dict.functions.roomController.updateParticipants()
          })
          room.on(RoomEvent.ParticipantConnected, (participant: livekit.Participant) => {
            dict.functions.roomController.updateParticipants()
          })
          room.on(RoomEvent.ParticipantDisconnected, (participant: livekit.Participant) => {
            dict.functions.roomController.updateParticipants()
          })

          await afterSuccess();
        })
      },
      updateParticipants: () => {
        if (dict.data.room) {
          dict.data.participants = [dict.data.room.localParticipant, ...dict.data.room.participants.values()]
        } else {
          dict.data.participants = []
        }
      },
      getParticipants: () => {
        if (dict.data.room) {
          return [dict.data.room.localParticipant, ...dict.data.room.participants.values()]
        } else {
          return []
        }
      },
      getParticipantByIndex: (index: number) => {
        if (dict.data.room) {
          // const participants = dict.functions.roomController.getParticipants();
          if (index < dict.data.participants.length) {
            return dict.data.participants[index];
          } else {
            return null
          }
        } else {
          return null
        }
      },
    },
    roomListView: {
    },
  }
})

onBeforeMount(async () => {
  functions.pages.jumpToLoginPageIfItMust(async () => {
  })
})

onMounted(async () => {
  functions.pages.loadingOn()

  const routes = useRoute().query

  dict.data.roomName = routes.roomName as string
  dict.data.accessToken = routes.accessToken as string

  dict.functions.roomController.connectToTheRoom(async () => {
    functions.pages.loadingOff()
  })
});

</script>

<template>
  <div class="ChatRoomTopTitle" ref="parentRefrence">Chat Room: {{ dict.data.roomName }}</div>

  <div v-if="!dict.tempData.speakerOn" class="coverOthers">
    <play-circle-filled v-if="dict.data.room" class="bigRedConfirmButton" :style="{ fontSize: '84px', color: 'red' }"
      @click="() => {
        dict.data.room?.startAudio()
        dict.tempData.speakerOn = true
        dict.functions.roomController.updateParticipants()
      }" />
    <div v-else>Loading...</div>
  </div>

  <div class="rows">
    <div class="columns" v-for="rowIndex in Math.ceil(dict.data.participants.length / itemsPerRow)" :key="rowIndex">
      <div v-for="columnIndex in itemsPerRow" :key="columnIndex">
        <div v-if="((itemsPerRow * (rowIndex - 1)) + (columnIndex - 1)) < dict.data.participants.length" :class="{
          'participantCircleHead': true,
          'speakParticipantCircleHead': dict.functions.roomController.getParticipantByIndex(
            (itemsPerRow * (rowIndex - 1)) + (columnIndex - 1)
          )?.isSpeaking
        }">
          {{
            dict.functions.roomController.getParticipantByIndex(
              (itemsPerRow * (rowIndex - 1)) + (columnIndex - 1)
            )?.identity?.split("@")[0]
          }}
        </div>
      </div>
    </div>
  </div>

  <!-- <van-button @click="() => {
    functions.basic.log([...dict.data.room?.participants.values()])
  }">
    test
  </van-button> -->

  <div class="floatingButtonAtTheRightBottomCornor" @click="
    () => {
      if (dict.tempData.microphoneOn) {
        dict.data.room?.localParticipant.setMicrophoneEnabled(false)
        dict.tempData.microphoneOn = false
      } else {
        dict.data.room?.localParticipant.setMicrophoneEnabled(true)
        dict.tempData.microphoneOn = true
      }
    }
  ">
    <audio-outlined v-if="dict.tempData.microphoneOn" :style="{ fontSize: '20px' }" />
    <audio-muted-outlined v-if="!dict.tempData.microphoneOn" :style="{ fontSize: '20px' }" />
  </div>
</template>

<style lang="scss">
.ChatRoomTopTitle {
  font-size: x-large;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
}

.coverOthers {
  position: fixed;
  height: 100vh;
  width: 100vw;
  // top: 0px;
  left: 0px;
  background-color: rgba(255, 255, 255, 1);
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  .bigRedConfirmButton {
    margin-top: -20%;

    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: fixed;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.rows {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 65vh;

  // margin-top: 60px;
}

.columns {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  margin-top: 20px;

  &:last-child {
    // background-color: #3aabf6;
  }
}

.participantCircleHead {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 100px;
  border-radius: 50%;

  background-color: #90c7f8;

  margin: 15px;
}

.speakParticipantCircleHead {}

.speakParticipantCircleHead:before {
  content: "";
  position: absolute;

  width: 150px;
  height: 150px;
  box-sizing: border-box;

  border-radius: 50%;
  background-color: #90c7f8;

  -webkit-animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

.speakParticipantCircleHead:after {
  content: "";
  position: fixed;

  margin-top: 60px;

  width: 15px;
  height: 15px;

  background-color: white;
  border-radius: 50%;
  // border-radius: 15px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  -webkit-animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
  animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
}

@-webkit-keyframes pulse-ring {
  0% {
    transform: scale(0.33);
    opacity: 0.95;
  }

  80%,
  100% {
    opacity: 0;
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.33);
    opacity: 0.95;
  }

  80%,
  100% {
    opacity: 0;
  }
}

@-webkit-keyframes pulse-dot {
  0% {
    transform: scale(0.8);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.8);
  }
}

@keyframes pulse-dot {
  0% {
    transform: scale(0.8);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.8);
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
</style>