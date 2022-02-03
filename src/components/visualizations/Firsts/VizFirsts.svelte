<!-- Firsts Section Visualization -->
<script>
  import * as d3 from "d3";
  import { rawData } from "$data/data.js";
  import { uniqWith, isEqual } from "lodash";
  import { LayerCake, Svg } from "layercake";

  import FirstsChart from "./VizFirsts.chart.svelte";

  let data = d3
    .flatGroup(
      uniqWith(
        rawData.map(d => ({
          profession: d.profession,
          name: d.name,
          country: d.country,
          imgBase: d.hasPortrait ? d.id : "A_Unknown",
          knownForBeingFirst: d.knownForBeingFirst,
        })),
        isEqual
      ).filter(d => d.knownForBeingFirst),
      d => d.country
    )
    .map(d => ({ country: d[0], firsts: d[1] }));

  let max = d3.max(data.map(d => d.firsts.length));
</script>

<div class="viz-container">
  <LayerCake
    xScale={d3.scaleBand().paddingInner(0.01)}
    xDomain={[...Array(max).keys()]}
    yScale={d3.scaleBand().paddingInner(0.05)}
    yDomain={data.map(d => d.country).reverse()}
    padding={{ top: 20, bottom: 20, left: 200, right: 50 }}
    {data}
  >
    <Svg>
      <FirstsChart />
    </Svg>
  </LayerCake>
</div>

<style>
  .viz-container {
    width: 100%;
    max-width: 1800px;
    height: 100vh;
    margin: 0 auto;
    /* background-color: coral; */
  }
</style>
