<script>
  import * as d3 from "d3";
  import { getContext } from "svelte";
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import { rawData } from "$data/data.js";
  import { uniqWith, isEqual } from "lodash";
  import { LayerCake, Svg } from "layercake";

  import IssueDateChart from "./VisIssueDate.chart.svelte";

  // get steps array from copy
  const { copy } = getContext("App");
  const steps = copy.sections.issueDate.find(d => d.type === "viz").value.steps;

  // prep data
  let data = uniqWith(
    // get unique names from rawData
    rawData.map(d => ({ name: d.name, issueDate: d.firstAppearanceDate, deathDate: d.deathDate })),
    isEqual
  );
  const yearRange = d3.extent([...data.map(d => d.issueDate), ...data.map(d => d.deathDate)]);

  // scrolly
  let scrollStep = 0;
</script>

<div class="container">
  <div class="background">
    <div class="viz-container">
      <LayerCake
        yScale={d3.scalePoint().padding(0.1)}
        yDomain={["Death", "Issued"]}
        xDomain={yearRange}
        padding={{ top: 20, bottom: 20, left: 100, right: 100 }}
        {data}
      >
        <Svg>
          <IssueDateChart />
        </Svg>
      </LayerCake>
    </div>
  </div>

  <div class="spacer" />
  <Scrolly bind:value={scrollStep}>
    {#each steps as step, i}
      <div class="step" class:active={scrollStep === i}>{@html step}</div>
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
    height: 800px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .step {
    position: relative;
    width: 50vw;
    height: 40vh;
    margin: 80vh auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    background: var(--color-green);
    color: white;
    opacity: 0.7;
  }

  .spacer {
    height: 25vh;
    /* background-color: hotpink; */
  }
</style>
