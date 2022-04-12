// package: account_service
// file: account_service.proto

import * as account_service_pb from "./account_service_pb";
import {grpc} from "@improbable-eng/grpc-web";

type AccountServiceSayHello = {
  readonly methodName: string;
  readonly service: typeof AccountService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof account_service_pb.HelloRequest;
  readonly responseType: typeof account_service_pb.HelloReply;
};

type AccountServiceUserRegisterRequest = {
  readonly methodName: string;
  readonly service: typeof AccountService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof account_service_pb.RegisterRequest;
  readonly responseType: typeof account_service_pb.RegisterReply;
};

type AccountServiceUserRegisterConfirm = {
  readonly methodName: string;
  readonly service: typeof AccountService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof account_service_pb.RegisterConfirmRequest;
  readonly responseType: typeof account_service_pb.RegisterConfirmReply;
};

type AccountServiceJWTIsOK = {
  readonly methodName: string;
  readonly service: typeof AccountService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof account_service_pb.JWTIsOKRequest;
  readonly responseType: typeof account_service_pb.JWTIsOKReply;
};

export class AccountService {
  static readonly serviceName: string;
  static readonly SayHello: AccountServiceSayHello;
  static readonly UserRegisterRequest: AccountServiceUserRegisterRequest;
  static readonly UserRegisterConfirm: AccountServiceUserRegisterConfirm;
  static readonly JWTIsOK: AccountServiceJWTIsOK;
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

export class AccountServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  sayHello(
    requestMessage: account_service_pb.HelloRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: account_service_pb.HelloReply|null) => void
  ): UnaryResponse;
  sayHello(
    requestMessage: account_service_pb.HelloRequest,
    callback: (error: ServiceError|null, responseMessage: account_service_pb.HelloReply|null) => void
  ): UnaryResponse;
  userRegisterRequest(
    requestMessage: account_service_pb.RegisterRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: account_service_pb.RegisterReply|null) => void
  ): UnaryResponse;
  userRegisterRequest(
    requestMessage: account_service_pb.RegisterRequest,
    callback: (error: ServiceError|null, responseMessage: account_service_pb.RegisterReply|null) => void
  ): UnaryResponse;
  userRegisterConfirm(
    requestMessage: account_service_pb.RegisterConfirmRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: account_service_pb.RegisterConfirmReply|null) => void
  ): UnaryResponse;
  userRegisterConfirm(
    requestMessage: account_service_pb.RegisterConfirmRequest,
    callback: (error: ServiceError|null, responseMessage: account_service_pb.RegisterConfirmReply|null) => void
  ): UnaryResponse;
  jWTIsOK(
    requestMessage: account_service_pb.JWTIsOKRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: account_service_pb.JWTIsOKReply|null) => void
  ): UnaryResponse;
  jWTIsOK(
    requestMessage: account_service_pb.JWTIsOKRequest,
    callback: (error: ServiceError|null, responseMessage: account_service_pb.JWTIsOKReply|null) => void
  ): UnaryResponse;
}

