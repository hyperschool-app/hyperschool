export type SyncAdapter = {
    request: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
};

export type SyncResult = {
    courses: SyncCourse[];
}

export type SyncCourse = {
    id: string;
    name: string;
    weights: Map<string, number>;
    assignments: SyncAssignment[];
    mode: "points" | "weights";
}

export type SyncAssignment = {
    id: string;
    name: string;
    points_max: number;
    points_earned: number;
}

export type SyncProps = {
    email: string;
    password: string;
}

export async function sync(adapter: SyncAdapter, props: SyncProps): Promise<SyncResult> {
    console.warn("Syncing is not implemented yet");
    return {
        courses: []
    }; // TODO: Implement sync
}

export function proxy(url: string): SyncAdapter {
    return {
        request: (input: RequestInfo, init?: RequestInit) => fetch(url, {
            headers: {
                "HS-Proxy-Request-URL": input.toString(),
                ...init?.headers
            },
            ...init
        })
    };
}