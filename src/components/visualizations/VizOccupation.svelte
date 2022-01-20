<!-- Occupation Section Visualization -->
<script>
  import * as d3 from "d3";
  import { rawData } from "$data/data.js";
  import { uniqWith, isEqual } from "lodash";

  let data = d3
    .flatRollup(
      // count entries by unique profession
      uniqWith(
        // get unique names-profession combo from raw Data
        rawData.map(d => ({ name: d.name, profession: d.profession })),
        isEqual
      ),
      v => v.length,
      d => d.profession
    )
    .map(d => ({ profession: d[0], count: d[1] }))
    .sort((a, b) => d3.descending(a.count, b.count)); // most frequent profession first
</script>

<div class="viz-container" />

<style>
  .viz-container {
    width: 100%;
    height: 100vh;
    background-color: turquoise;
  }
</style>
