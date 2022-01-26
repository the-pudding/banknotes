<!-- Denominations Section Visualization -->
<script>
  import * as d3 from "d3";
  import { rawData } from "$data/data.js";
  import { normRankBills } from "$utils/dataProcessing";
  import { LayerCake, Svg } from "layercake";

  import DenominationsChart from "./VizDenominations.chart.svelte";

  // prep data
  let data = d3
    .flatGroup(
      rawData.map(d => {
        return {
          billValue: d.currentBillValue,
          country: d.country,
          gender: d.gender,
          occupation: d.profession,
        };
      }),
      d => d.country
    )
    .map(d => normRankBills(d[1]))
    .flat();

  // set up sort controls
  let sortOpts = ["gender", "occupation", "country"];
  let currentSort = "gender";
  const setSort = opt => (currentSort = opt);

  $: console.log(currentSort);
</script>

<div class="viz-container">
  <div class="controls">
    {#each sortOpts as opt}
      <div class="sort-option" class:active={currentSort === opt} on:click={() => setSort(opt)}>
        {opt}
      </div>
    {/each}
  </div>
  <LayerCake padding={{ top: 20, bottom: 20, left: 50, right: 50 }} {data}>
    <Svg>
      <DenominationsChart />
    </Svg>
  </LayerCake>
</div>

<style lang="scss">
  * {
    border: solid 1px red;
  }

  .viz-container {
    width: 100%;
    max-width: 1800px;
    height: 100vh;
    margin: 0 auto;
  }

  .controls {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .sort-option {
    width: 200px;
    height: 50px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    background-color: var(--color-background);
    border-radius: 20px;
    border: solid 1px var(--color-green);
    text-transform: capitalize;
    cursor: pointer;

    &.active {
      background-color: var(--color-green);
      color: white;
    }
  }
</style>
