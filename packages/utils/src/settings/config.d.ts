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
export declare function getEgos(): Configs;
