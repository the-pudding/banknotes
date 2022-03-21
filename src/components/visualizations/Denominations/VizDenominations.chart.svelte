<script>
  import { getContext } from "svelte";
  import { tooltip } from "$actions/tooltip";
  import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
  import { startCase } from "lodash";
  import { category } from "$data/variables.json";

  import Tooltip from "$components/common/Tooltip.svelte";

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
  $: yLabels = $yDomain.map(d => ({ label: d, y: $yScale(d) }));
  $: xLabels = [
    { label: "⟵ lower value", x: $xScale(0.3) },
    { label: "higher value ⟶", x: $xScale(0.7) },
  ];

  // color mapping
  const colors = {
    F: category.female,
    M: category.male,
  };
</script>

<g class="x-axis">
  {#each xLabels as { label, x }}
    <text {x} y={$yScale.range()[0] + 50} text-anchor="middle">{label}</text>
  {/each}
</g>

<g class="y-axis">
  {#each yLabels as { label, y }}
    <text {y} x="-65" dominant-baseline="middle" text-anchor="end">{label}</text>
    <line x1={$xScale(0)} y1={y} x2={$xScale(1)} y2={y} stroke="#ccc" opacity={1} />
  {/each}
</g>

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
</style>
