<script>
  import { setContext } from "svelte";
  import { getComponent } from "$utils/componentMap";

  import Meta from "$components/Meta.svelte";
  import copy from "$data/doc.json";

  // set site copy as context in case any other components need it
  setContext("App", { copy });
  let { meta, content } = copy;

  // construct array of components based on the "type" of each item in content array
  const outline = content.map(item => getComponent(item));
</script>

<Meta title={meta.title} description={meta.description} url={meta.url} />
{#each outline as { cmp, props }, i}
  <svelte:component this={cmp} {...props} />
{/each}
