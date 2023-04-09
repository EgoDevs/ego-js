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
    var AdminAppCreateRequest = IDL.Record({
        "logo": IDL.Text,
        "name": IDL.Text,
        "description": IDL.Text,
        "version": Version,
        "app_id": IDL.Text,
        "category": Category,
        "backend_data_hash": IDL.Text,
        "backend_data": IDL.Vec(IDL.Nat8)
    });
    var EgoError = IDL.Record({
        "msg": IDL.Text,
        "code": IDL.Nat16
    });
    var Result = IDL.Variant({
        "Ok": IDL.Null,
        "Err": EgoError
    });
    var AdminWalletCycleRechargeRequest = IDL.Record({
        "cycle": IDL.Nat,
        "comment": IDL.Text,
        "wallet_id": IDL.Principal
    });
    var AdminWalletProviderAddRequest = IDL.Record({
        "wallet_provider": IDL.Principal,
        "wallet_app_id": IDL.Text
    });
    var Result_1 = IDL.Variant({
        "Ok": IDL.Nat,
        "Err": IDL.Text
    });
    var Result_2 = IDL.Variant({
        "Ok": IDL.Null,
        "Err": IDL.Text
    });
    var CycleRecord = IDL.Record({
        "ts": IDL.Nat64,
        "balance": IDL.Nat
    });
    var Result_3 = IDL.Variant({
        "Ok": IDL.Vec(CycleRecord),
        "Err": IDL.Text
    });
    var CycleInfo = IDL.Record({
        "records": IDL.Vec(CycleRecord),
        "estimate_remaining": IDL.Nat64
    });
    var Result_4 = IDL.Variant({
        "Ok": CycleInfo,
        "Err": IDL.Text
    });
    var Result_5 = IDL.Variant({
        "Ok": IDL.Bool,
        "Err": IDL.Text
    });
    var Result_6 = IDL.Variant({
        "Ok": IDL.Vec(IDL.Text),
        "Err": IDL.Text
    });
    return IDL.Service({
        "admin_app_create": IDL.Func([
            AdminAppCreateRequest
        ], [
            Result
        ], []),
        "admin_wallet_cycle_recharge": IDL.Func([
            AdminWalletCycleRechargeRequest
        ], [
            Result
        ], []),
        "admin_wallet_order_new": IDL.Func([
            IDL.Float32
        ], [
            Result
        ], []),
        "admin_wallet_provider_add": IDL.Func([
            AdminWalletProviderAddRequest
        ], [
            Result
        ], []),
        "balance_get": IDL.Func([], [
            Result_1
        ], [
            "query"
        ]),
        "canister_main_track": IDL.Func([], [], []),
        "canister_relation_update": IDL.Func([
            IDL.Text
        ], [], []),
        "ego_canister_add": IDL.Func([
            IDL.Text,
            IDL.Principal
        ], [
            Result_2
        ], []),
        "ego_controller_add": IDL.Func([
            IDL.Principal
        ], [
            Result_2
        ], []),
        "ego_controller_remove": IDL.Func([
            IDL.Principal
        ], [
            Result_2
        ], []),
        "ego_controller_set": IDL.Func([
            IDL.Vec(IDL.Principal)
        ], [
            Result_2
        ], []),
        "ego_cycle_check": IDL.Func([], [
            Result_2
        ], []),
        "ego_cycle_estimate_set": IDL.Func([
            IDL.Nat64
        ], [
            Result_2
        ], []),
        "ego_cycle_history": IDL.Func([], [
            Result_3
        ], [
            "query"
        ]),
        "ego_cycle_info": IDL.Func([], [
            Result_4
        ], []),
        "ego_cycle_recharge": IDL.Func([
            IDL.Nat
        ], [
            Result_2
        ], []),
        "ego_cycle_threshold_get": IDL.Func([], [
            Result_1
        ], []),
        "ego_is_owner": IDL.Func([], [
            Result_5
        ], [
            "query"
        ]),
        "ego_is_user": IDL.Func([], [
            Result_5
        ], [
            "query"
        ]),
        "ego_log_list": IDL.Func([
            IDL.Nat64
        ], [
            Result_6
        ], [
            "query"
        ]),
        "ego_op_add": IDL.Func([
            IDL.Principal
        ], [
            Result_2
        ], []),
        "ego_owner_add": IDL.Func([
            IDL.Principal
        ], [
            Result_2
        ], []),
        "ego_owner_add_with_name": IDL.Func([
            IDL.Text,
            IDL.Principal
        ], [
            Result_2
        ], []),
        "ego_owner_remove": IDL.Func([
            IDL.Principal
        ], [
            Result_2
        ], []),
        "ego_owner_set": IDL.Func([
            IDL.Vec(IDL.Principal)
        ], [
            Result_2
        ], []),
        "ego_runtime_cycle_threshold_get": IDL.Func([], [
            Result_1
        ], []),
        "ego_user_add": IDL.Func([
            IDL.Principal
        ], [
            Result_2
        ], []),
        "ego_user_remove": IDL.Func([
            IDL.Principal
        ], [
            Result_2
        ], []),
        "ego_user_set": IDL.Func([
            IDL.Vec(IDL.Principal)
        ], [
            Result_2
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
