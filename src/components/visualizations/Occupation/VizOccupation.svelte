<!-- Occupation Section Visualization -->
<script>
  import { getContext } from "svelte";
  import * as d3 from "d3";
  import { rawData } from "$data/data.js";
  import { uniqWith, isEqual, camelCase } from "lodash";

  import Group from "./VizOccupation.group.svelte";

  const { copy } = getContext("App");
  const occupationDefs = copy.sections.occupation.find(d => d.type === "viz").value.occupationDefs;

  let data = d3
    .flatGroup(
      uniqWith(
        // get unique names-profession combo from raw Data
        rawData.map(d => ({
          profession: d.profession,
          name: d.name,
          country: d.country,
          imgBase: d.hasPortrait ? d.id : "A_Unknown",
        })),
        isEqual
      ),
      d => d.profession
    )
    .map(d => ({ occupation: d[0], key: camelCase(d[0]), count: d[1].length, members: d[1] }))
    .sort((a, b) => d3.descending(a.count, b.count));

  let currentDef = "";
  const handleGroupSelect = e => {
    let selectedOccupation = e.detail;
    currentDef = selectedOccupation === "" ? "" : occupationDefs[selectedOccupation];
  };
</script>

<div class="container">
  <div class="annotation-container">
    <div class="annotation">{@html currentDef}</div>
  </div>

  <div class="viz-container">
    {#each data as { occupation, key, members }}
      <Group on:setGroup={handleGroupSelect} {occupation} {key} {members} />
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 150px auto;
    display: flex;
  }

  .annotation-container {
    flex: 1;
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */

    .annotation {
      position: sticky;
      top: 50%;
      width: 80%;
      margin: 0 auto;
      font-size: 24px;

      :global b {
        color: var(--color-green);
      }
    }
  }

  .viz-container {
    flex: 2;
  }
</style>
