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
        init_caller: IDL.Opt(IDL.Principal)
    });
    var AdminWalletCycleRechargeRequest = IDL.Record({
        cycle: IDL.Nat,
        comment: IDL.Text,
        wallet_id: IDL.Principal
    });
    var EgoError = IDL.Record({
        msg: IDL.Text,
        code: IDL.Nat16
    });
    var Result = IDL.Variant({
        Ok: IDL.Bool,
        Err: EgoError
    });
    var OrderStatus = IDL.Variant({
        NEW: IDL.Null,
        SUCCESS: IDL.Null
    });
    var Order = IDL.Record({
        to: IDL.Vec(IDL.Nat8),
        status: OrderStatus,
        from: IDL.Vec(IDL.Nat8),
        memo: IDL.Nat64,
        amount: IDL.Float32,
        wallet_id: IDL.Principal
    });
    var Result_1 = IDL.Variant({
        Ok: IDL.Vec(Order),
        Err: EgoError
    });
    var AdminWalletProviderAddRequest = IDL.Record({
        wallet_provider: IDL.Principal,
        wallet_app_id: IDL.Text
    });
    var Result_2 = IDL.Variant({
        Ok: IDL.Null,
        Err: EgoError
    });
    var Category = IDL.Variant({
        System: IDL.Null,
        Vault: IDL.Null
    });
    var Version = IDL.Record({
        major: IDL.Nat32,
        minor: IDL.Nat32,
        patch: IDL.Nat32
    });
    var App = IDL.Record({
        logo: IDL.Text,
        name: IDL.Text,
        description: IDL.Text,
        app_id: IDL.Text,
        app_hash: IDL.Text,
        category: Category,
        current_version: Version,
        price: IDL.Float32
    });
    var Result_3 = IDL.Variant({
        Ok: App,
        Err: EgoError
    });
    var Result_4 = IDL.Variant({
        Ok: IDL.Vec(App),
        Err: EgoError
    });
    var CanisterType = IDL.Variant({
        BACKEND: IDL.Null,
        ASSET: IDL.Null
    });
    var Wasm = IDL.Record({
        canister_id: IDL.Principal,
        version: Version,
        app_id: IDL.Text,
        canister_type: CanisterType
    });
    var EgoStoreApp = IDL.Record({
        app: App,
        wasm: Wasm
    });
    var Result_5 = IDL.Variant({
        Ok: IDL.Nat,
        Err: IDL.Text
    });
    var Result_6 = IDL.Variant({
        Ok: IDL.Null,
        Err: IDL.Text
    });
    var CycleRecord = IDL.Record({
        ts: IDL.Nat64,
        balance: IDL.Nat
    });
    var Result_7 = IDL.Variant({
        Ok: IDL.Vec(CycleRecord),
        Err: IDL.Text
    });
    var CycleInfo = IDL.Record({
        records: IDL.Vec(CycleRecord),
        estimate_remaining: IDL.Nat64
    });
    var Result_8 = IDL.Variant({
        Ok: CycleInfo,
        Err: IDL.Text
    });
    var Result_9 = IDL.Variant({
        Ok: IDL.Bool,
        Err: IDL.Text
    });
    var Result_10 = IDL.Variant({
        Ok: IDL.Vec(IDL.Text),
        Err: IDL.Text
    });
    var Canister = IDL.Record({
        canister_id: IDL.Principal,
        canister_type: CanisterType
    });
    var UserApp = IDL.Record({
        app: App,
        canister: Canister,
        latest_version: Version
    });
    var Result_11 = IDL.Variant({
        Ok: UserApp,
        Err: EgoError
    });
    var Result_12 = IDL.Variant({
        Ok: IDL.Vec(UserApp),
        Err: EgoError
    });
    var Result_13 = IDL.Variant({
        Ok: IDL.Nat,
        Err: EgoError
    });
    var WalletCycleChargeRequest = IDL.Record({
        cycle: IDL.Nat,
        comment: IDL.Text,
        wallet_id: IDL.Principal
    });
    var WalletCycleChargeResponse = IDL.Record({
        ret: IDL.Bool
    });
    var Result_14 = IDL.Variant({
        Ok: WalletCycleChargeResponse,
        Err: EgoError
    });
    var CashFlowType = IDL.Variant({
        CHARGE: IDL.Null,
        RECHARGE: IDL.Null
    });
    var CashFlow = IDL.Record({
        balance: IDL.Nat,
        operator: IDL.Principal,
        created_at: IDL.Nat64,
        comment: IDL.Text,
        cycles: IDL.Nat,
        cash_flow_type: CashFlowType
    });
    var Result_15 = IDL.Variant({
        Ok: IDL.Vec(CashFlow),
        Err: EgoError
    });
    var Result_16 = IDL.Variant({
        Ok: IDL.Principal,
        Err: EgoError
    });
    var Result_17 = IDL.Variant({
        Ok: IDL.Nat64,
        Err: EgoError
    });
    return IDL.Service({
        admin_wallet_cycle_recharge: IDL.Func([
            AdminWalletCycleRechargeRequest
        ], [
            Result
        ], []),
        admin_wallet_order_list: IDL.Func([], [
            Result_1
        ], []),
        admin_wallet_provider_add: IDL.Func([
            AdminWalletProviderAddRequest
        ], [
            Result_2
        ], []),
        app_main_get: IDL.Func([
            IDL.Text
        ], [
            Result_3
        ], []),
        app_main_list: IDL.Func([], [
            Result_4
        ], []),
        app_main_release: IDL.Func([
            EgoStoreApp
        ], [
            Result
        ], []),
        balance_get: IDL.Func([], [
            Result_5
        ], [
            "query"
        ]),
        ego_canister_add: IDL.Func([
            IDL.Text,
            IDL.Principal
        ], [
            Result_6
        ], []),
        ego_controller_add: IDL.Func([
            IDL.Principal
        ], [
            Result_6
        ], []),
        ego_controller_remove: IDL.Func([
            IDL.Principal
        ], [
            Result_6
        ], []),
        ego_controller_set: IDL.Func([
            IDL.Vec(IDL.Principal)
        ], [
            Result_6
        ], []),
        ego_cycle_check: IDL.Func([], [
            Result_6
        ], []),
        ego_cycle_estimate_set: IDL.Func([
            IDL.Nat64
        ], [
            Result_6
        ], []),
        ego_cycle_history: IDL.Func([], [
            Result_7
        ], [
            "query"
        ]),
        ego_cycle_info: IDL.Func([], [
            Result_8
        ], []),
        ego_cycle_recharge: IDL.Func([
            IDL.Nat
        ], [
            Result_6
        ], []),
        ego_cycle_threshold_get: IDL.Func([], [
            Result_5
        ], []),
        ego_is_owner: IDL.Func([], [
            Result_9
        ], [
            "query"
        ]),
        ego_is_user: IDL.Func([], [
            Result_9
        ], [
            "query"
        ]),
        ego_log_list: IDL.Func([
            IDL.Nat64
        ], [
            Result_10
        ], [
            "query"
        ]),
        ego_op_add: IDL.Func([
            IDL.Principal
        ], [
            Result_6
        ], []),
        ego_owner_add: IDL.Func([
            IDL.Principal
        ], [
            Result_6
        ], []),
        ego_owner_add_with_name: IDL.Func([
            IDL.Text,
            IDL.Principal
        ], [
            Result_6
        ], []),
        ego_owner_remove: IDL.Func([
            IDL.Principal
        ], [
            Result_6
        ], []),
        ego_owner_set: IDL.Func([
            IDL.Vec(IDL.Principal)
        ], [
            Result_6
        ], []),
        ego_runtime_cycle_threshold_get: IDL.Func([], [
            Result_5
        ], []),
        ego_user_add: IDL.Func([
            IDL.Principal
        ], [
            Result_6
        ], []),
        ego_user_remove: IDL.Func([
            IDL.Principal
        ], [
            Result_6
        ], []),
        ego_user_set: IDL.Func([
            IDL.Vec(IDL.Principal)
        ], [
            Result_6
        ], []),
        wallet_app_install: IDL.Func([
            IDL.Text
        ], [
            Result_11
        ], []),
        wallet_app_list: IDL.Func([], [
            Result_12
        ], []),
        wallet_app_remove: IDL.Func([
            IDL.Principal
        ], [
            Result_2
        ], []),
        wallet_app_upgrade: IDL.Func([
            IDL.Principal
        ], [
            Result_2
        ], []),
        wallet_canister_track: IDL.Func([
            IDL.Principal
        ], [
            Result_2
        ], []),
        wallet_canister_untrack: IDL.Func([
            IDL.Principal
        ], [
            Result_2
        ], []),
        wallet_cycle_balance: IDL.Func([], [
            Result_13
        ], []),
        wallet_cycle_charge: IDL.Func([
            WalletCycleChargeRequest
        ], [
            Result_14
        ], []),
        wallet_cycle_list: IDL.Func([], [
            Result_15
        ], []),
        wallet_main_new: IDL.Func([
            IDL.Principal
        ], [
            Result_11
        ], []),
        wallet_main_register: IDL.Func([
            IDL.Principal
        ], [
            Result_16
        ], []),
        wallet_order_list: IDL.Func([], [
            Result_1
        ], []),
        wallet_order_new: IDL.Func([
            IDL.Float32
        ], [
            Result_17
        ], []),
        wallet_order_notify: IDL.Func([
            IDL.Nat64
        ], [
            Result
        ], []),
        wallet_tenant_get: IDL.Func([], [
            Result_16
        ], [])
    });
};
var init = function(param) {
    var IDL = param.IDL;
    var InitArg = IDL.Record({
        init_caller: IDL.Opt(IDL.Principal)
    });
    return [
        InitArg
    ];
};
