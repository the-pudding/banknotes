<script>
  import { getContext } from "svelte";
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import { rawData } from "$data/data.js";
  import { uniqWith, isEqual } from "lodash";
  import { LayerCake, Svg } from "layercake";

  // get steps array from copy
  const { copy } = getContext("App");
  const steps = copy.sections.issueDate.find(d => d.type === "viz").value.steps;

  // scrolly
  let scrollStep = 0;
</script>

<div class="viz-container">
  <div class="background" />
  <div class="spacer" />
  <Scrolly bind:value={scrollStep}>
    {#each steps as step, i}
      <div class="step" class:active={scrollStep === i}>{@html step}</div>
    {/each}
  </Scrolly>
  <div class="spacer" />
</div>

<style>
  .viz-container {
    position: relative;
    width: 100%;
  }

  .background {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    background: hotpink;
  }

  .step {
    position: relative;
    width: 50vw;
    height: 80vh;
    margin: 10vh auto;
    background: indigo;
    color: white;
  }

  .spacer {
    height: 125vh;
  }
</style>
