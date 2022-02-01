<script>
  import { getContext } from "svelte";
  const { data, width, height, xScale, yScale } = getContext("LayerCake");
</script>

{#each $data as { country, firsts }}
  <!-- Add the country label -->
  <text
    x={$xScale(0) - 5}
    y={$yScale(country) + $yScale.bandwidth() / 2}
    text-anchor="end"
    dominant-baseline="middle">{country}</text
  >

  <!-- Add the rects for each first for this country -->
  {#each firsts as first, i}
    <rect
      x={$xScale(i)}
      y={$yScale(country)}
      width={$xScale.bandwidth()}
      height={$yScale.bandwidth()}
      fill="#ccc"
    />
  {/each}
{/each}

<style lang="scss">
  rect {
    &:hover {
      fill: #aaa;
    }
  }
</style>
