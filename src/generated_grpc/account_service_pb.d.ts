// package: account_service
// file: account_service.proto

import * as jspb from "google-protobuf";

export class HelloRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HelloRequest.AsObject;
  static toObject(includeInstance: boolean, msg: HelloRequest): HelloRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HelloRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HelloRequest;
  static deserializeBinaryFromReader(message: HelloRequest, reader: jspb.BinaryReader): HelloRequest;
}

export namespace HelloRequest {
  export type AsObject = {
    name: string,
  }
}

export class HelloReply extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HelloReply.AsObject;
  static toObject(includeInstance: boolean, msg: HelloReply): HelloReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HelloReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HelloReply;
  static deserializeBinaryFromReader(message: HelloReply, reader: jspb.BinaryReader): HelloReply;
}

export namespace HelloReply {
  export type AsObject = {
    message: string,
  }
}

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class RegisterRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterRequest): RegisterRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterRequest;
  static deserializeBinaryFromReader(message: RegisterRequest, reader: jspb.BinaryReader): RegisterRequest;
}

export namespace RegisterRequest {
  export type AsObject = {
    email: string,
  }
}

export class RegisterReply extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterReply.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterReply): RegisterReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterReply;
  static deserializeBinaryFromReader(message: RegisterReply, reader: jspb.BinaryReader): RegisterReply;
}

export namespace RegisterReply {
  export type AsObject = {
    result: string,
    error: string,
  }
}

export class RegisterConfirmRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  getRandomString(): string;
  setRandomString(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterConfirmRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterConfirmRequest): RegisterConfirmRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterConfirmRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterConfirmRequest;
  static deserializeBinaryFromReader(message: RegisterConfirmRequest, reader: jspb.BinaryReader): RegisterConfirmRequest;
}

export namespace RegisterConfirmRequest {
  export type AsObject = {
    email: string,
    randomString: string,
  }
}

export class JWTObject extends jspb.Message {
  getJwt(): string;
  setJwt(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JWTObject.AsObject;
  static toObject(includeInstance: boolean, msg: JWTObject): JWTObject.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: JWTObject, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JWTObject;
  static deserializeBinaryFromReader(message: JWTObject, reader: jspb.BinaryReader): JWTObject;
}

export namespace JWTObject {
  export type AsObject = {
    jwt: string,
  }
}

export class RegisterConfirmReply extends jspb.Message {
  hasResult(): boolean;
  clearResult(): void;
  getResult(): JWTObject | undefined;
  setResult(value?: JWTObject): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterConfirmReply.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterConfirmReply): RegisterConfirmReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterConfirmReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterConfirmReply;
  static deserializeBinaryFromReader(message: RegisterConfirmReply, reader: jspb.BinaryReader): RegisterConfirmReply;
}

export namespace RegisterConfirmReply {
  export type AsObject = {
    result?: JWTObject.AsObject,
    error: string,
  }
}

export class JWTIsOKRequest extends jspb.Message {
  getJwt(): string;
  setJwt(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JWTIsOKRequest.AsObject;
  static toObject(includeInstance: boolean, msg: JWTIsOKRequest): JWTIsOKRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: JWTIsOKRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JWTIsOKRequest;
  static deserializeBinaryFromReader(message: JWTIsOKRequest, reader: jspb.BinaryReader): JWTIsOKRequest;
}

export namespace JWTIsOKRequest {
  export type AsObject = {
    jwt: string,
  }
}

export class JWTIsOKReply extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JWTIsOKReply.AsObject;
  static toObject(includeInstance: boolean, msg: JWTIsOKReply): JWTIsOKReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: JWTIsOKReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JWTIsOKReply;
  static deserializeBinaryFromReader(message: JWTIsOKReply, reader: jspb.BinaryReader): JWTIsOKReply;
}

export namespace JWTIsOKReply {
  export type AsObject = {
    ok: boolean,
    email: string,
  }
}

