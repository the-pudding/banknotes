<!-- Firsts Section Visualization -->
<script>
  import * as d3 from "d3";
  import { rawData } from "$data/data.js";
  import { uniqWith, isEqual } from "lodash";
  import mq from "$stores/mq.js";
  import { LayerCake, Svg } from "layercake";

  import FirstsChart from "./VizFirsts.chart.svelte";

  let data = d3
    .flatGroup(
      uniqWith(
        rawData.map(d => ({
          profession: d.profession,
          name: d.name,
          gender: d.gender,
          country: d.country,
          imgBase: d.hasPortrait ? d.id : "A_Unknown",
          knownForBeingFirst: d.knownForBeingFirst,
          hoverText: d.hoverText,
        })),
        isEqual
      ).filter(d => d.knownForBeingFirst),
      d => d.country
    )
    .map(d => ({ country: d[0], firsts: d[1].sort((a, b) => d3.ascending(a.gender, b.gender)) }));

  let padding = { top: 20, bottom: 20, left: 200, right: 50 };
  $: if ($mq.sm) {
    padding = { top: 20, bottom: 60, left: 125, right: 10 };
  }

  let max = d3.max(data.map(d => d.firsts.length));
</script>

<div class="viz-container">
  <h3 class="body-content viz-title">Notable "Firsts" Honored on Bankotes</h3>
  <div class="hover-tip">Hover over the rectangles to to see why each person was a "first"</div>
  <LayerCake
    xScale={d3.scaleBand().paddingInner(0.01)}
    xDomain={[...Array(max).keys()]}
    yScale={d3.scaleBand().paddingInner(0.05)}
    yDomain={data.map(d => d.country).reverse()}
    {padding}
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
    max-width: 1200px;
    height: 80vh;
    min-height: 800px;
    margin: 120px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 600px) {
    .viz-container {
      margin: 15px auto;
    }

    /* * {
      border: solid 1px red;
    } */
  }
</style>
