<script>
  import { getContext } from "svelte";
  // import tooltip from "svelte-ktippy";
  import Tooltip from "$components/common/Tooltip.svelte";
  import { tooltip } from "$actions/tooltip";

  const { data, width, height, xScale, yScale } = getContext("LayerCake");

  console.log("data", $data);

  const genTooltip = () => {
    return `<h1 class="test">Test</h1>`;
  };
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
        content: genTooltip(),
        allowHTML: true,
        arrow: true,
      }}
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

  :global(.test) {
    h1 {
      color: hotpink;
    }
  }
</style>
