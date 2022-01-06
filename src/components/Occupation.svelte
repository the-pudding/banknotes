<script>
  import { getContext } from "svelte";
  const { copy } = getContext("App");
</script>

{#each copy.occupation as { type, value }}
  {#if type === "heading"}
    <h2>{@html value.title}</h2>
  {:else if type === "image"}
    <figure>
      <img src="assets/images/{value.id}.png" alt={value.caption} />
    </figure>
  {:else if type === "viz"}
    <div class="viz" />
  {:else}
    <div class="prose">
      <p>{@html value}</p>
    </div>
  {/if}
{/each}

<style>
</style>
