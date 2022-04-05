<!-- Occupation Section Visualization -->
<script>
  import { onMount } from "svelte";
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import * as d3 from "d3";
  import { rawData } from "$data/data.js";
  import { uniqWith, isEqual } from "lodash";
  import mq from "$stores/mq.js";
  import camelCase from "lodash/camelCase.js"; // <-- get around sveltekit build bug

  import Group from "./VizOccupation.group.svelte";

  export let props = {};

  // prep data
  let data = d3
    .flatGroup(
      uniqWith(
        // get unique names-profession combo from raw Data
        rawData.map(d => ({
          id: d.id,
          gender: d.gender,
          profession: d.profession,
          name: d.name,
          imgBase: d.hasPortrait ? d.id : "A_Unknown",
        })),
        isEqual
      ),
      d => d.profession
    )
    .map(d => ({
      occupation: d[0],
      key: camelCase(d[0]),
      count: d[1].length,
      members: d[1].sort((a, b) => d3.ascending(a.gender, b.gender)),
    }))
    .sort((a, b) => d3.descending(a.count, b.count));

  // scroll steps
  const steps = props.steps.map((d, i) => {
    // make array of text blocks
    let text = Object.keys(d)
      .filter(dd => dd.indexOf("text") === 0)
      .map(key => d[key]);

    // get the ids of individuals to highlight on this step
    let highlightedIDs;
    if (i === 0) {
      // writers
      highlightedIDs = (data.find(dd => dd.key === "writer") || {}).members.map(dd => dd.id);
    } else if (i === 7) {
      // all
      highlightedIDs = data.map(d => d.members.map(dd => dd.id)).flat();
    } else {
      highlightedIDs = d.nameIDs.replace(" ", "").split(",");
    }
    return {
      showNames: i === 0,
      highlightedIDs,
      text,
    };
  });

  // Scrolly
  const clearTooltips = () => {
    if (isMounted) {
      let tooltips = document.querySelectorAll(".tooltip-container");
      if (tooltips.length > 0) {
        for (var t of tooltips) {
          t.remove();
        }
      }
    }
  };
  let isMounted = false;
  onMount(() => {
    isMounted = true;
  });

  let scrollStep = 0;
  let highlightedIDs;
  $: if (scrollStep !== undefined) {
    highlightedIDs = steps[scrollStep].highlightedIDs;
  } else {
    highlightedIDs = [];
  }

  $: scrollStep, clearTooltips();

  $: hoverAction = $mq.sm ? "Click" : "Hover over";
</script>

<div class="container">
  <div class="background">
    <h3 class="body-content viz-title">Occupations of individuals portrayed on banknotes</h3>
    <div class="hover-tip">
      <div>{`${hoverAction} the circles to see the names of each individual`}</div>
    </div>
    <div class="viz-container">
      {#each data as { occupation, key, members }}
        <Group {occupation} {key} {members} {highlightedIDs} />
      {/each}
    </div>
  </div>

  <Scrolly bind:value={scrollStep}>
    {#each steps as step, i}
      <div class="step-container">
        <div class="narrative-step">
          {#each step.text as paragraph}
            <p class="prose">{@html paragraph}</p>
          {/each}
        </div>
      </div>
    {/each}
  </Scrolly>
</div>

<style lang="scss">
  .container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 50px auto;
  }

  .background {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .viz-container {
    height: 100%;
    max-height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .step-container {
    width: 100%;
    max-width: 1200px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    :global span {
      padding: 2px 5px;
      border-radius: 5px;
      white-space: nowrap;

      &.male {
        background-color: var(--category-male);
        color: var(--color-background);
      }

      &.female {
        background-color: var(--category-female);
      }
    }
  }

  @media screen and (max-width: 600px) {
    .viz-container {
      max-height: 600px;
      width: 90vw;
      margin: 0 auto;
      overflow: hidden;
    }
  }
</style>
