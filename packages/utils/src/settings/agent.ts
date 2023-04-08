import { Actor, ActorSubclass, HttpAgent, SignIdentity } from '@dfinity/agent';
import { InterfaceFactory } from '@dfinity/candid/lib/cjs/idl';
import { Principal } from '@dfinity/principal';
import { dfxPort, isProduction } from './env';
import { fetch, Headers } from 'cross-fetch';

if (!globalThis.fetch) {
  (globalThis as any).fetch = fetch;
  (globalThis as any).Headers = Headers;
}

if (!global.fetch) {
  (global as any).fetch = fetch;
  (global as any).Headers = Headers;
}

export interface CreateActorResult<T> {
  actor: ActorSubclass<T>;
  agent: HttpAgent;
}

export async function _createActor<T>(
  interfaceFactory: InterfaceFactory,
  canisterId: string,
  identity?: SignIdentity,
  host?: string,
): Promise<CreateActorResult<T>> {
  const agent = new HttpAgent({
    identity,
    host: host ?? !isProduction ? `http://127.0.0.1:${dfxPort}` : 'https://ic0.app/',
  });
  // Only fetch the root key when we're not in prod
  if (!isProduction) {
    await agent.fetchRootKey();
  }

  const actor = Actor.createActor<T>(interfaceFactory, {
    agent,
    canisterId: canisterId === '' ? Principal.fromText('aaaaa-aa') : canisterId,
  });
  return { actor, agent };
}

export const getActor = async <T>(signIdentity: SignIdentity, interfaceFactory: InterfaceFactory, canisterId: string): Promise<ActorSubclass<T>> => {
  const actor = await _createActor<T>(interfaceFactory, canisterId, signIdentity);

  return actor.actor;
};

export const getActor2 = async <T>(
  signIdentity: SignIdentity,
  interfaceFactory: InterfaceFactory,
  canisterId: string,
): Promise<CreateActorResult<T>> => {
  const actor = await _createActor<T>(interfaceFactory, canisterId, signIdentity);

  return actor;
};
