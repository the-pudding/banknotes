<script>
  export let scale;
  export let yPos = 0;
  export let yearRange = [0, 0];
  export let ticks = [];
</script>

<!-- ISSUE AXIS -->
<g class="issue-axis">
  <line
    x1={scale(yearRange[0])}
    y1={yPos}
    x2={scale(yearRange[1])}
    y2={yPos}
    stroke="#000"
    stroke-width={1}
    fill="none"
  />
  {#each ticks as tick}
    <line
      x1={scale(tick)}
      y1={yPos}
      x2={scale(tick)}
      y2={yPos + 5}
      stroke="#000"
      stroke-width={1}
      fill="none"
    />
    <text x={scale(tick)} y={yPos + 10} dominant-baseline="hanging" text-anchor="middle"
      >{tick}
    </text>
  {/each}
  <text
    class="issue-axis-label"
    x={scale(1860)}
    y={yPos}
    dominant-baseline="middle"
    text-anchor="end"
    >Issue Date
  </text>
</g>
