import {writable} from "svelte/store";
import {browser} from "$app/environment";
import {proxy, sync} from "$lib/sync/sync";

export type SyncState =
    ["loading"] |
    ["email_required"] |
    ["password_required"] |
    ["idle"] |
    ["syncing"] |
    ["error", {
        message: string
    }];

// TODO: This is a crime against humanity
//       abandon all hope ye who enter here
//       and don't forget to like and subscribe
//       and ring that bell
//       (why am i spending so time writing a terrible joke comment instead of fixing this)

/**
 * Manages the completely derranged state machine for the sync system.
 * Quite possibly the ugliest part of the entire codebase.
 * This means it only gets better from here.
 *
 * @returns A sync manager object
 */
function createManager() {
    if (!browser) {
        return {
            state: ["loading"],
            stateStore: writable<SyncState>(["loading"]),
            email: undefined,
            password: undefined,
            sync() {
                throw new Error("Sync is not supported on the server");
            },
            init() {
                throw new Error("Init is not supported on the server");
            },
            checkSyncClock() {
                throw new Error("Check sync clock is not supported on the server");
            }
        } satisfies Result
    }

    let stateStore = writable<SyncState>(["email_required"]);
    let _state: SyncState = ["email_required"];
    let _password: string | undefined = undefined;

    console.log(`manager init`);

    const self = {
        get state() {
            return _state;
        },
        set state(newState: SyncState) {
            _state = newState;
            stateStore.set(newState);
        },
        stateStore,
        get email() {
            return localStorage.getItem("email") ?? undefined
        },
        set email(email: string | undefined) {
            if (email) {
                localStorage.setItem("email", email);

                if (this.state[0] === "email_required") {
                    this.state = ["password_required"];
                }
            } else {
                throw new Error("Cannot de-initialize email");
            }
        },
        get password() {
            return _password;
        },
        set password(password: string | undefined) {
            if (password) {
                _password = password;

                if (this.state[0] === "password_required") {
                    this.state = ["idle"];
                    this.checkSyncClock().then();
                }
            } else {
                throw new Error("Cannot de-initialize password");
            }
        },
        async sync() {
            if (this.state[0] !== "idle") {
                throw new Error(`Expected state to be "idle", got "${this.state[0]}"`);
            }

            this.state = ["syncing"];

            if (!this.email || !this.password) {
                throw new Error("invalid state, state mismatches with email + password presence");
            }

            try {
                await sync(proxy("/api/proxy"), {
                    email: this.email,
                    password: this.password
                });
                this.state = ["idle"];
            } catch (e) {
                this.state = ["error", { message: (e as any).message }];
            }
        },
        init() {
            if (this.email) {
                this.email = this.email;
            }
        },
        async checkSyncClock() {
            let lastSync = +(localStorage.getItem("lastSync") ?? "0");
            let syncTime = 15 * 60 * 1000; // 15 minutes
            let nextSync = lastSync + syncTime;

            if (Date.now() < nextSync) {
                return;
            }

            if (this.state[0] === "idle") {
                await this.sync();

                localStorage.setItem("lastSync", Date.now().toString());
            }
        }
    };

    type Result = typeof self;

    self.init();

    return self;
}

export const sync_manager = createManager()