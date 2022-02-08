<script>
  import { getContext } from "svelte";
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import { rawData } from "$data/data.js";
  import { uniqWith, isEqual } from "lodash";

  import IssueDateChart from "./VizIssueDate.chart.svelte";

  // get steps array from copy
  const { copy } = getContext("App");
  const steps = copy.sections.issueDate.find(d => d.type === "viz").value.steps;

  // prep data
  let data = uniqWith(
    // get unique names from rawData
    rawData.map(d => ({
      name: d.name,
      issueDate: d.firstAppearanceDate,
      deathDate: d.deathDate,
      country: d.country,
      id: d.id,
      imgBase: d.hasPortrait ? d.id : "A_Unknown",
      hovered: false,
    })),
    isEqual
  ).filter(d => d.deathDate >= 1200);

  // scrolly
  let scrollStep = 0;
  $: highlightedIDs =
    scrollStep !== undefined ? steps[scrollStep].nameIDs.split(",").map(d => d.trim()) : [];

  let vizWidth;
  let vizHeight;
</script>

<div class="container">
  <div class="background">
    <div class="viz-container" bind:clientHeight={vizHeight} bind:clientWidth={vizWidth}>
      <IssueDateChart width={vizWidth} height={vizHeight} {data} {highlightedIDs} />
    </div>
  </div>

  <div class="spacer" />
  <Scrolly bind:value={scrollStep}>
    {#each steps as step, i}
      <div class="step-container">
        <div class="step" class:active={scrollStep === i}>{@html step.text}</div>
      </div>
    {/each}
  </Scrolly>
  <div class="spacer" />
</div>

<style>
  /* * {
    border: solid 1px red;
  } */

  .container {
    position: relative;
    width: 100%;
  }

  .background {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .viz-container {
    height: 960px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .step-container {
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;
  }

  .step {
    position: relative;
    padding: 30px;
    width: 45vw;
    height: 100%;
    margin: 80vh 20px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    background: var(--color-green);
    color: white;
  }

  .spacer {
    height: 5vh;
    /* background-color: hotpink; */
  }
</style>
