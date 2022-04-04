<script>
  import { getContext } from "svelte";
  import { tooltip } from "$actions/tooltip";
  import mq from "$stores/mq.js";
  import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
  import { startCase } from "lodash";
  import { category } from "$data/variables.json";
  import * as d3 from "d3";

  import Tooltip from "$components/common/Tooltip.svelte";
  import { text } from "svelte/internal";

  export let currentSort = "gender";

  const { data, xScale, yScale, yDomain } = getContext("LayerCake");

  // init force sim
  let nodes = $data.map(d => ({ ...d }));
  let r = 7;
  let xStrength = 0.095;
  let yStrength = 0.075;
  let simulation = forceSimulation(nodes)
    .force("collide", forceCollide(r * 1.2).iterations(1))
    .on("tick", () => {
      nodes = nodes;
    });

  // calculate median
  let medians = [];
  $: if ($data) {
    let levels = Array.from(new Set($data.map(d => d[currentSort])));
    medians = levels.map(level => ({
      level,
      median: d3.median(
        $data.filter(d => d[currentSort] === level),
        d => d.normRank
      ),
    }));
  }

  // update sim whenever currentSort changes
  $: currentSort, $xScale, updateSim(currentSort); // <- have to wait for $xScale changes too
  const updateSim = () => {
    simulation.stop();
    simulation
      .force(
        "x",
        forceX()
          .x(d => $xScale(d.normRank))
          .strength(xStrength)
      )
      .force(
        "y",
        forceY()
          .y(d => $yScale(d[currentSort]))
          .strength(yStrength)
      )
      .alphaTarget(0.3)
      .restart();
  };

  // set axes based on current sort
  $: yLabels = $yDomain.map(d => {
    let label = d;
    if (currentSort === "gender") {
      label = d === "M" ? "Male" : "Female";
    }
    return { label, y: $yScale(d) };
  });
  let yLabel_xOffset = -65;
  $: xLabels = [
    { label: "⟵ lower value", x: $mq.sm ? $xScale(0.2) : $xScale(0.3) },
    { label: "higher value ⟶", x: $mq.sm ? $xScale(0.8) : $xScale(0.7) },
  ];

  // color mapping
  const colors = {
    F: category.female,
    M: category.male,
  };

  // mobile
  $: if ($mq.sm) {
    r = 4;
    simulation.stop();
    simulation.force("collide", forceCollide(r * 1.2).iterations(1)).restart();

    yLabel_xOffset = -35;
  }
</script>

<!-- AXES -->
<g class="x-axis">
  {#each xLabels as { label, x }}
    <text class="axis-label" {x} y={$yScale.range()[0] + 50} text-anchor="middle">{label}</text>
  {/each}
</g>

<g class="y-axis">
  {#each yLabels as { label, y }}
    <text class="axis-label" {y} x={yLabel_xOffset} dominant-baseline="middle" text-anchor="end"
      >{label}</text
    >
    <line x1={$xScale(0)} y1={y} x2={$xScale(1)} y2={y} stroke="#ccc" opacity={1} />
  {/each}
</g>

<!-- Medians -->
<g class="medians">
  {#each medians as median}
    <line
      class="median"
      x1={$xScale(median.median)}
      x2={$xScale(median.median)}
      y1={$yScale(median.level) + $yScale.range()[0] * 0.15}
      y2={$yScale(median.level) - $yScale.range()[0] * 0.15}
      stroke="#ccc"
      stroke-dasharray="4"
    />
    <text
      x={$xScale(median.median)}
      y={$yScale(median.level) - 5 - $yScale.range()[0] * 0.15}
      text-anchor="middle"
      fill="#ccc">median</text
    >
  {/each}
</g>

<!-- DATA -->
<g class="data-container">
  {#each nodes as node}
    <circle
      use:tooltip={{
        component: Tooltip,
        props: {
          name: node.name,
          country: node.country,
          text: `${node.billValue} (${startCase(node.currency)})`,
          imgBase: node.imgBase,
          color: colors[node.gender],
        },
      }}
      fill={colors[node.gender]}
      cx={node.x}
      cy={node.y}
      {r}
    />
  {/each}
</g>

<style lang="scss">
  .medians {
    font-family: "Baloo Bhai 2", sans-serif;
  }

  .axis-label {
    font-family: "Baloo Bhai 2", sans-serif;
  }

  .x-axis {
    font-size: 24px;
    font-style: italic;
    text-transform: capitalize;
    fill: var(--color-gray-dark);
  }

  circle {
    cursor: pointer;

    &:hover {
      stroke-width: 3px;
      stroke: var(--color-green);
    }
  }

  @media screen and (max-width: 600px) {
    .x-axis {
      font-size: 16px;
    }
  }
</style>
