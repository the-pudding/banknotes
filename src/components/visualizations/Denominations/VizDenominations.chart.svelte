<script>
  import { getContext } from "svelte";
  const { data, width, height, xScale, yScale } = getContext("LayerCake");
</script>

<rect x={0} y={0} width={$width} height={$height / 2} fill="red" />
