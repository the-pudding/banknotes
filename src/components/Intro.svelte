<script>
  import { getContext } from "svelte";
  const { copy } = getContext("App");
</script>

<h1 class="hed">{copy.hero.title}</h1>
<p class="prompt">{copy.hero.prompt}</p>
<p class="byline">By</p>

{#each copy.intro as { type, value }}
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
  .hed {
    margin-top: 1em;
  }

  .prompt {
    max-width: 60%;
    font-family: "Abhaya Libre", serif;
    font-weight: 500;
    font-size: 30px;
    line-height: 1.33;
    margin: 0 auto;
  }

  .byline {
    font-family: "ABeeZee", sans-serif;
  }
</style>
