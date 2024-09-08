<script lang="ts">
    import {onMount} from "svelte";

    export let text: string;
    export let alwaysBlink = false;

    onMount(() => {
        const interval = setInterval(() => {
            if (text.startsWith(current) && text !== current) {
                current += text[current.length];
            } else if (text !== current) {
                // backspace
                current = current.slice(0, -1);
            }
        }, 20)

        return () => clearInterval(interval);
    })

    let current = "";
</script>

<span>
    {current}

    {#if current !== text || alwaysBlink}
        <span class="animate-pulse">█</span>
    {/if}
</span>