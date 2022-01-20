<!-- Firsts Section Visualization -->
<script>
  import * as d3 from "d3";
  import { rawData } from "$data/data.js";
  import { uniqWith, isEqual } from "lodash";
  import { LayerCake, Svg } from "layercake";

  import DenominationsChart from "./VizDenominations.chart.svelte";

  let currentSort = "gender";

  let data = rawData;
</script>

<div class="viz-container">
  <LayerCake padding={{ top: 20, bottom: 20, left: 50, right: 50 }} {data}>
    <Svg>
      <DenominationsChart />
    </Svg>
  </LayerCake>
</div>

<style>
  .viz-container {
    width: 100%;
    max-width: 1800px;
    height: 100vh;
    margin: 0 auto;
    background-color: greenyellow;
  }
</style>
