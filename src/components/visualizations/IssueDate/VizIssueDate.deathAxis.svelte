<script>
  import * as d3 from "d3";
  import { tick } from "svelte";

  export let width = 0;
  export let height = 0;
  export let pathLength = 0;
  export let scale;
  export let margin = { left: 0, right: 0, top: 0, bottom: 0 };
  export let ticks;

  let pathRef;

  const pathFn = d3
    .line()
    .curve(d3.curveBasis)
    .x(d => d[0])
    .y(d => d[1]);

  $: xRange = [margin.left, width - margin.right - margin.left];
  $: yRange = [margin.top, height - margin.top - margin.bottom];
  $: w = xRange[1];
  $: h = yRange[1];

  let pathPts;
  $: width, (pathPts = genPathPts());

  const genPathPts = () => {
    // generate the points to draw the path from
    const nLevels = 5;
    const startingH = 0.35 * h; // <-- start position, as % of height
    const switchW = 0.36 * w; // <-- point where curves switch back, as % of width
    let step = (h - 20 - startingH) / nLevels;

    let pts = [
      [w, startingH],
      [xRange[0], startingH],
    ];
    for (let i = 0; i < nLevels; i++) {
      let thisH = startingH + step * (i + 1);
      if (i % 2 == 0) {
        // left to right
        pts = [...pts, [xRange[0], thisH], [switchW, thisH]];
      } else {
        // right to left
        pts = [...pts, [switchW, thisH], [xRange[0], thisH]];
      }
    }
    return pts;
  };

  $: width, updatePath();
  async function updatePath() {
    if (pathRef) {
      await tick(); // <- necessary for pathRef to get updated to proper length first
      pathLength = pathRef.getTotalLength();
    }
  }

  export const getDeathPt = year => {
    if (pathRef) {
      let length = (1 - scale(year)) * pathLength;
      return pathRef.getPointAtLength(length);
    }
  };
</script>

<!-- DEATH AXIS -->
<g class="death-axis">
  <path
    id="death-path"
    bind:this={pathRef}
    d={pathFn(pathPts)}
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
      fill="red"
    />
  </text>

  {#each ticks as tick}
    <text
      x={tick.x}
      y={tick.y}
      dy={15}
      text-anchor="middle"
      dominant-baseline="hanging"
      fill="black"
    >
      {tick.year}
    </text>
  {/each}

  <text
    class="issue-axis-label"
    x={xRange[1] * 0.45}
    y={yRange[1] - 20}
    dominant-baseline="middle"
    text-anchor="end"
    >Death Date
  </text>
</g>
