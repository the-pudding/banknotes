<script>
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";
  import { startCase } from "lodash";

  import Navigation from "./Navigation.svelte";

  import { currentSection } from "$stores/misc";
  import wordmark from "$svg/wordmark.svg";

  const { copy } = getContext("App");
  const sectionLinks = Object.keys(copy.sections).map(d => {
    return { label: startCase(d), id: d };
  });
  let headerHeight;

  $: showNav = $currentSection.name !== "hero";

  $: console.log($currentSection);
</script>

<header bind:clientHeight={headerHeight}>
  {#if showNav}
    <div in:fade class="nav-container">
      <Navigation navLinks={sectionLinks} currentSection={$currentSection} />
    </div>
  {:else}
    <div in:fade class="wordmark">
      <a href="https://pudding.cool" aria-label="The Pudding">{@html wordmark}</a>
    </div>
  {/if}
</header>

<style lang="scss">
  header {
    position: sticky;
    top: 0;
    z-index: 1;
    height: 100%;
    width: 100%;
    background-color: white;
    box-shadow: 0px 4px 10px rgba(40, 40, 40, 0.1);
  }

  .nav-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;
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
