<script>
  import * as d3 from "d3";
  import { dodge } from "$utils/utils";
  import { getContext, tick } from "svelte";

  export let highlightedIDs = [];

  const { data, height, xRange } = getContext("LayerCake");
  const r = 5;

  // --- People Data
  let people = [];

  // --- ISSUE DATE
  let issueTicks = [1875, 1900, 1925, 1950, 1975, 2000, 2021];
  $: issueY = $height * 0.1;
  $: issueScale = d3
    .scaleLinear()
    .domain(d3.extent($data, d => d.issueDate))
    .range([$xRange[1] * 0.4, $xRange[1]]);

  // --- DEATH DATE
  let deathPathRef;
  let deathPathLength = 0;
  let deathTicks = [1300, 1400, 1500, 1600, 1700, 1800, 1900, 1950, 2020];
  const deathPathFn = d3
    .line()
    .curve(d3.curveBasis)
    .x(d => d[0])
    .y(d => d[1]);

  $: deathScale = d3 // <- convert year to a percent that can be used to find pt along death path
    .scaleLinear()
    .domain(d3.extent($data, d => d.deathDate))
    .range([0, 1]);

  $: deathPts = [
    [$xRange[1], $height * 0.2],
    [$xRange[0], $height * 0.2],
    [$xRange[0], $height * 0.3],
    [$xRange[1] * 0.5, $height * 0.3],
    [$xRange[1] * 0.5, $height * 0.4],
    [$xRange[0], $height * 0.4],
    [$xRange[0], $height * 0.5],
    [$xRange[1] * 0.5, $height * 0.5],
    [$xRange[1] * 0.5, $height * 0.6],
    [$xRange[0], $height * 0.6],
    [$xRange[0], $height * 0.7],
    [$xRange[1] * 0.5, $height * 0.7],
    [$xRange[1] * 0.5, $height * 0.8],
    [$xRange[0], $height * 0.8],
    [$xRange[0], $height * 0.9],
    [$xRange[1] * 0.5, $height * 0.9],
    [$xRange[1] * 0.5, $height * 1],
    [$xRange[1] * 0.3, $height * 1],
  ];

  $: $height, $data, update();

  const update = async () => {
    if (deathPathRef) {
      console.log("here");

      await tick(); // <- necessary for deathPathRef to get updated first
      deathPathLength = deathPathRef.getTotalLength();

      const getDeathPt = year => {
        let length = (1 - deathScale(year)) * deathPathLength;
        return deathPathRef.getPointAtLength(length);
      };

      deathTicks = deathTicks.map(year => {
        const pt = getDeathPt(year);
        return {
          year,
          offset: (1 - deathScale(year)) * 100,
          x: pt.x,
          y: pt.y,
        };
      });
      console.log("deathTicks", deathTicks);

      // update locations of where each person lands on both issue and death axes
      people = $data.map(d => ({
        ...d,
        deathPt: getDeathPt(d.deathDate),
        issuePt: { x: issueScale(d.issueDate), y: issueY },
      }));

      // offset the y-pos of each person's issueDate location
      let issueYs = dodge(
        people.map(d => d.issuePt.x),
        r * 2
      );
      people = people.map((d, i) => {
        let issuePt = { x: d.issuePt.x, y: d.issuePt.y - issueYs[i] };
        return { ...d, issuePt };
      });
    }
  };

  update();
</script>

<!-- DEATH AXIS -->
<g class="death-axis">
  <path
    id="death-path"
    bind:this={deathPathRef}
    d={deathPathFn(deathPts)}
    stroke="#000"
    stroke-width={1}
    fill="none"
    opacity={0.9}
  />
  <!-- To flip, translate to 2x the x,y of the position, then scale(-1,-1) -->
  <text dy="-15" transform="translate(1038,384) scale(-1,-1)">
    <textPath
      xlink:href="#death-path"
      text-anchor="middle"
      side="left"
      dominant-baseline="middle"
      startOffset="15%"
      fill="black"
    >
      1950
    </textPath>
  </text>
  <circle cx="519" cy="192" r="5" fill="#f00" />

  <!-- {#each deathTicks as deathTick}
    <text dy="-15" transform-box="fill-box" transform-origin="center">
      <textPath
        xlink:href="#death-path"
        text-anchor="middle"
        side="left"
        dominant-baseline="middle"
        startOffset={`${deathTick.offset}%`}
        fill="black"
      >
        {deathTick.year}
      </textPath>
    </text>
  {/each} -->
</g>

<!-- ISSUE AXIS -->
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
  {#each issueTicks as tick}
    <line
      x1={issueScale(tick)}
      y1={issueY}
      x2={issueScale(tick)}
      y2={issueY + 5}
      stroke="#000"
      stroke-width={1}
      fill="none"
    />
    <text x={issueScale(tick)} y={issueY + 10} dominant-baseline="hanging" text-anchor="middle"
      >{tick}
    </text>
  {/each}
  <text
    class="issue-axis-label"
    x={issueScale(1860)}
    y={issueY}
    dominant-baseline="middle"
    text-anchor="end"
    >Issue Date
  </text>
</g>

<!-- DRAW DATA -->
<!-- NOTHING HIGHLIGHTED -->
{#if highlightedIDs.length == 0}
  {#each people as d, i}
    <line
      x1={d.issuePt.x}
      y1={d.issuePt.y}
      x2={d.deathPt.x}
      y2={d.deathPt.y}
      stroke="#ccc"
      opacity={0.3}
    />
  {/each}

  {#each people as d, i}
    <!-- death circle -->
    <circle class="circle" cx={d.deathPt.x} cy={d.deathPt.y} {r} stroke="#eee" opacity="0.3" />

    <!-- issued circle -->
    <circle class="circle" cx={d.issuePt.x} cy={d.issuePt.y} {r} stroke="#fff" />
  {/each}

  <!-- SPECIFIC PEOPLE HIGHLIGHTED -->
{:else}
  {#each people.filter(d => highlightedIDs.includes(d.id)) as d, i}
    <line
      x1={d.issuePt.x}
      y1={d.issuePt.y}
      x2={d.deathPt.x}
      y2={d.deathPt.y}
      stroke="#ccc"
      opacity={0.7}
    />
  {/each}

  <!-- Sort to make sure highlighted ones drawn on top of others -->
  {#each people.sort( (a, b) => d3.ascending(highlightedIDs.includes(a.id), highlightedIDs.includes(b.id)) ) as d, i}
    <!-- death circle -->
    <circle
      class={highlightedIDs.includes(d.id) ? "circle active" : "circle inactive"}
      cx={d.deathPt.x}
      cy={d.deathPt.y}
      r={highlightedIDs.includes(d.id) ? r * 2 : r}
      stroke="#eee"
      opacity={highlightedIDs.includes(d.id) ? 1 : 0.4}
    />

    <!-- issued circle -->
    <circle
      class={highlightedIDs.includes(d.id) ? "circle active" : "circle inactive"}
      cx={d.issuePt.x}
      cy={d.issuePt.y}
      r={highlightedIDs.includes(d.id) ? r * 1.1 : r}
      stroke="#fff"
      opacity={highlightedIDs.includes(d.id) ? 1 : 0.4}
    />
  {/each}
{/if}

<style lang="scss">
  .issue-axis-label {
    font-size: 24px;
    font-style: italic;
    fill: var(--color-gray-dark);
  }

  .circle {
    fill: var(--color-green);

    &.active {
      fill: var(--color-green);
    }

    &.inactive {
      fill: #ccc;
    }
  }
</style>
