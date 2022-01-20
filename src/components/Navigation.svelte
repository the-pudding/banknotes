<script>
  import { onMount } from "svelte";
  import { startCase } from "lodash";
  import * as scroll from "svelte-scrollto";

  import Icon from "./helpers/Icon.svelte";

  export let headerHeight = 80;
  export let navLinks = [{ label: "Section 1", id: "section1" }];
  export let currentSection;

  // Navigation logic
  const scrollTo = (element, offset = 0) => {
    scroll.scrollTo({ element, offset: offset, duration: 1200 });
  };

  // Mobile logic
  let showMobileMenu = false;
  const handleMobileMenuClick = () => {
    showMobileMenu = !showMobileMenu;
  };
  $: mobileMenuIcon = showMobileMenu ? "x" : "menu";

  onMount(() => {
    // set up media listener to reset the mobile menu
    const mediaListener = window.matchMedia("(max-width: 767px");
    mediaListener.addEventListener("change", e => {
      if (!e.matches) {
        showMobileMenu = false;
      }
    });
  });
</script>

<nav>
  <!-- Desktop -->
  <div class="desktop-nav">
    {#each navLinks as navLink}
      <div
        class="nav-link"
        class:active={currentSection.name === navLink.id}
        on:click={() => scrollTo(`#${navLink.id}`, -(headerHeight + 15))}
      >
        {startCase(navLink.label)}
      </div>
    {/each}
  </div>

  <!-- Mobile -->
  <div class="mobile-nav">
    <div class="mobile-menu-icon" on:click={handleMobileMenuClick}>
      <Icon
        name={mobileMenuIcon}
        width="50px"
        height="50px"
        stroke="var(--color-green)"
        strokeWidth={2.5}
      />
    </div>
    <div class="mobile-nav-links-container" class:active={showMobileMenu}>
      {#each navLinks as navLink}
        <div
          class="mobile-nav-link"
          class:active={currentSection.name === navLink.id}
          on:click={() => {
            showMobileMenu = false;
            scrollTo(`#${navLink.id}`);
          }}
        >
          {startCase(navLink.label)}
        </div>
      {/each}
    </div>
  </div>
</nav>

<style lang="scss">
  .desktop-nav {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-link {
    padding: 5px 0;
    margin: 0 1em;
    font-family: "ABeeZee", sans-serif;
    font-style: italic;
    font-size: 26px;
    line-height: 1.33;
    color: var(--color-green);
    border-bottom: solid 5px transparent;
    cursor: pointer;

    &.active {
      border-bottom: solid 5px var(--color-green);
      transition: border-bottom 100ms;
    }

    &:hover {
      opacity: 0.7;
      transition: opacity 100ms;
    }
  }

  .mobile-nav {
    display: none;
    position: absolute;
    top: 10;
    left: 10;

    .mobile-menu-icon {
      height: 70px;
      width: 70px;
      margin: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      border: solid 1px var(--color-gray-dark);
      border-radius: 50%;
      box-shadow: 0px 4px 10px rgba(40, 40, 40, 0.1);
      cursor: pointer;

      &:hover {
        border-width: 3px;
        transition: all 100ms ease-in-out;
      }
    }
  }

  .mobile-nav-links-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100vw;
    overflow: hidden;
    background-color: white;
    box-shadow: 0px 4px 10px rgba(40, 40, 40, 0.1);
    text-align: left;
    transform: translateX(-100%);

    &.active {
      transform: translateX(0);
      transition: transform 500ms ease-in-out;
    }
  }

  .mobile-nav-link {
    padding: 10px 50px;
    width: 100vw;
    font-family: "ABeeZee", sans-serif;
    font-style: italic;
    font-size: 32px;
    line-height: 1.5;
    color: var(--color-green);
    border-bottom: solid 1px rgba(40, 40, 40, 0.1);
    cursor: pointer;

    &:hover {
      background-color: rgba(40, 40, 40, 0.1);
    }

    &:first-child {
      margin-top: 100px;
      border-top: solid 1px rgba(40, 40, 40, 0.1);
    }

    &.active:before {
      content: "→ ";
      color: var(--color-gray-dark);
    }
  }

  @media screen and (max-width: 1024px) {
    .desktop-nav {
      display: none;
    }

    .mobile-nav {
      display: block;
    }
  }
</style>
