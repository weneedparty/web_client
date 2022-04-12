import { computed, reactive } from "vue";

import * as accountService from './generated_grpc/account_service_pb_service'
import * as accountInputAndOutput from './generated_grpc/account_service_pb'

import * as roomControlService from './generated_grpc/room_control_service_pb_service'
import * as roomControlInputAndOutput from './generated_grpc/room_control_service_pb'

import * as localStorage from 'local-storage'

import * as webGrpc from "@improbable-eng/grpc-web";

import { router } from './router'

import { Dialog, Toast } from "vant"

// const grpcHostUrl = 'http://106.52.12.33'
const grpcHostUrl = 'http://127.0.0.1'
const accountGrpcPort = "40056"
const roomControlGrpcPort = "40057"

export const variables = reactive({
    routesMap: {
        home: "/home",
        login: "/login",
        about: "/about",
    },
    accountService: (new accountService.AccountServiceClient(
        grpcHostUrl + ":" + accountGrpcPort,
    )) as accountService.AccountServiceClient,
    roomControlService: (new roomControlService.RoomControlServiceClient(
        grpcHostUrl + ":" + roomControlGrpcPort,
    )) as roomControlService.RoomControlServiceClient,
    inputAndOutput: {
        accountInputAndOutput: accountInputAndOutput,
        roomControlInputAndOutput: roomControlInputAndOutput,
    },
    localStorage: localStorage,
    jwtMetaData: computed(() => {
        return new webGrpc.grpc.Metadata({
            "jwt": localStorage.get("jwt"),
        });
    })
});

export const functions = reactive({
    basic: {
        jsonToObj(json: string) {
            return JSON.parse(json)
        },
        objToJson(obj: any) {
            return JSON.stringify(obj)
        },
        dateToTimestamp(date: Date | string) {
            if (typeof date === "string") {
                date = new Date(date)
            }
            return date.getTime()
        },
        timestampToString(timestamp: number | null) {
            if (timestamp === null) {
                return ""
            }
            return new Date(timestamp).toLocaleString()
        },
        timestampToDateString(timestamp: number | null) {
            if (timestamp === null) {
                return ""
            }
            return new Date(timestamp).toLocaleDateString()
        },
        log: (msg: any) => {
            console.log(msg)
        },
        showToast: (msg: string, nextThingToDo: () => Promise<void> = async () => { }) => {
            Dialog.alert({
                // title: 'Title',
                message: msg,
                theme: 'round-button',
                confirmButtonText: 'Confirm',
            }).then(async () => {
                // on close
                await nextThingToDo()
            });
        },
        openALink: (url: string) => {
            window.open(url)
        },
    },
    pages: {
        loadingOn: () => {
            Toast.loading({
                message: 'Loading...',
                forbidClick: true,
                overlay: true,
            });
        },
        loadingOff: () => {
            Toast.clear();
        },
        jumpToLoginPageIfItMust: (nextThingToDoIfStayAtCurrentPage: () => Promise<void> = async () => { }) => {
            functions.pages.loadingOn()

            const jwt = variables.localStorage.get("jwt")
            if (jwt) {
                const jwtVerifyRequest = new variables.inputAndOutput.accountInputAndOutput.JWTIsOKRequest();
                jwtVerifyRequest.setJwt(String(jwt));

                variables.accountService.jWTIsOK(jwtVerifyRequest,
                    async (err, res) => {
                        if (err) {
                            console.error(err);
                            functions.pages.switchPage(variables.routesMap.login)
                        } else {
                            if (!res?.getOk()) {
                                functions.pages.switchPage(variables.routesMap.login)
                            } else {
                                const email = res.getEmail();
                                variables.localStorage.set("email", email)
                                await nextThingToDoIfStayAtCurrentPage()
                            }
                        }
                        functions.pages.loadingOff()
                    })
            }
        },
        switchPage: (page: string, query?: any) => {
            if (query) {
                router.push({ path: page, query })
            } else {
                router.push(page)
            }
        },
    },
})

export default {
    variables,
    functions
}