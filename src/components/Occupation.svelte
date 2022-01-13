<script>
  import { getContext } from "svelte";
  const { copy } = getContext("App");

  const { occupation: occupationCopy } = copy.sections;
</script>

{#each occupationCopy as { type, value }}
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
