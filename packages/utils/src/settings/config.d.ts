export interface ProjectConfig {
    category: string;
    package: string;
    bin_name: string;
    config?: string;
    private?: string;
    public?: string;
    url?: string;
    custom_candid?: boolean;
    no_build?: boolean;
    custom_build?: string;
    no_deploy?: boolean;
    custom_deploy?: string | (() => void) | (() => Promise<void>);
    post_install_sequence?: number;
    init_args?: Uint8Array;
    env?: string;
}
export type Configs = Array<ProjectConfig>;
export declare const dfxConfigTemplate: {
    canisters: {};
    defaults: {
        build: {
            packtool: string;
        };
    };
    version: number;
};
export interface ThisArgv {
    [x: string]: unknown;
    clean: boolean | undefined;
    create: boolean | undefined;
    init: boolean | undefined;
    credentials: boolean | undefined;
    build: boolean | undefined;
    install: boolean | undefined;
    reinstall: boolean | undefined;
    upgrade: boolean | undefined;
    remove: string | undefined;
    postPatch: boolean | undefined;
    migrate_v1: boolean | undefined;
    _: (string | number)[];
    $0: string;
}
export declare function getEgos(argv: ThisArgv): Configs;
