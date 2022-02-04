<script>
  import * as d3 from "d3";
  import { dodge } from "$utils/utils";
  import { getContext } from "svelte";
  const { data, xScale, height, xRange, xDomain, yScale, yRange, yDomain } =
    getContext("LayerCake");

  const r = 5;

  // --- ISSUE DATE
  $: issueY = $height * 0.1;
  $: issueScale = d3
    .scaleLinear()
    .domain(d3.extent($data, d => d.issueDate))
    .range([$xRange[1] * 0.4, $xRange[1]]);

  // -- DEATH DATE
  let deathRef;
  $: deathScale = d3 // <- convert year to a percent that can be used to find pt along death path
    .scaleLinear()
    .domain(d3.extent($data, d => d.deathDate))
    .range([0, 1]);

  let deathLength = 0;
  $: if (deathRef) {
    deathLength = deathRef.getTotalLength();
  }

  $: getDeathPt = year => {
    // return the x,y of the death path at a given year
    if (deathRef) {
      return deathRef.getPointAtLength((1 - deathScale(year)) * deathLength);
    } else {
      return { x: 0, y: 0 };
    }
  };
  $: deathTest = getDeathPt(1869);

  $: deathPts = [
    [$xRange[1], $height * 0.25],
    [$xRange[0], $height * 0.25],
    [$xRange[0], $height * 0.4],
    [$xRange[1] * 0.45, $height * 0.4],
    [$xRange[1] * 0.45, $height * 0.55],
    [$xRange[0], $height * 0.55],
    [$xRange[0], $height * 0.7],
    [$xRange[1] * 0.45, $height * 0.7],
    [$xRange[1] * 0.45, $height * 0.85],
    [$xRange[0], $height * 0.85],
    [$xRange[0], $height * 1],
    [$xRange[1] * 0.45, $height * 1],
  ];

  $: pathFn = d3 // <-- make pathFn reactive to changes in width,height (which affect $xScale,$yScale)
    .line()
    .curve(d3.curveBasis)
    .x(d => d[0])
    .y(d => d[1]);

  // --- Add x,y for positions along both issue and death axes for each data item
  let ptData = [];
  $: if (deathRef) {
    console.log("te3st", getDeathPt(2021));

    ptData = $data.map(d => ({
      ...d,
      deathPt: getDeathPt(d.deathDate),
      issuePt: { x: issueScale(d.issueDate), y: issueY },
    }));
  }

  $: issueYPts = dodge(
    ptData.map(d => d.issuePt.x),
    r * 2
  );
</script>

<g class="axes">
  <g class="issue-axis">
    <line
      x1={issueScale(1869)}
      y1={issueY}
      x2={issueScale(2021)}
      y2={issueY}
      stroke="#000"
      stroke-width={1}
      fill="none"
    />
  </g>

  <g class="death-axis">
    <path
      bind:this={deathRef}
      d={pathFn(deathPts)}
      stroke="#000"
      stroke-width={1}
      fill="none"
      opacity={0.9}
    />

    <!-- <circle cx={deathTest.x} cy={deathTest.y} r="10" fill="#000" /> -->
  </g>
</g>

<!-- draw lines first -->
{#each ptData as d, i}
  <g class="person">
    <!-- connecting line -->
    <line
      x1={d.issuePt.x}
      y1={d.issuePt.y - issueYPts[i]}
      x2={d.deathPt.x}
      y2={d.deathPt.y}
      stroke="#ccc"
      curve={d3.curveBasis}
      opacity={0.3}
    />
  </g>
{/each}

<!-- draw circles -->
{#each ptData as d, i}
  <!-- death circle -->
  <circle class="death-circle" cx={d.deathPt.x} cy={d.deathPt.y} {r} fill="#ccc" stroke="#eee" />

  <!-- issued circle -->
  <circle
    class="issue-circle"
    cx={d.issuePt.x}
    cy={d.issuePt.y - issueYPts[i]}
    {r}
    fill="#ccc"
    stroke="#fff"
  />
{/each}

<style>
  .issue-circle {
    fill: var(--color-green);
    opacity: 1;
  }

  .death-circle {
    fill: var(--color-green);
    opacity: 0.4;
  }
</style>
