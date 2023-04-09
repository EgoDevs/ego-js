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
    var Result = IDL.Variant({
        "Ok": IDL.Nat,
        "Err": IDL.Text
    });
    var Result_1 = IDL.Variant({
        "Ok": IDL.Null,
        "Err": IDL.Text
    });
    var CycleRecord = IDL.Record({
        "ts": IDL.Nat64,
        "balance": IDL.Nat
    });
    var Result_2 = IDL.Variant({
        "Ok": IDL.Vec(CycleRecord),
        "Err": IDL.Text
    });
    var CycleInfo = IDL.Record({
        "records": IDL.Vec(CycleRecord),
        "estimate_remaining": IDL.Nat64
    });
    var Result_3 = IDL.Variant({
        "Ok": CycleInfo,
        "Err": IDL.Text
    });
    var Result_4 = IDL.Variant({
        "Ok": IDL.Bool,
        "Err": IDL.Text
    });
    var Result_5 = IDL.Variant({
        "Ok": IDL.Vec(IDL.Text),
        "Err": IDL.Text
    });
    var LedgerMainInitRequest = IDL.Record({
        "start": IDL.Nat64
    });
    var EgoError = IDL.Record({
        "msg": IDL.Text,
        "code": IDL.Nat16
    });
    var Result_6 = IDL.Variant({
        "Ok": IDL.Null,
        "Err": EgoError
    });
    var Tokens = IDL.Record({
        "e8s": IDL.Nat64
    });
    var LedgerPaymentAddRequest = IDL.Record({
        "to": IDL.Vec(IDL.Nat8),
        "from": IDL.Vec(IDL.Nat8),
        "memo": IDL.Nat64,
        "amount": Tokens
    });
    var PaymentStatus = IDL.Variant({
        "NOTIFIED": IDL.Null,
        "PENDING": IDL.Null,
        "CONFIRMED": IDL.Null
    });
    var Payment = IDL.Record({
        "to": IDL.Vec(IDL.Nat8),
        "status": PaymentStatus,
        "from": IDL.Vec(IDL.Nat8),
        "memo": IDL.Nat64,
        "amount": Tokens
    });
    var Result_7 = IDL.Variant({
        "Ok": IDL.Vec(Payment),
        "Err": EgoError
    });
    return IDL.Service({
        "balance_get": IDL.Func([], [
            Result
        ], [
            "query"
        ]),
        "ego_canister_add": IDL.Func([
            IDL.Text,
            IDL.Principal
        ], [
            Result_1
        ], []),
        "ego_controller_add": IDL.Func([
            IDL.Principal
        ], [
            Result_1
        ], []),
        "ego_controller_remove": IDL.Func([
            IDL.Principal
        ], [
            Result_1
        ], []),
        "ego_controller_set": IDL.Func([
            IDL.Vec(IDL.Principal)
        ], [
            Result_1
        ], []),
        "ego_cycle_check": IDL.Func([], [
            Result_1
        ], []),
        "ego_cycle_estimate_set": IDL.Func([
            IDL.Nat64
        ], [
            Result_1
        ], []),
        "ego_cycle_history": IDL.Func([], [
            Result_2
        ], [
            "query"
        ]),
        "ego_cycle_info": IDL.Func([], [
            Result_3
        ], []),
        "ego_cycle_recharge": IDL.Func([
            IDL.Nat
        ], [
            Result_1
        ], []),
        "ego_cycle_threshold_get": IDL.Func([], [
            Result
        ], []),
        "ego_is_owner": IDL.Func([], [
            Result_4
        ], [
            "query"
        ]),
        "ego_is_user": IDL.Func([], [
            Result_4
        ], [
            "query"
        ]),
        "ego_log_list": IDL.Func([
            IDL.Nat64
        ], [
            Result_5
        ], [
            "query"
        ]),
        "ego_op_add": IDL.Func([
            IDL.Principal
        ], [
            Result_1
        ], []),
        "ego_owner_add": IDL.Func([
            IDL.Principal
        ], [
            Result_1
        ], []),
        "ego_owner_add_with_name": IDL.Func([
            IDL.Text,
            IDL.Principal
        ], [
            Result_1
        ], []),
        "ego_owner_remove": IDL.Func([
            IDL.Principal
        ], [
            Result_1
        ], []),
        "ego_owner_set": IDL.Func([
            IDL.Vec(IDL.Principal)
        ], [
            Result_1
        ], []),
        "ego_runtime_cycle_threshold_get": IDL.Func([], [
            Result
        ], []),
        "ego_user_add": IDL.Func([
            IDL.Principal
        ], [
            Result_1
        ], []),
        "ego_user_remove": IDL.Func([
            IDL.Principal
        ], [
            Result_1
        ], []),
        "ego_user_set": IDL.Func([
            IDL.Vec(IDL.Principal)
        ], [
            Result_1
        ], []),
        "ledger_main_init": IDL.Func([
            LedgerMainInitRequest
        ], [
            Result_6
        ], []),
        "ledger_payment_add": IDL.Func([
            LedgerPaymentAddRequest
        ], [
            Result_6
        ], []),
        "ledger_payment_list": IDL.Func([], [
            Result_7
        ], []),
        "message_main_notify": IDL.Func([], [], [])
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
