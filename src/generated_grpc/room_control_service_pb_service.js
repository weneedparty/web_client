// package: room_control_service
// file: room_control_service.proto

var room_control_service_pb = require("./room_control_service_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var RoomControlService = (function () {
  function RoomControlService() {}
  RoomControlService.serviceName = "room_control_service.RoomControlService";
  return RoomControlService;
}());

RoomControlService.SayHello = {
  methodName: "SayHello",
  service: RoomControlService,
  requestStream: false,
  responseStream: false,
  requestType: room_control_service_pb.HelloRequest,
  responseType: room_control_service_pb.HelloReply
};

RoomControlService.CreateRoom = {
  methodName: "CreateRoom",
  service: RoomControlService,
  requestStream: false,
  responseStream: false,
  requestType: room_control_service_pb.CreateRoomRequest,
  responseType: room_control_service_pb.CreateRoomResponse
};

RoomControlService.AllowJoin = {
  methodName: "AllowJoin",
  service: RoomControlService,
  requestStream: false,
  responseStream: false,
  requestType: room_control_service_pb.AllowJoinRequest,
  responseType: room_control_service_pb.AllowJoinResponse
};

RoomControlService.ListRooms = {
  methodName: "ListRooms",
  service: RoomControlService,
  requestStream: false,
  responseStream: false,
  requestType: room_control_service_pb.ListRoomsRequest,
  responseType: room_control_service_pb.ListRoomsResponse
};

RoomControlService.DeleteRoom = {
  methodName: "DeleteRoom",
  service: RoomControlService,
  requestStream: false,
  responseStream: false,
  requestType: room_control_service_pb.DeleteRoomRequest,
  responseType: room_control_service_pb.DeleteRoomResponse
};

exports.RoomControlService = RoomControlService;

function RoomControlServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

RoomControlServiceClient.prototype.sayHello = function sayHello(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RoomControlService.SayHello, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RoomControlServiceClient.prototype.createRoom = function createRoom(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RoomControlService.CreateRoom, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RoomControlServiceClient.prototype.allowJoin = function allowJoin(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RoomControlService.AllowJoin, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RoomControlServiceClient.prototype.listRooms = function listRooms(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RoomControlService.ListRooms, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RoomControlServiceClient.prototype.deleteRoom = function deleteRoom(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RoomControlService.DeleteRoom, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.RoomControlServiceClient = RoomControlServiceClient;

