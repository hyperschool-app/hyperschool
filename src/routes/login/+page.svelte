<script lang="ts">
    import Hero from './Login Hero.png?enhanced';
    import {Button} from "$lib/components/ui/button";
    import Divider from "$lib/components/Divider.svelte";
    import Discord from "$lib/components/icons/Discord.svelte";
    import Typer from "$lib/components/Typer.svelte";
    import {onMount} from "svelte";
    import {signIn} from "@auth/sveltekit/client";

    let name = "";
    let names = [ "Andy Kalb", "Camillo Sanchez", "Camillo Sanchez (supreme overlord)" ];
    let nameIdx = 0;
    let countUntilText = 1;

    onMount(() => {
        const interval = setInterval(() => {
            if (countUntilText > 0) {
                countUntilText--;
                return;
            }
            name = names[nameIdx];
            nameIdx = (nameIdx + 1) % names.length;
        }, 2000);

        return () => clearInterval(interval);
    });

    async function discord() {
        await signIn("discord");
    }
</script>

<div class="fixed inset-0 flex flex-row gap-0">
    <div class="w-[700px] h-full img-c relative hidden md:block">
        <div class="absolute inset-0">
            <enhanced:img src={Hero} alt="login hero image" />
        </div>
        <div class="absolute left-0 top-0 w-full p-8 flex flex-col gap-0 backdrop-blur-sm bg-opacity-20 bg-black fade pb-14">
            <div class="flex flex-row w-full">
                {#each "hyperschool" as letter, index}
                    <span class="font-semibold text-2xl block animate-bounce" style="animation-delay: {index * 0.03}s;">{letter}</span>
                {/each}
            </div>
            <span class="text-muted-foreground">by <Typer alwaysBlink text={name} /></span>
        </div>
    </div>
    <div class="w-full h-full flex items-center justify-center p-16 md:p-32">
        <div class="max-w-[350px] w-full flex items-center justify-center flex-col gap-6">
            <h1 class="font-bold tracking-tight text-3xl">Sign in</h1>
            <Divider>Sign in with</Divider>
            <div class="flex flex-col gap-3 w-full">
                <Button variant="outline" class="w-full flex flex-row gap-2" on:click={discord}>
                    <Discord/>
                    Discord
                </Button>
                <span class="w-full text-center text-muted-foreground">+ more to come</span>
            </div>
        </div>
    </div>
</div>

<style>
    picture {
        display: flex;
        height: 100%;
        width: 100%;
    }
    picture > img {
        object-fit: cover;
    }
    .fade {
        mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 70%,
            rgba(0, 0, 0, 0)
        );
    }
</style>