<script>
  import * as d3 from "d3";
  import { getContext } from "svelte";
  const { data, xScale, xRange, xDomain, yScale, yDomain } = getContext("LayerCake");

  const r = 10;
  console.log($data);
</script>

<g class="axes">
  {#each $yDomain as axisLabel}
    <line
      x1={$xRange[0]}
      x2={$xRange[1]}
      y1={$yScale(axisLabel)}
      y2={$yScale(axisLabel)}
      stroke="#ccc"
    />
    <text
      class="axis-label"
      x={$xRange[0] - 10}
      y={$yScale(axisLabel)}
      text-anchor="end"
      dominant-baseline="middle">{axisLabel}</text
    >
  {/each}
</g>

{#each $data as d}
  <g class="person" style:opacity="0.2">
    <!-- death circle -->
    <circle cx={$xScale(d.deathDate)} cy={$yScale("Death")} {r} fill="#ccc" stroke="#aaa" />

    <!-- issued circle -->
    <circle cx={$xScale(d.issueDate)} cy={$yScale("Issued")} {r} fill="#ccc" stroke="#aaa" />

    <!-- connecting line -->
    <line
      x1={$xScale(d.deathDate)}
      x2={$xScale(d.issueDate)}
      y1={$yScale("Death")}
      y2={$yScale("Issued")}
      stroke="#ccc"
      curve={d3.curveBasis}
    />
  </g>
{/each}
