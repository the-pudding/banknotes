<script>
  import * as d3 from "d3";
  import { getContext } from "svelte";
  const { data, xScale, height, xRange, xDomain, yScale, yRange, yDomain } =
    getContext("LayerCake");

  const r = 10;
  console.log($yRange);

  $: newDeathPts = [
    [$xRange[0], $height * 0.1],
    [$xRange[1], $height * 0.1],
    [$xRange[1], $height * 0.25],
    [$xRange[0], $height * 0.25],
    [$xRange[0], $height * 0.5],
    [$xRange[1], $height * 0.5],
    [$xRange[1], $height * 0.75],
    [$xRange[0], $height * 0.75],
  ];

  $: pathFn = d3 // <-- make pathFn reactive to changes in width,height (which affect $xScale,$yScale)
    .line()
    .curve(d3.curveBasis)
    .x(d => d[0])
    .y(d => d[1]);

  $: console.log(newDeathPts);
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

<g class="new-death">
  <path d={pathFn(newDeathPts)} stroke="#000" stroke-width={1} fill="none" opacity={0.9} />
</g>
