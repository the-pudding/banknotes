<script>
  import { getContext } from "svelte";
  import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";

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
    F: "#ccc",
    M: "#aaa",
  };
</script>

<g class="x-axis">
  {#each xLabels as { label, x }}
    <text {x} y="0" text-anchor="middle">{label}</text>
  {/each}
</g>

<g class="y-axis">
  {#each yLabels as { label, y }}
    <text {y} x="-65" dominant-baseline="middle" text-anchor="end">{label}</text>
  {/each}
</g>

<g class="data-container">
  {#each nodes as node}
    <circle fill={colors[node.gender]} cx={node.x} cy={node.y} {r} />
  {/each}
</g>

<style>
  .x-axis {
    font-size: 24px;
    font-style: italic;
    text-transform: capitalize;
    fill: var(--color-green);
  }
</style>
