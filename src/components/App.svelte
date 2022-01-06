<script>
  import { setContext } from "svelte";
  import { browser } from "$app/env";
  import inView from "$actions/inView";
  import { currentSection } from "$stores/misc";

  import Meta from "$components/Meta.svelte";
  import Header from "$components/Header.svelte";
  import Intro from "$components/Intro.svelte";
  import Occupation from "./Occupation.svelte";
  import Footer from "$components/Footer.svelte";

  import copy from "$data/doc.json";

  setContext("App", { copy });
  const { meta } = copy;

  const bodyParts = [Intro, Occupation];

  $: console.log("currentSection", $currentSection);
</script>

<Meta title={meta.title} description={meta.description} url={meta.url} />
<Header />
{#each bodyParts as component, i}
  <section use:inView on:enter={() => currentSection.set(i)}>
    <svelte:component this={component} />
  </section>
{/each}

<style>
</style>
