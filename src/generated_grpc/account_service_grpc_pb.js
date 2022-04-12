// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var account_service_pb = require('./account_service_pb.js');

function serialize_account_service_HelloReply(arg) {
  if (!(arg instanceof account_service_pb.HelloReply)) {
    throw new Error('Expected argument of type account_service.HelloReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_account_service_HelloReply(buffer_arg) {
  return account_service_pb.HelloReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_account_service_HelloRequest(arg) {
  if (!(arg instanceof account_service_pb.HelloRequest)) {
    throw new Error('Expected argument of type account_service.HelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_account_service_HelloRequest(buffer_arg) {
  return account_service_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_account_service_JWTIsOKReply(arg) {
  if (!(arg instanceof account_service_pb.JWTIsOKReply)) {
    throw new Error('Expected argument of type account_service.JWTIsOKReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_account_service_JWTIsOKReply(buffer_arg) {
  return account_service_pb.JWTIsOKReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_account_service_JWTIsOKRequest(arg) {
  if (!(arg instanceof account_service_pb.JWTIsOKRequest)) {
    throw new Error('Expected argument of type account_service.JWTIsOKRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_account_service_JWTIsOKRequest(buffer_arg) {
  return account_service_pb.JWTIsOKRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_account_service_RegisterConfirmReply(arg) {
  if (!(arg instanceof account_service_pb.RegisterConfirmReply)) {
    throw new Error('Expected argument of type account_service.RegisterConfirmReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_account_service_RegisterConfirmReply(buffer_arg) {
  return account_service_pb.RegisterConfirmReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_account_service_RegisterConfirmRequest(arg) {
  if (!(arg instanceof account_service_pb.RegisterConfirmRequest)) {
    throw new Error('Expected argument of type account_service.RegisterConfirmRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_account_service_RegisterConfirmRequest(buffer_arg) {
  return account_service_pb.RegisterConfirmRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_account_service_RegisterReply(arg) {
  if (!(arg instanceof account_service_pb.RegisterReply)) {
    throw new Error('Expected argument of type account_service.RegisterReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_account_service_RegisterReply(buffer_arg) {
  return account_service_pb.RegisterReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_account_service_RegisterRequest(arg) {
  if (!(arg instanceof account_service_pb.RegisterRequest)) {
    throw new Error('Expected argument of type account_service.RegisterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_account_service_RegisterRequest(buffer_arg) {
  return account_service_pb.RegisterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var AccountServiceService = exports.AccountServiceService = {
  sayHello: {
    path: '/account_service.AccountService/SayHello',
    requestStream: false,
    responseStream: false,
    requestType: account_service_pb.HelloRequest,
    responseType: account_service_pb.HelloReply,
    requestSerialize: serialize_account_service_HelloRequest,
    requestDeserialize: deserialize_account_service_HelloRequest,
    responseSerialize: serialize_account_service_HelloReply,
    responseDeserialize: deserialize_account_service_HelloReply,
  },
  userRegisterRequest: {
    path: '/account_service.AccountService/UserRegisterRequest',
    requestStream: false,
    responseStream: false,
    requestType: account_service_pb.RegisterRequest,
    responseType: account_service_pb.RegisterReply,
    requestSerialize: serialize_account_service_RegisterRequest,
    requestDeserialize: deserialize_account_service_RegisterRequest,
    responseSerialize: serialize_account_service_RegisterReply,
    responseDeserialize: deserialize_account_service_RegisterReply,
  },
  userRegisterConfirm: {
    path: '/account_service.AccountService/UserRegisterConfirm',
    requestStream: false,
    responseStream: false,
    requestType: account_service_pb.RegisterConfirmRequest,
    responseType: account_service_pb.RegisterConfirmReply,
    requestSerialize: serialize_account_service_RegisterConfirmRequest,
    requestDeserialize: deserialize_account_service_RegisterConfirmRequest,
    responseSerialize: serialize_account_service_RegisterConfirmReply,
    responseDeserialize: deserialize_account_service_RegisterConfirmReply,
  },
  jWTIsOK: {
    path: '/account_service.AccountService/JWTIsOK',
    requestStream: false,
    responseStream: false,
    requestType: account_service_pb.JWTIsOKRequest,
    responseType: account_service_pb.JWTIsOKReply,
    requestSerialize: serialize_account_service_JWTIsOKRequest,
    requestDeserialize: deserialize_account_service_JWTIsOKRequest,
    responseSerialize: serialize_account_service_JWTIsOKReply,
    responseDeserialize: deserialize_account_service_JWTIsOKReply,
  },
};

exports.AccountServiceClient = grpc.makeGenericClientConstructor(AccountServiceService);
