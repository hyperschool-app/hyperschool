<script lang="ts">
    import LucideLightbulb from "lucide-svelte/icons/lightbulb";
    import * as Alert from "$lib/components/ui/alert";
</script>

<Alert.Root>
    <LucideLightbulb class="size-4" />
    <Alert.Title>
        Hint
    </Alert.Title>
    <Alert.Description>
        <slot />
    </Alert.Description>
</Alert.Root>