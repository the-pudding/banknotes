<script>
  import * as d3 from "d3";
  import { dodge } from "$utils/utils";

  import IssueAxis from "./VizIssueDate.issueAxis.svelte";
  import DeathAxis from "./VizIssueDate.deathAxis.svelte";

  export let width = 0;
  export let height = 0;
  export let data = [];
  export let highlightedIDs = [];

  let margin = { left: 0, right: 20, top: 0, bottom: 20 };
  const r = 4;

  // --- ISSUE DATE AXIS
  let issueTicks = [1875, 1900, 1925, 1950, 1975, 2000, 2021];
  $: issueY = height * 0.22;
  $: issueScale = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.issueDate))
    .range([width * 0.5, width - margin.right]);

  // --- DEATH DATE AXIS
  let deathAxisRef;
  let deathPathLength = 0;
  let deathScale = d3 // <- convert year to a percent that can be used to find pt along death path
    .scaleLinear()
    .domain([1150, 2021])
    .range([0, 1]);
  let deathTicks = [];

  $: if (deathPathLength > 0) {
    const flipYears = [1400, 1600, 1800, 1900, 1925, 1950, 1975, 2000];
    deathTicks = [1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 1925, 1950, 1975, 2000].map(
      year => {
        const pt = deathAxisRef.getDeathPt(year);
        const flip = flipYears.includes(year);
        return {
          year,
          offset: (1 - deathScale(year)) * 100,
          x: pt.x,
          y: pt.y,
          translate: flip ? `(${pt.x * 2}, ${pt.y * 2})` : "(0,0)",
          scale: flip ? "(-1,-1)" : "(1,1)",
          yOffset: flip ? -15 : 15,
        };
      }
    );
  }

  // --- DATA
  let people = [];
  $: issueYs = dodge(
    data.map(d => issueScale(d.issueDate)),
    r * 2
  );
  $: if (deathPathLength > 0) {
    //
    // position all of the circles;
    people = data.map((d, i) => ({
      ...d,
      issuePt: { x: issueScale(d.issueDate), y: issueY - issueYs[i] - 10 },
      deathPt: deathAxisRef.getDeathPt(d.deathDate),
    }));
  }
  $: highlightedData =
    highlightedIDs.length > 0 ? people.filter(d => highlightedIDs.includes(d.id)) : [];

  // --- HOVER EVENTS
  const handleHover = id => {
    highlightedData = highlightedData.map(d => ({ ...d, hovered: d.id === id }));
  };
</script>

<svg {width} {height}>
  <!-- <rect x="0" y="0" {width} {height} fill="none" stroke="red" /> -->
  <DeathAxis
    bind:this={deathAxisRef}
    bind:pathLength={deathPathLength}
    {width}
    {height}
    {margin}
    scale={deathScale}
    ticks={deathTicks}
  />

  <!-- DRAW EVERYBODY -->
  {#if highlightedData.length === 0}
    {#each people as d, i}
      <line
        x1={d.issuePt.x}
        y1={d.issuePt.y}
        x2={d.deathPt.x}
        y2={d.deathPt.y}
        stroke="#ccc"
        opacity={0.7}
      />
    {/each}
  {/if}

  {#each people as d, i}
    <!-- issued circle -->
    <circle
      class={highlightedData.length === 0 ? "circle active" : "circle inactive"}
      cx={d.issuePt.x}
      cy={d.issuePt.y}
      {r}
    />
    <!-- death circle -->
    <circle
      class={highlightedData.length === 0 ? "circle active" : "circle inactive"}
      cx={d.deathPt.x}
      cy={d.deathPt.y}
      {r}
    />
  {/each}

  <!-- DRAW HIGHLIGHTED ONES -->
  {#each highlightedData as d, i}
    <line
      x1={d.issuePt.x}
      y1={d.issuePt.y}
      x2={d.deathPt.x}
      y2={d.deathPt.y}
      stroke="#ccc"
      stroke-width={d.hovered ? 3 : 1}
      opacity={d.hovered ? 1 : 0.5}
    />
  {/each}

  {#each highlightedData as d, i}
    <!-- issued circle -->
    <circle
      on:mouseover={() => handleHover(d.id)}
      on:focus={() => handleHover(d.id)}
      on:mouseleave={() => handleHover(null)}
      class="circle highlighted"
      cx={d.issuePt.x}
      cy={d.issuePt.y}
      r={d.hovered ? r * 2.4 : r * 1.4}
    />
    <!-- death circle -->
    <circle
      on:mouseover={() => handleHover(d.id)}
      on:focus={() => handleHover(d.id)}
      on:mouseleave={() => handleHover(null)}
      class="circle highlighted"
      cx={d.deathPt.x}
      cy={d.deathPt.y}
      r={d.hovered ? r * 2.4 : r * 1.4}
    />
  {/each}
  <IssueAxis scale={issueScale} yPos={issueY} yearRange={[1869, 2021]} ticks={issueTicks} />
</svg>

<style lang="scss">
  .issue-axis-label {
    font-size: 24px;
    font-style: italic;
    fill: var(--color-gray-dark);
  }

  .circle {
    fill: var(--color-green);
    stroke: #fff;

    &.active {
      fill: var(--color-green);
      opacity: 0.8;
    }

    &.inactive {
      fill: #ccc;
      opacity: 0.4;
    }

    &.highlighted {
      cursor: pointer;
    }
  }
</style>
