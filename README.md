# weloveparty-web

## generate grpc
```bash
yarn add grpc-tools --ignore-scripts

yarn add ts-protoc-gen@next -D

pushd node_modules/grpc-tools
node_modules/.bin/node-pre-gyp install --target_arch=x64
popd

yarn add @improbable-eng/grpc-web

mkdir -p src/generated_grpc

PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
PROTOC_GEN_GRPC_PATH="./node_modules/.bin/grpc_tools_node_protoc_plugin"
OUT_DIR="./src/generated_grpc"

protoc \
    --proto_path ../party_protocals/protocols \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --plugin=protoc-gen-grpc=${PROTOC_GEN_GRPC_PATH} \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="service=grpc-web,mode=grpc-js:${OUT_DIR}" \
    --grpc_out="grpc_js:${OUT_DIR}" \
    account_service.proto room_control_service.proto
```