<script>
  import { getContext } from "svelte";
  const { copy } = getContext("App");

  const { intro: introCopy } = copy.sections;
</script>

{#each introCopy as { type, value }}
  {#if type === "image"}
    <figure>
      <img src="assets/images/{value.id}.png" alt={value.caption} />
    </figure>
  {:else}
    <div class="prose">
      <p>{@html value}</p>
    </div>
  {/if}
{/each}

<style>
</style>
