<script>
    import { page } from '$app/stores';
    import Title from "$lib/components/Title.svelte";
    import Hint from "$lib/components/Hint.svelte";
</script>

<Title title="{$page.status} {$page.error?.message}"/>

<Hint>
    <p>This is almost definitely not your fault.</p>
    <p>If that is the case, contact us!</p>
    <p>If it is your fault, don't talk to us.</p>
</Hint>