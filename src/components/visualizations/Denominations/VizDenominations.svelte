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

  $: yDomain = Array.from(new Set(data.map(d => d[currentSort]))).sort((a, b) =>
    d3.descending(a, b)
  );
</script>

<div class="container">
  <div class="controls">
    {#each sortOpts as opt}
      <div class="sort-option" class:active={currentSort === opt} on:click={() => setSort(opt)}>
        {opt}
      </div>
    {/each}
  </div>
  <div class="viz-container">
    <LayerCake
      xDomain={[0, 1]}
      yScale={d3.scalePoint().padding(0.9)}
      padding={{ top: 50, bottom: 20, left: 200, right: 200 }}
      {yDomain}
      {data}
    >
      <Svg>
        <DenominationsChart {currentSort} />
      </Svg>
    </LayerCake>
  </div>
</div>

<style lang="scss">
  .container {
    width: 100%;
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
  }

  .viz-container {
    width: 100%;
    height: 800px;
  }

  .controls {
    position: relative;
    z-index: 1;
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
