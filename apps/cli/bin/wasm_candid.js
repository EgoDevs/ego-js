"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateCandidFile", {
    enumerable: true,
    get: ()=>generateCandidFile
});
const _fs = require("fs");
function generateCandidFile(candidPath, wasmFilePath) {
    const wasmBuffer = (0, _fs.readFileSync)(wasmFilePath);
    const wasmModule = new WebAssembly.Module(wasmBuffer);
    const wasmInstance = new WebAssembly.Instance(wasmModule, {
        ic0: {
            accept_message: ()=>{},
            call_cycles_add: ()=>{},
            call_cycles_add128: ()=>{},
            call_data_append: ()=>{},
            call_new: ()=>{},
            call_on_cleanup: ()=>{},
            call_perform: ()=>{},
            canister_cycle_balance: ()=>{},
            canister_cycle_balance128: ()=>{},
            canister_self_copy: ()=>{},
            canister_self_size: ()=>{},
            canister_version: ()=>{},
            certified_data_set: ()=>{},
            data_certificate_copy: ()=>{},
            data_certificate_present: ()=>{},
            data_certificate_size: ()=>{},
            debug_print: ()=>{},
            global_timer_set: ()=>{},
            instruction_counter: ()=>{},
            is_controller: ()=>{},
            msg_arg_data_copy: ()=>{},
            msg_arg_data_size: ()=>{},
            msg_caller_copy: ()=>{},
            msg_caller_size: ()=>{},
            msg_cycles_accept: ()=>{},
            msg_cycles_accept128: ()=>{},
            msg_cycles_available: ()=>{},
            msg_cycles_refunded: ()=>{},
            msg_cycles_refunded128: ()=>{},
            msg_method_name_copy: ()=>{},
            msg_method_name_size: ()=>{},
            msg_reject_code: ()=>{},
            msg_reject_msg_copy: ()=>{},
            msg_reject_msg_size: ()=>{},
            msg_reject: ()=>{},
            msg_reply_data_append: ()=>{},
            msg_reply: ()=>{},
            performance_counter: ()=>{},
            stable_grow: ()=>{},
            stable_read: ()=>{},
            stable_size: ()=>{},
            stable_write: ()=>{},
            stable64_grow: ()=>{},
            stable64_read: ()=>{},
            stable64_size: ()=>{},
            stable64_write: ()=>{},
            time: ()=>{},
            trap: ()=>{}
        }
    });
    if (wasmInstance.exports['get_candid_pointer'] === undefined) {
        throw new Error('get_candid_pointer is not exported from wasm');
    }
    const candidPointer = wasmInstance.exports.get_candid_pointer();
    const memory = new Uint8Array(wasmInstance.exports.memory.buffer);
    let candidBytes = [];
    let i = candidPointer;
    while(memory[i] !== 0){
        candidBytes.push(memory[i]);
        i += 1;
    }
    (0, _fs.writeFileSync)(candidPath, Buffer.from(candidBytes));
}
