export function lazy<T>(init: () => T): () => T {
    let value: [T] | [] = [];

    return () => {
        if (value.length === 0) {
            value = [init()];
        }

        return value[0];
    };
}