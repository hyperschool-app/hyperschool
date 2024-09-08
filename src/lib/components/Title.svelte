<script lang="ts">
    import Header from "$lib/components/Header.svelte";

    export let title: string;
</script>

<svelte:head>
    <title>{title} - hyperschool</title>
</svelte:head>

<Header>{title}</Header>