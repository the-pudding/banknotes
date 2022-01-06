<script>
  import wordmark from "$svg/wordmark.svg";
  import { getContext } from "svelte";
  import { currentSection } from "$stores/misc";

  const { copy } = getContext("App");
  const sections = Object.keys(copy)
    .filter(d => d !== "meta")
    .filter(d => d !== "hero");

  $: showNav = $currentSection !== 0;
</script>

<header>
  {#if showNav}
    <nav>
      {#each sections as section}
        <div class="nav-link">{section}</div>
      {/each}
    </nav>
  {:else}
    <div class="wordmark">
      <a href="https://pudding.cool" aria-label="The Pudding">{@html wordmark}</a>
    </div>
  {/if}
</header>

<style>
  header {
    position: sticky;
    top: 0;
    height: 85px;
    width: 100%;
    background-color: white;
    box-shadow: 0px 4px 10px rgba(40, 40, 40, 0.1);
  }

  nav {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-link {
    margin: 0 1em;
    font-family: "ABeeZee", sans-serif;
    font-style: italic;
    font-size: 30px;
    line-height: 36px;
    color: var(--color-green);
    cursor: pointer;
    text-transform: capitalize;
  }

  .nav-link:hover {
    color: var(--color-gray-dark);
    border-bottom: solid 5px var(--color-gray-dark);
    transition: border-bottom 0.1s;
  }

  .wordmark {
    max-width: 10em;
    margin: 0 auto;
    padding: 1em 0;
  }

  .wordmark a {
    border: none;
    color: var(--color-fg);
  }

  .wordmark a:hover {
    background-color: transparent;
  }

  :global(.wordmark svg path) {
    fill: currentColor;
  }
</style>
