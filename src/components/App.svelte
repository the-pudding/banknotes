<script>
  import { setContext } from "svelte";
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import { currentSection } from "$stores/misc";

  import Meta from "$components/Meta.svelte";
  import Header from "$components/Header.svelte";
  import Hero from "$components/Hero.svelte";
  import Section from "$components/Section.svelte";
  import copy from "$data/doc.json";
  //import copy from "$data/docTest.json";

  // set site copy as context in case any other components need it
  setContext("App", { copy });
  const { meta } = copy;

  // outline site structure, assign copy and components to each section
  let sections = [
    "hero",
    "intro",
    "occupation",
    "firsts",
    "denominations",
    "issueDate",
    "conclusion",
  ];
  //sections = ["hero", "intro", "firsts"]; // <-- for testing specific sections

  const outline = sections.map(sectionName => {
    let isHero = sectionName === "hero";
    return {
      id: sectionName,
      cmp: isHero ? Hero : Section,
      copy: isHero ? copy.hero : copy.sections[sectionName],
    };
  });

  // scrolly setting for nav
  let scrollStep = 0;
  $: scrollStep, handleSectionChange();
  const handleSectionChange = () => {
    if (outline && scrollStep !== undefined) {
      currentSection.set({ name: outline[scrollStep].id, idx: scrollStep });
    }
  };
</script>

<Meta title={meta.title} description={meta.description} url={meta.url} />
<Header />
<Scrolly bind:value={scrollStep}>
  {#each outline as section, i}
    <section id={section.id}>
      <section id={section.id}>
        <svelte:component this={section.cmp} copy={section.copy} />
      </section>
    </section>
  {/each}
</Scrolly>

<style>
</style>
