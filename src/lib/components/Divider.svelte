<div class="w-full relative h-5">
    <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-full h-1 squiggle bg-contain bg-repeat-x"></div>
    </div>
    <div class="absolute inset-0 flex items-center justify-center">
        <span class="px-5 bg-background text-muted-foreground uppercase text-[13px]"><slot/></span>
    </div>
</div>

<style lang="postcss">
    .squiggle {
        background-image: url("/Wiggle.svg");
        animation: slide 50s infinite linear;
    }

    @keyframes slide {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 100% 0;
        }
    }
</style>