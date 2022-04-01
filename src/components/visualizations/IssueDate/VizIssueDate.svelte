<script>
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import { rawData } from "$data/data.js";
  import { chartSteps, defaultChart } from "./chartSteps.js";
  import { uniqWith, isEqual } from "lodash";

  import Chart from "./VizIssueDate.chart.svelte";

  // get steps array from copy
  export let props = {};

  // prep data
  let data = uniqWith(
    // get unique names from rawData
    rawData.map(d => ({
      name: d.name,
      issueDate: d.firstAppearanceDate,
      deathDate: d.deathDate === 0 ? undefined : d.deathDate,
      elapsed: d.firstAppearanceDate - d.deathDate,
      country: d.country,
      id: d.id,
      imgBase: d.hasPortrait ? d.id : "A_Unknown",
    })),
    isEqual
  )
    .filter(d => d.deathDate !== undefined)
    .filter(d => !isNaN(d.deathDate));

  // scrolly
  const steps = props.steps.map((d, i) => {
    // make array of text blocks
    let text = Object.keys(d)
      .filter(dd => dd.indexOf("text") === 0)
      .map(key => d[key]);
    return {
      text,
    };
  });

  // chart settings based on scroll
  const clearTooltips = () => {
    if (isMounted) {
      let tooltips = document.querySelectorAll(".tooltip-container");
      if (tooltips.length > 0) {
        for (var t of tooltips) {
          t.remove();
        }
      }
    }
  };
  let isMounted = false;
  onMount(() => {
    isMounted = true;
  });

  let scrollStep = 0;
  $: scrollStep, clearTooltips();
  $: scrollStep, updateChartSettings(scrollStep);
  let chartSettings = defaultChart;
  let chartZoom = tweened(
    { xRange: defaultChart.xRange, yRange: defaultChart.yRange },
    { duration: 750 }
  );
  const updateChartSettings = scrollStep => {
    let newSettings = scrollStep > 0 ? chartSteps[scrollStep] : defaultChart;
    let newZoom = {
      xRange: newSettings.xRange,
      yRange: newSettings.yRange,
    };
    chartZoom.set(newZoom);
    chartSettings = newSettings;
  };

  $: highlightedIDs =
    scrollStep >= 0 ? props.steps[scrollStep].nameIDs.split(",").map(d => d.replace(" ", "")) : [];

  let vizWidth;
  let vizHeight;
</script>

<div class="container">
  <div class="background">
    <h3 class="body-content viz-title">How many years between death and appearance on banknote?</h3>
    <div class="viz-container" bind:clientHeight={vizHeight} bind:clientWidth={vizWidth}>
      <Chart
        w={vizWidth}
        h={vizHeight}
        zoom={$chartZoom}
        settings={chartSettings}
        showLabels={scrollStep === 0}
        {data}
        {highlightedIDs}
      />
    </div>
  </div>

  <div class="spacer" />
  <Scrolly bind:value={scrollStep}>
    {#each steps as step, i}
      <div class="step-container">
        <div class="narrative-step">
          {#each step.text as paragraph}
            <p class="prose">{@html paragraph}</p>
          {/each}
        </div>
      </div>
    {/each}
  </Scrolly>
  <div class="spacer" />
</div>

<style lang="scss">
  /* * {
    border: solid 1px red;
  } */

  .container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 50px auto;
  }

  .background {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .viz-container {
    height: 80vh;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .step-container {
    width: 100%;
    max-width: 1200px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    :global span {
      padding: 2px 5px;
      border-radius: 5px;
      background-color: var(--color-green);
      color: var(--color-background);
      white-space: nowrap;
    }
  }

  .spacer {
    height: 50vh;
    /* background-color: hotpink; */
    /* border: solid 1px red; */
  }
</style>
