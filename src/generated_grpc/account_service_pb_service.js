// package: account_service
// file: account_service.proto

var account_service_pb = require("./account_service_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var AccountService = (function () {
  function AccountService() {}
  AccountService.serviceName = "account_service.AccountService";
  return AccountService;
}());

AccountService.SayHello = {
  methodName: "SayHello",
  service: AccountService,
  requestStream: false,
  responseStream: false,
  requestType: account_service_pb.HelloRequest,
  responseType: account_service_pb.HelloReply
};

AccountService.UserRegisterRequest = {
  methodName: "UserRegisterRequest",
  service: AccountService,
  requestStream: false,
  responseStream: false,
  requestType: account_service_pb.RegisterRequest,
  responseType: account_service_pb.RegisterReply
};

AccountService.UserRegisterConfirm = {
  methodName: "UserRegisterConfirm",
  service: AccountService,
  requestStream: false,
  responseStream: false,
  requestType: account_service_pb.RegisterConfirmRequest,
  responseType: account_service_pb.RegisterConfirmReply
};

AccountService.JWTIsOK = {
  methodName: "JWTIsOK",
  service: AccountService,
  requestStream: false,
  responseStream: false,
  requestType: account_service_pb.JWTIsOKRequest,
  responseType: account_service_pb.JWTIsOKReply
};

exports.AccountService = AccountService;

function AccountServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

AccountServiceClient.prototype.sayHello = function sayHello(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AccountService.SayHello, {
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

AccountServiceClient.prototype.userRegisterRequest = function userRegisterRequest(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AccountService.UserRegisterRequest, {
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

AccountServiceClient.prototype.userRegisterConfirm = function userRegisterConfirm(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AccountService.UserRegisterConfirm, {
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

AccountServiceClient.prototype.jWTIsOK = function jWTIsOK(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AccountService.JWTIsOK, {
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

exports.AccountServiceClient = AccountServiceClient;

