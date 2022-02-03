<script>
  import { getContext } from "svelte";
  import { tooltip } from "$actions/tooltip";
  import Tooltip from "$components/common/Tooltip.svelte";

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
      use:tooltip={{
        component: Tooltip,
        props: {
          name: first.name,
          country: first.country,
          text: first.hoverText,
          imgBase: first.imgBase,
        },
      }}
      title="test"
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
    cursor: pointer;

    &:hover {
      fill: var(--color-green);
    }
  }
</style>
