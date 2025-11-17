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
    var Version = IDL.Record({
        "major": IDL.Nat32,
        "minor": IDL.Nat32,
        "patch": IDL.Nat32
    });
    var Category = IDL.Variant({
        "System": IDL.Null,
        "Vault": IDL.Null
    });
    var AdminAppCreateBackendRequest = IDL.Record({
        "logo": IDL.Text,
        "name": IDL.Text,
        "description": IDL.Text,
        "version": Version,
        "app_id": IDL.Text,
        "category": Category,
        "backend_data_hash": IDL.Text,
        "backend_data": IDL.Vec(IDL.Nat8)
    });
    var AppVersionStatus = IDL.Variant({
        "NEW": IDL.Null,
        "REJECTED": IDL.Null,
        "SUBMITTED": IDL.Null,
        "REVOKED": IDL.Null,
        "RELEASED": IDL.Null,
        "APPROVED": IDL.Null
    });
    var CanisterType = IDL.Variant({
        "BACKEND": IDL.Null,
        "ASSET": IDL.Null
    });
    var Wasm = IDL.Record({
        "canister_id": IDL.Principal,
        "version": Version,
        "app_id": IDL.Text,
        "canister_type": CanisterType
    });
    var AppVersion = IDL.Record({
        "status": AppVersionStatus,
        "wasm": IDL.Opt(Wasm),
        "version": Version,
        "app_id": IDL.Text,
        "file_id": IDL.Principal
    });
    var EgoError = IDL.Record({
        "msg": IDL.Text,
        "code": IDL.Nat16
    });
    var Result = IDL.Variant({
        "Ok": AppVersion,
        "Err": EgoError
    });
    var AppVersionSetFrontendAddressRequest = IDL.Record({
        "canister_id": IDL.Principal,
        "version": Version,
        "app_id": IDL.Text
    });
    var Result_1 = IDL.Variant({
        "Ok": IDL.Bool,
        "Err": EgoError
    });
    var AppVersionUploadWasmRequest = IDL.Record({
        "data": IDL.Vec(IDL.Nat8),
        "hash": IDL.Text,
        "version": Version,
        "app_id": IDL.Text
    });
    var App = IDL.Record({
        "logo": IDL.Text,
        "name": IDL.Text,
        "description": IDL.Text,
        "app_id": IDL.Text,
        "app_hash": IDL.Text,
        "category": Category,
        "current_version": Version,
        "price": IDL.Float32
    });
    var EgoDevApp = IDL.Record({
        "app": App,
        "developer_id": IDL.Principal,
        "versions": IDL.Vec(AppVersion),
        "audit_version": IDL.Opt(Version)
    });
    var Result_2 = IDL.Variant({
        "Ok": IDL.Vec(EgoDevApp),
        "Err": EgoError
    });
    var Result_3 = IDL.Variant({
        "Ok": IDL.Nat,
        "Err": IDL.Text
    });
    var Result_4 = IDL.Variant({
        "Ok": EgoDevApp,
        "Err": EgoError
    });
    var AppMainNewRequest = IDL.Record({
        "logo": IDL.Text,
        "name": IDL.Text,
        "description": IDL.Text,
        "app_id": IDL.Text,
        "category": Category,
        "price": IDL.Float32
    });
    var Developer = IDL.Record({
        "name": IDL.Text,
        "is_app_auditor": IDL.Bool,
        "developer_id": IDL.Principal,
        "created_apps": IDL.Vec(IDL.Text),
        "is_manager": IDL.Bool
    });
    var Result_5 = IDL.Variant({
        "Ok": Developer,
        "Err": EgoError
    });
    var Result_6 = IDL.Variant({
        "Ok": IDL.Null,
        "Err": IDL.Text
    });
    var CycleRecord = IDL.Record({
        "ts": IDL.Nat64,
        "balance": IDL.Nat
    });
    var Result_7 = IDL.Variant({
        "Ok": IDL.Vec(CycleRecord),
        "Err": IDL.Text
    });
    var CycleInfo = IDL.Record({
        "records": IDL.Vec(CycleRecord),
        "estimate_remaining": IDL.Nat64
    });
    var Result_8 = IDL.Variant({
        "Ok": CycleInfo,
        "Err": IDL.Text
    });
    var Result_9 = IDL.Variant({
        "Ok": IDL.Bool,
        "Err": IDL.Text
    });
    var Result_10 = IDL.Variant({
        "Ok": IDL.Vec(IDL.Text),
        "Err": IDL.Text
    });
    var Result_11 = IDL.Variant({
        "Ok": IDL.Vec(Developer),
        "Err": EgoError
    });
    var UserRoleSetRequest = IDL.Record({
        "user_id": IDL.Principal,
        "is_app_auditor": IDL.Bool,
        "is_manager": IDL.Bool
    });
    return IDL.Service({
        "admin_app_create": IDL.Func([
            AdminAppCreateBackendRequest
        ], [
            Result
        ], []),
        "app_version_approve": IDL.Func([
            IDL.Text,
            Version
        ], [
            Result
        ], []),
        "app_version_new": IDL.Func([
            IDL.Text,
            Version
        ], [
            Result
        ], []),
        "app_version_reject": IDL.Func([
            IDL.Text,
            Version
        ], [
            Result
        ], []),
        "app_version_release": IDL.Func([
            IDL.Text,
            Version
        ], [
            Result
        ], []),
        "app_version_revoke": IDL.Func([
            IDL.Text,
            Version
        ], [
            Result
        ], []),
        "app_version_set_frontend_address": IDL.Func([
            AppVersionSetFrontendAddressRequest
        ], [
            Result_1
        ], []),
        "app_version_submit": IDL.Func([
            IDL.Text,
            Version
        ], [
            Result
        ], []),
        "app_version_upload_wasm": IDL.Func([
            AppVersionUploadWasmRequest
        ], [
            Result_1
        ], []),
        "app_version_wait_for_audit": IDL.Func([], [
            Result_2
        ], [
            "query"
        ]),
        "balance_get": IDL.Func([], [
            Result_3
        ], [
            "query"
        ]),
        "developer_app_get": IDL.Func([
            IDL.Text
        ], [
            Result_4
        ], [
            "query"
        ]),
        "developer_app_list": IDL.Func([], [
            Result_2
        ], [
            "query"
        ]),
        "developer_app_new": IDL.Func([
            AppMainNewRequest
        ], [
            Result_4
        ], []),
        "developer_main_get": IDL.Func([], [
            Result_5
        ], [
            "query"
        ]),
        "developer_main_register": IDL.Func([
            IDL.Text
        ], [
            Result_5
        ], []),
        "ego_canister_add": IDL.Func([
            IDL.Text,
            IDL.Principal
        ], [
            Result_6
        ], []),
        "ego_controller_add": IDL.Func([
            IDL.Principal
        ], [
            Result_6
        ], []),
        "ego_controller_remove": IDL.Func([
            IDL.Principal
        ], [
            Result_6
        ], []),
        "ego_controller_set": IDL.Func([
            IDL.Vec(IDL.Principal)
        ], [
            Result_6
        ], []),
        "ego_cycle_check": IDL.Func([], [
            Result_6
        ], []),
        "ego_cycle_estimate_set": IDL.Func([
            IDL.Nat64
        ], [
            Result_6
        ], []),
        "ego_cycle_history": IDL.Func([], [
            Result_7
        ], [
            "query"
        ]),
        "ego_cycle_info": IDL.Func([], [
            Result_8
        ], []),
        "ego_cycle_recharge": IDL.Func([
            IDL.Nat
        ], [
            Result_6
        ], []),
        "ego_cycle_threshold_get": IDL.Func([], [
            Result_3
        ], []),
        "ego_is_owner": IDL.Func([], [
            Result_9
        ], [
            "query"
        ]),
        "ego_is_user": IDL.Func([], [
            Result_9
        ], [
            "query"
        ]),
        "ego_log_list": IDL.Func([
            IDL.Nat64
        ], [
            Result_10
        ], [
            "query"
        ]),
        "ego_op_add": IDL.Func([
            IDL.Principal
        ], [
            Result_6
        ], []),
        "ego_owner_add": IDL.Func([
            IDL.Principal
        ], [
            Result_6
        ], []),
        "ego_owner_add_with_name": IDL.Func([
            IDL.Text,
            IDL.Principal
        ], [
            Result_6
        ], []),
        "ego_owner_remove": IDL.Func([
            IDL.Principal
        ], [
            Result_6
        ], []),
        "ego_owner_set": IDL.Func([
            IDL.Vec(IDL.Principal)
        ], [
            Result_6
        ], []),
        "ego_runtime_cycle_threshold_get": IDL.Func([], [
            Result_3
        ], []),
        "ego_user_add": IDL.Func([
            IDL.Principal
        ], [
            Result_6
        ], []),
        "ego_user_remove": IDL.Func([
            IDL.Principal
        ], [
            Result_6
        ], []),
        "ego_user_set": IDL.Func([
            IDL.Vec(IDL.Principal)
        ], [
            Result_6
        ], []),
        "user_main_list": IDL.Func([
            IDL.Text
        ], [
            Result_11
        ], [
            "query"
        ]),
        "user_role_set": IDL.Func([
            UserRoleSetRequest
        ], [
            Result_1
        ], [])
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
