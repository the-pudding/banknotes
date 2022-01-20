<script>
  import { setContext, onMount } from "svelte";
  import Scrolly from "./helpers/Scrolly.svelte";
  import { currentSection } from "$stores/misc";

  import Meta from "$components/Meta.svelte";
  import Header from "$components/Header.svelte";
  import Hero from "$components/sections/Hero.svelte";
  import Intro from "$components/sections/Intro.svelte";
  import Occupation from "$components/sections/Occupation.svelte";
  import Firsts from "$components/sections/Firsts.svelte";
  import Denominations from "$components/sections/Denominations.svelte";

  import copy from "$data/doc.json";

  setContext("App", { copy });
  const { meta } = copy;

  const outline = [
    { cmp: Hero, id: "hero" },
    { cmp: Intro, id: "intro" },
    { cmp: Occupation, id: "occupation" },
    { cmp: Firsts, id: "firsts" },
    { cmp: Denominations, id: "denominations" },
  ];

  let scrollStep = 0;
  $: scrollStep, handleSectionChange();
  const handleSectionChange = () => {
    currentSection.set({ name: outline[scrollStep].id, idx: scrollStep });
  };
</script>

<Meta title={meta.title} description={meta.description} url={meta.url} />
<Header />

<Scrolly bind:value={scrollStep}>
  {#each outline as component, i}
    <section id={component.id}>
      <svelte:component this={component.cmp} />
    </section>
  {/each}
</Scrolly>

<style>
</style>
