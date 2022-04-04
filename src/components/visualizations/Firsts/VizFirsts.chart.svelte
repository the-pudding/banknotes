<script>
  import { getContext } from "svelte";
  import { tooltip } from "$actions/tooltip";
  import Tooltip from "$components/common/Tooltip.svelte";
  import { color, category } from "$data/variables.json";
  import { shuffle } from "$utils/utils";

  const { data, width, height, xScale, yScale } = getContext("LayerCake");

  // let rowColors;
  // $: if ($data) {
  //   rowColors = $data.map(d => {
  //     let colorArr = shuffle(colors);
  //     return [...colorArr, ...colorArr];
  //   });
  // }
</script>

{#each $data as { country, firsts }, i}
  <!-- Add the country label -->
  <text
    class="label"
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
          color: first.gender === "M" ? category.male : category.female,
        },
      }}
      title="test"
      x={$xScale(ii)}
      y={$yScale(country)}
      width={$xScale.bandwidth()}
      height={$yScale.bandwidth()}
      fill={first.gender === "M" ? category.male : category.female}
    />
  {/each}
{/each}

<style lang="scss">
  .label {
    font-family: "Baloo Bhai 2", sans-serif;
    font-size: 16px;
  }
  rect {
    cursor: pointer;
    fill-opacity: 1;

    &:hover {
      fill-opacity: 0.4;
    }
  }

  @media screen and (max-width: 600px) {
    .label {
      font-size: 13px;
    }
  }
</style>
