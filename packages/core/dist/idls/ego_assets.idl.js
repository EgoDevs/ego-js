"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    idlFactory () {
        return idlFactory;
    },
    init () {
        return init;
    }
});
var idlFactory = function(param) {
    var IDL = param.IDL;
    var InitArg = IDL.Record({
        "init_caller": IDL.Opt(IDL.Principal)
    });
    var CreateAssetArguments = IDL.Record({
        "key": IDL.Text,
        "content_type": IDL.Text,
        "headers": IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))),
        "max_age": IDL.Opt(IDL.Nat64)
    });
    var UnsetAssetContentArguments = IDL.Record({
        "key": IDL.Text,
        "content_encoding": IDL.Text
    });
    var DeleteAssetArguments = IDL.Record({
        "key": IDL.Text
    });
    var SetAssetContentArguments = IDL.Record({
        "key": IDL.Text,
        "sha256": IDL.Opt(IDL.Vec(IDL.Nat8)),
        "chunk_ids": IDL.Vec(IDL.Nat),
        "content_encoding": IDL.Text
    });
    var BatchOperation = IDL.Variant({
        "CreateAsset": CreateAssetArguments,
        "UnsetAssetContent": UnsetAssetContentArguments,
        "DeleteAsset": DeleteAssetArguments,
        "SetAssetContent": SetAssetContentArguments,
        "Clear": IDL.Record({})
    });
    var CommitBatchArguments = IDL.Record({
        "batch_id": IDL.Nat,
        "operations": IDL.Vec(BatchOperation)
    });
    var CreateBatchResponse = IDL.Record({
        "batch_id": IDL.Nat
    });
    var CreateChunkArg = IDL.Record({
        "content": IDL.Vec(IDL.Nat8),
        "batch_id": IDL.Nat
    });
    var CreateChunkResponse = IDL.Record({
        "chunk_id": IDL.Nat
    });
    var GetArg = IDL.Record({
        "key": IDL.Text,
        "accept_encodings": IDL.Vec(IDL.Text)
    });
    var EncodedAsset = IDL.Record({
        "content": IDL.Vec(IDL.Nat8),
        "sha256": IDL.Opt(IDL.Vec(IDL.Nat8)),
        "content_type": IDL.Text,
        "content_encoding": IDL.Text,
        "total_length": IDL.Nat
    });
    var GetChunkArg = IDL.Record({
        "key": IDL.Text,
        "sha256": IDL.Opt(IDL.Vec(IDL.Nat8)),
        "index": IDL.Nat,
        "content_encoding": IDL.Text
    });
    var GetChunkResponse = IDL.Record({
        "content": IDL.Vec(IDL.Nat8)
    });
    var HttpRequest = IDL.Record({
        "url": IDL.Text,
        "method": IDL.Text,
        "body": IDL.Vec(IDL.Nat8),
        "headers": IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))
    });
    var StreamingStrategy = IDL.Variant({
        "Callback": IDL.Record({
            "token": GetChunkArg,
            "callback": IDL.Func([], [], [])
        })
    });
    var HttpResponse = IDL.Record({
        "body": IDL.Vec(IDL.Nat8),
        "headers": IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
        "streaming_strategy": IDL.Opt(StreamingStrategy),
        "status_code": IDL.Nat16
    });
    var StreamingCallbackHttpResponse = IDL.Record({
        "token": IDL.Opt(GetChunkArg),
        "body": IDL.Vec(IDL.Nat8)
    });
    var AssetEncodingDetails = IDL.Record({
        "modified": IDL.Int,
        "sha256": IDL.Opt(IDL.Vec(IDL.Nat8)),
        "length": IDL.Nat,
        "content_encoding": IDL.Text
    });
    var AssetDetails = IDL.Record({
        "key": IDL.Text,
        "encodings": IDL.Vec(AssetEncodingDetails),
        "content_type": IDL.Text
    });
    var Result = IDL.Variant({
        "Ok": IDL.Vec(IDL.Principal),
        "Err": IDL.Text
    });
    var StoreArg = IDL.Record({
        "key": IDL.Text,
        "content": IDL.Vec(IDL.Nat8),
        "sha256": IDL.Opt(IDL.Vec(IDL.Nat8)),
        "content_type": IDL.Text,
        "content_encoding": IDL.Text
    });
    return IDL.Service({
        "authorize": IDL.Func([
            IDL.Principal
        ], [], []),
        "clear": IDL.Func([], [], []),
        "commit_batch": IDL.Func([
            CommitBatchArguments
        ], [], []),
        "create_asset": IDL.Func([
            CreateAssetArguments
        ], [], []),
        "create_batch": IDL.Func([], [
            CreateBatchResponse
        ], []),
        "create_chunk": IDL.Func([
            CreateChunkArg
        ], [
            CreateChunkResponse
        ], []),
        "delete_asset": IDL.Func([
            DeleteAssetArguments
        ], [], []),
        "drain_authorize": IDL.Func([], [], []),
        "get": IDL.Func([
            GetArg
        ], [
            EncodedAsset
        ], [
            "query"
        ]),
        "get_chunk": IDL.Func([
            GetChunkArg
        ], [
            GetChunkResponse
        ], [
            "query"
        ]),
        "http_request": IDL.Func([
            HttpRequest
        ], [
            HttpResponse
        ], [
            "query"
        ]),
        "http_request_streaming_callback": IDL.Func([
            GetChunkArg
        ], [
            StreamingCallbackHttpResponse
        ], [
            "query"
        ]),
        "list": IDL.Func([], [
            IDL.Vec(AssetDetails)
        ], [
            "query"
        ]),
        "list_authorize": IDL.Func([], [
            Result
        ], [
            "query"
        ]),
        "retrieve": IDL.Func([
            IDL.Text
        ], [
            IDL.Vec(IDL.Nat8)
        ], [
            "query"
        ]),
        "set_asset_content": IDL.Func([
            SetAssetContentArguments
        ], [], []),
        "store": IDL.Func([
            StoreArg
        ], [], []),
        "unset_asset_content": IDL.Func([
            UnsetAssetContentArguments
        ], [], [])
    });
};
var init = function(param) {
    var IDL = param.IDL;
    var InitArg = IDL.Record({
        "init_caller": IDL.Opt(IDL.Principal)
    });
    return [
        InitArg
    ];
};
