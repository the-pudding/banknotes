<!-- Generic Section component. 
Walks through the copy json for this component and grabs the components
and props for each part
-->
<script>
  import { getComponent } from "$utils/componentMap";
  export let copy;

  // construct array of components based on array of copy entries
  const components = copy.map(entry => getComponent(entry));
</script>

{#each components as { cmp, props }}
  <svelte:component this={cmp} {...props} />
{/each}
