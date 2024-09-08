<script lang="ts">
    import LucideHouse from "lucide-svelte/icons/house";
    import LucideFolderSync from "lucide-svelte/icons/folder-sync";
    import LucideSettings from "lucide-svelte/icons/settings";
    import LucideGraduationCap from "lucide-svelte/icons/graduation-cap";
    import LucideTriangleAlert from "lucide-svelte/icons/triangle-alert";
    import {Button} from "$lib/components/ui/button";
    import {sync_manager, type SyncState} from "$lib/sync/manager.client";
    import {derived} from "svelte/store";
    import {Badge} from "$lib/components/ui/badge";

    let sync_status = derived([sync_manager.stateStore], ([state]) => {
        return state[0];
    });

    function status_name(status: SyncState[0]) {
        switch (status) {
            case "idle":
                return "idle";
            case "email_required":
                return "setup";
            case "error":
                return "error";
            case "password_required":
                return "sign-in";
            case "loading":
                return "loading";
        }
    }

    function status_badge_variant(status: SyncState[0]) {
        switch (status) {
            case "idle":
                return "outline";
            case "email_required":
                return "default";
            case "error":
                return "destructive";
            case "password_required":
                return "default";
            case "loading":
                return "default";
            case "syncing":
                return "default";
        }
    }

    let buttons = [
        {
            name: "Home",
            icon: LucideHouse,
            url: ""
        },
        {
            name: "Sync",
            icon: LucideFolderSync,
            url: "sync",
            special: "sync-status"
        },
        {
            name: "Courses",
            icon: LucideGraduationCap,
            url: "courses"
        },
        {
            name: "Settings",
            icon: LucideSettings,
            url: "settings"
        }
    ]
</script>

<div class="fixed inset-0 flex flex-col gap-0">
    {#if $sync_status === "password_required"}
        <a href="/app/sync">
            <div class="p-3 w-full flex items-center justify-center border-b border-b-border text-sm gap-2">
                <LucideTriangleAlert class="size-4" />
                Your grades may be out of date, sign into Powerschool.
            </div>
        </a>
    {/if}
    <div class="flex flex-row gap-0 w-full h-full">
        <nav class="flex-col p-4 gap-2 w-[350px] overflow-y-auto border-r border-border hidden md:flex">
            {#each buttons as {name, icon, url, special}}
                <a href="/app/{url}" class="w-full">
                    <Button variant="outline" class="justify-start items-center flex flex-row gap-2 px-3 w-full">
                        <svelte:component this={icon} size="20" />
                        {name}
                        {#if special === "sync-status"}
                            <Badge variant={status_badge_variant($sync_status)}>{status_name($sync_status)}</Badge>
                        {/if}
                    </Button>
                </a>
            {/each}
        </nav>
        <main class="p-8 md:p-16 md:px-32 md:py-16 overflow-y-auto overflow-x-auto w-full">
            <div class="flex flex-col gap-4">
                <slot/>
            </div>
        </main>
    </div>
</div>