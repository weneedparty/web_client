// package: room_control_service
// file: room_control_service.proto

import * as room_control_service_pb from "./room_control_service_pb";
import {grpc} from "@improbable-eng/grpc-web";

type RoomControlServiceSayHello = {
  readonly methodName: string;
  readonly service: typeof RoomControlService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof room_control_service_pb.HelloRequest;
  readonly responseType: typeof room_control_service_pb.HelloReply;
};

type RoomControlServiceCreateRoom = {
  readonly methodName: string;
  readonly service: typeof RoomControlService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof room_control_service_pb.CreateRoomRequest;
  readonly responseType: typeof room_control_service_pb.CreateRoomResponse;
};

type RoomControlServiceAllowJoin = {
  readonly methodName: string;
  readonly service: typeof RoomControlService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof room_control_service_pb.AllowJoinRequest;
  readonly responseType: typeof room_control_service_pb.AllowJoinResponse;
};

type RoomControlServiceListRooms = {
  readonly methodName: string;
  readonly service: typeof RoomControlService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof room_control_service_pb.ListRoomsRequest;
  readonly responseType: typeof room_control_service_pb.ListRoomsResponse;
};

type RoomControlServiceDeleteRoom = {
  readonly methodName: string;
  readonly service: typeof RoomControlService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof room_control_service_pb.DeleteRoomRequest;
  readonly responseType: typeof room_control_service_pb.DeleteRoomResponse;
};

export class RoomControlService {
  static readonly serviceName: string;
  static readonly SayHello: RoomControlServiceSayHello;
  static readonly CreateRoom: RoomControlServiceCreateRoom;
  static readonly AllowJoin: RoomControlServiceAllowJoin;
  static readonly ListRooms: RoomControlServiceListRooms;
  static readonly DeleteRoom: RoomControlServiceDeleteRoom;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class RoomControlServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  sayHello(
    requestMessage: room_control_service_pb.HelloRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: room_control_service_pb.HelloReply|null) => void
  ): UnaryResponse;
  sayHello(
    requestMessage: room_control_service_pb.HelloRequest,
    callback: (error: ServiceError|null, responseMessage: room_control_service_pb.HelloReply|null) => void
  ): UnaryResponse;
  createRoom(
    requestMessage: room_control_service_pb.CreateRoomRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: room_control_service_pb.CreateRoomResponse|null) => void
  ): UnaryResponse;
  createRoom(
    requestMessage: room_control_service_pb.CreateRoomRequest,
    callback: (error: ServiceError|null, responseMessage: room_control_service_pb.CreateRoomResponse|null) => void
  ): UnaryResponse;
  allowJoin(
    requestMessage: room_control_service_pb.AllowJoinRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: room_control_service_pb.AllowJoinResponse|null) => void
  ): UnaryResponse;
  allowJoin(
    requestMessage: room_control_service_pb.AllowJoinRequest,
    callback: (error: ServiceError|null, responseMessage: room_control_service_pb.AllowJoinResponse|null) => void
  ): UnaryResponse;
  listRooms(
    requestMessage: room_control_service_pb.ListRoomsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: room_control_service_pb.ListRoomsResponse|null) => void
  ): UnaryResponse;
  listRooms(
    requestMessage: room_control_service_pb.ListRoomsRequest,
    callback: (error: ServiceError|null, responseMessage: room_control_service_pb.ListRoomsResponse|null) => void
  ): UnaryResponse;
  deleteRoom(
    requestMessage: room_control_service_pb.DeleteRoomRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: room_control_service_pb.DeleteRoomResponse|null) => void
  ): UnaryResponse;
  deleteRoom(
    requestMessage: room_control_service_pb.DeleteRoomRequest,
    callback: (error: ServiceError|null, responseMessage: room_control_service_pb.DeleteRoomResponse|null) => void
  ): UnaryResponse;
}

