<script lang="ts">
    import Title from "$lib/components/Title.svelte";
    import Tagline from "$lib/components/Tagline.svelte";
    import LucideTriangleAlert from "lucide-svelte/icons/triangle-alert";
    import LucideSparkles from "lucide-svelte/icons/sparkles";
    import {Input} from "$lib/components/ui/input";
    import {Label} from "$lib/components/ui/label";
    import {Button} from "$lib/components/ui/button";
    import * as Alert from "$lib/components/ui/alert";
    import {derived} from "svelte/store";
    import {sync_manager} from "$lib/sync/manager.client";

    let email = "";
    let password = "";
    let problem: string | null = null;

    let sync_status = derived([sync_manager.stateStore], ([state]) => {
        return state[0];
    });

    let sync_status_full = derived([sync_manager.stateStore], ([state]) => {
        return state;
    });

    function update_email() {
        sync_manager.email = email;
    }

    function update_password() {
        sync_manager.password = password;
    }

    function validate(email: string) {
        let parts = email.split("@");

        problem = null;

        if (parts.length !== 2) {
            problem = "Email must contain exactly one @ symbol.";
            return false;
        }

        let [username, domain] = parts;

        if (username.trim().length === 0 || domain.trim().length === 0) {
            if (username.trim().length === 0) {
                problem = "Username is empty.";
            } else {
                problem = "Domain is empty.";
            }
            return false;
        }

        if (domain !== "bcp.org") {
            problem = "Domain must be bcp.org.";
            return false;
        }

        if (username.length < 5) { // Theoretically the shortest name is 1 letter first name, dot, 1 letter last name, 2 digits, ex: A.B99@bcp.org
            problem = "Username is too short.";
            return false;
        }

        if (username.length > 50) {
            problem = "Username is too long.";
            return false;
        }

        return true;
    }
</script>

{#if $sync_status === "email_required"}
    <Title title="Setup sync with Powerschool"/>
    <Tagline>Let's get you going from 0-60.</Tagline>
    <div class="flex flex-col gap-2">
        <Label for="sync-email">School email</Label>
        <Input id="sync-email" bind:value={email} placeholder="John.Doe99@bcp.org"/>
        <Button disabled={!validate(email)} on:click={update_email}>Next</Button>
        {#if problem !== null}
            <p class="text-muted-foreground">{problem}</p>
        {/if}
    </div>
{:else if $sync_status === "loading"}
    <Title title="Loading"/>
    <Tagline>We're trying to run our syncing code on your computer.</Tagline>
    <noscript>
        <Alert.Root>
            <LucideTriangleAlert class="size-4" />
            <Alert.Title>
                Javascript Required
            </Alert.Title>
            <Alert.Description>
                <p>Like most of this app, sync relies on Javascript. Please enable Javascript or the status will be loading forever.</p>
            </Alert.Description>
        </Alert.Root>
    </noscript>
{:else if $sync_status === "idle"}
    <Title title="Synced"/>
    <Tagline>Syncing is working fine.</Tagline>
    <Button>Sync now</Button>
{:else if $sync_status === "syncing"}
    <Title title="Syncing"/>
    <Tagline>Syncing your data with Powerschool.</Tagline>
    <p>There's nothing you can do right now other than to wait.</p>
{:else if $sync_status === "error"}
    <Title title="Failed to sync"/>
    <Tagline>Something went wrong.</Tagline>
    <Alert.Root>
        <LucideTriangleAlert class="size-4" />
        <Alert.Title>
            Error
        </Alert.Title>
        <Alert.Description>
            <p>{$sync_status_full[1]}</p>
            <p>If you don't know what that means, contact us.</p> <!--TODO: Add a link here-->
        </Alert.Description>
    </Alert.Root>
{:else if $sync_status === "password_required"}
    <Title title="Sign into Powerschool"/>
    <Tagline>Please enter your password.</Tagline>
    <Alert.Root>
        <LucideTriangleAlert class="size-4" />
        <Alert.Title>
            Heads up!
        </Alert.Title>
        <Alert.Description>
            <p>To sync with Powerschool you have to give your school password.</p>
            <p>In general, <b class="text-destructive">do not trust random sites with your password.</b></p>
            <p>But, we promise to keep your information safe, feel free to check our source code.</p> <!--TODO: Add a link here-->
            <p>We keep your email on device, and we never store your password, we ask for it every time you launch the app.</p>
        </Alert.Description>
    </Alert.Root>

    <div class="flex flex-col gap-2">
        <Label for="sync-password">Password</Label>
        <Input id="sync-password" type="password" bind:value={password}/>
        <Button class="flex flex-row gap-2" on:click={update_password} disabled={password.trim() === ""}>
            <LucideSparkles class="size-4"/>
            Sync
        </Button>
    </div>
{/if}