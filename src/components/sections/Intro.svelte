<script>
  import { getContext } from "svelte";
  import { getComponent } from "$utils/componentMap";

  const { copy } = getContext("App");
  const { intro: introCopy } = copy.sections;

  // construct array of components based on array of copy entries
  const components = introCopy.map(entry => getComponent(entry));
</script>

{#each components as { cmp, props }}
  <svelte:component this={cmp} {...props} />
{/each}
