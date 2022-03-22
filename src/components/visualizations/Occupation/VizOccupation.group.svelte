<script>
  import { tooltip } from "$actions/tooltip";
  import Tooltip from "$components/common/Tooltip.svelte";
  import { rawData } from "$data/data.js";
  import * as d3 from "d3";

  export let members = [];
  export let key = "";
  export let occupation = "";
  export let highlightedIDs = [];

  import { color, category } from "$data/variables.json";

  /* absurd way to get country for each member, but necessary since the same individuals existing 
  in two countries banknotes has been dealt with by the parent component
  */
  members = members.map(d => {
    let matches = rawData.filter(dd => dd.id === d.id);
    let country = Array.from(new Set(matches.map(dd => dd.country))).join(", "); // get all the countries that feature this individual
    return {
      ...d,
      country,
    };
  });

  const getColor = (id, gender) => {
    if (highlightedIDs.includes(id)) {
      return gender === "M" ? category["male"] : category["female"];
    } else {
      return color["gray"];
    }
  };
</script>

<div class="group-container">
  <div class="label">{occupation}</div>
  <div class="members-container">
    {#each members as { name, id, gender, country, imgBase } (`${highlightedIDs.length}_${id}`)}
      <div
        class="member"
        class:highlighted={highlightedIDs.includes(id)}
        class:male={gender === "M"}
        use:tooltip={{
          component: Tooltip,
          props: { name, country, imgBase, color: getColor(id, gender) },
        }}
      />
    {/each}
  </div>
</div>

<style lang="scss">
  .group-container {
    text-align: left;
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .label {
    width: 18%;
    text-align: right;
    margin: 0 auto;
    padding-right: 5px;
    font-size: 16px;
    font-family: "ABeeZee", sans-serif;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .members-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    width: 80%;
  }

  .member {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin: 1px;
    background-color: #eee;
    border: solid 1px var(--color-green);
    border-radius: 50%;
    cursor: pointer;

    &.highlighted {
      background: var(--category-female);

      &.male {
        background: var(--category-male);
      }
    }

    &:hover {
      opacity: 0.5;
    }
  }

  @media screen and (max-width: 600px) {
    .label {
      width: 25%;
      font-size: 13px;
    }

    .member {
      width: 12px;
      height: 12px;
    }
  }
</style>
