import { ActorSubclass, HttpAgent, SignIdentity } from '@dfinity/agent';
import { InterfaceFactory } from '@dfinity/candid/lib/cjs/idl';
export interface CreateActorResult<T> {
    actor: ActorSubclass<T>;
    agent: HttpAgent;
}
export declare function _createActor<T>(interfaceFactory: InterfaceFactory, canisterId: string, identity?: SignIdentity, host?: string): Promise<CreateActorResult<T>>;
export declare function getActor<T>(signIdentity: SignIdentity, interfaceFactory: InterfaceFactory, canisterId: string): Promise<ActorSubclass<T>>;
export declare function getActor2<T>(signIdentity: SignIdentity, interfaceFactory: InterfaceFactory, canisterId: string): Promise<CreateActorResult<T>>;
