<script>
  import { tooltip } from "$actions/tooltip";
  import Tooltip from "$components/common/Tooltip.svelte";
  import * as d3 from "d3";
  import { defaultChart } from "./chartSteps.js";
  import { color } from "$data/variables.json";

  export let w;
  export let h;
  export let zoom = { xRange: [0, 0], yRange: [0, 0] };
  export let settings = defaultChart;
  export let data = [];
  export let highlightedIDs = [];
  export let showLabels = false;

  $: yRange = zoom.yRange;
  $: xRange = zoom.xRange;
  $: highlightedData = data.filter(d => highlightedIDs.includes(d.id));
  // $: showLabels = highlightedIDs.includes('TND_Hannibal');

  const margin = { left: 50, right: 100, top: 100, bottom: 100 };

  // scales
  $: yScale = d3
    .scaleLinear()
    .domain(yRange)
    .range([h - margin.bottom, margin.top]);
  $: xScale = d3
    .scaleLinear()
    .domain(xRange)
    .range([margin.left, w - margin.right]);

  $: yMidpt = (yScale.range()[0] - yScale.range()[1]) / 2 + margin.top;
  $: xMidpt = (xScale.range()[1] - xScale.range()[0]) / 2 + margin.left;

  // Ticks
  let yTicks = [0];
  let xTicks = [0];
  $: {
    yTicks = [];
    for (let i = settings.yRange[0]; i < settings.yRange[1]; i = i + settings.yAxisStep) {
      yTicks.push(i);
    }

    xTicks = [];
    for (let i = settings.xRange[0]; i < settings.xRange[1]; i = i + settings.xAxisStep) {
      xTicks.push(i);
    }
  }
</script>

<svg width={w} height={h}>
  <!-- DEFS -->
  <defs>
    <linearGradient id="xGradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color={color.background} stop-opacity="1" />
      <stop offset="80%" stop-color={color.background} stop-opacity="1" />
      <stop offset="95%" stop-color={color.background} stop-opacity="0" />
    </linearGradient>
  </defs>

  <!-- <rect width={w} height={h} fill="#ff0" /> -->
  <!-- ALL DATA -->
  {#each data as d}
    <g class="person {d.id}" opacity=".2">
      <circle cx={xScale(d.issueDate)} cy={yScale(d.elapsed)} r={5} fill={color.brown} />
      <circle cx={xScale(d.deathDate)} cy={yScale(d.elapsed)} r={5} fill={color.brown} />
      <line
        x1={xScale(d.issueDate)}
        y1={yScale(d.elapsed)}
        x2={xScale(d.deathDate)}
        y2={yScale(d.elapsed)}
        stroke={color.brown}
      />
    </g>
  {/each}

  <!-- HIGHLIGHTED DATA -->
  {#each highlightedData as d (`${d.id}_${d.country}`)}
    {@const name = d.name}
    {@const imgBase = d.imgBase}
    <g class="highlighted-person" opacity="1" use:tooltip={{
      component: Tooltip,
      props: { name, imgBase },
    }}>
      <line
        x1={xScale(d.issueDate)}
        y1={yScale(d.elapsed)}
        x2={xScale(d.deathDate)}
        y2={yScale(d.elapsed)}
        stroke={color.green}
        stroke-width={4}
      />
      <circle
        cx={xScale(d.issueDate)}
        cy={yScale(d.elapsed)}
        r={8}
        fill={color.background}
        stroke={color.green}
        stroke-width={4}
      />
      <circle
        cx={xScale(d.deathDate)}
        cy={yScale(d.elapsed)}
        r={8}
        fill={color.background}
        stroke={color.green}
        stroke-width={4}
      />
    </g>

    {#if showLabels}
      <text
        class="annotation" 
        x={xScale(d.deathDate)}
        y={yScale(d.elapsed)-16}
        text-anchor="start"
      >Died</text>
      <text 
        class="annotation" 
        x={xScale(d.issueDate)}
        y={yScale(d.elapsed)-16}
        text-anchor="end"
      >Appeared on banknote</text>
    {/if}
  {/each}

  <!-- GRADIENTS -->
  <rect width={w} height={margin.top} fill="url(#xGradient)" />

  <!-- AXES -->
  <g class="axis y-axis" transform="translate({w - margin.right}, 0)">
    <text class="axis-label" text-anchor="middle" transform="translate(70, {yMidpt}) rotate(-90)"
      >Number of years between death and banknote appearance</text
    >
    <!-- <line x1="0" y1={yScale(yRange[0])} x2="0" y2={yScale(yRange[1])} /> -->
    {#each yTicks as yTick}
      <g class="tick" transform="translate(0, {yScale(yTick)})">
        <text text-anchor="start" dominant-baseline="middle" x="5">{yTick}</text>
      </g>
    {/each}
  </g>

  <g class="axis x-axis" transform="translate(0, {margin.top})">
    <text class="axis-label" text-anchor="middle" transform="translate({xMidpt}, -60)">Year</text>
    {#each xTicks as xTick}
      {@const label = xTick < 0 ? `${xTick * -1} BCE` : xTick}
      <g class="tick" transform="translate({xScale(xTick)},0)">
        <text text-anchor="middle" dominant-baseline="bottom" y="-7">{label}</text>
      </g>
    {/each}
  </g>

  <!-- ANNOTATIONS -->
  <text class="annotation" x={xScale.range()[1]/2} dy="-10" y={yScale(0)} text-anchor="middle">died before appearing ↑</text>
  <text class="annotation" x={xScale.range()[1]/2} dy="10" y={yScale(0)} dominant-baseline="hanging" text-anchor="middle">alive while appearing ↓</text>

  <line
    class="zero-line"
    x1={xScale.range()[0]}
    x2={xScale.range()[1]}
    y1={yScale(0)}
    y2={yScale(0)}
    stroke="#000"
  />
</svg>

<style lang=scss>
  .axis {
    stroke: var(--color-gray-dark);
  }

  .annotation {
    text-transform: uppercase;
    opacity: .5;
    font-family: "ABeeZee";
    font-weight: 500;
  }

  .axis-label {
    text-transform: uppercase;
    opacity: .5;
    font-size: 18px;
    font-family: "ABeeZee";
    font-weight: 500;
  }

  .highlighted-person {
    cursor: pointer;
    
    &:hover {
      opacity: .5;
    }
  }
</style>
