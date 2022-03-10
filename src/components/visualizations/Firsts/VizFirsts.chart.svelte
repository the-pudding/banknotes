<script>
  import { getContext } from "svelte";
  import { tooltip } from "$actions/tooltip";
  import Tooltip from "$components/common/Tooltip.svelte";
  import { color } from "$data/variables.json";
  import { shuffle } from "$utils/utils";

  let { green, yellow, orange, brown, red } = color;
  let colors = [green, yellow, orange, brown, red];

  const { data, width, height, xScale, yScale } = getContext("LayerCake");

  let rowColors;
  $: if ($data) {
    rowColors = $data.map(d => {
      let colorArr = shuffle(colors);
      return [...colorArr, ...colorArr];
    });
  }
</script>

{#each $data as { country, firsts }, i}
  <!-- Add the country label -->
  <text
    x={$xScale(0) - 5}
    y={$yScale(country) + $yScale.bandwidth() / 2}
    text-anchor="end"
    dominant-baseline="middle">{country}</text
  >

  <!-- Add the rects for each first for this country -->
  {#each firsts as first, ii}
    <rect
      use:tooltip={{
        component: Tooltip,
        props: {
          name: first.name,
          country: first.country,
          text: first.hoverText,
          imgBase: first.imgBase,
          color: rowColors[i][ii],
        },
      }}
      title="test"
      x={$xScale(ii)}
      y={$yScale(country)}
      width={$xScale.bandwidth()}
      height={$yScale.bandwidth()}
      fill={rowColors[i][ii]}
    />
  {/each}
{/each}

<style lang="scss">
  rect {
    cursor: pointer;
    fill-opacity: 0.4;

    &:hover {
      fill-opacity: 1;
    }
  }
</style>
