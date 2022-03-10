<script>
  import { tooltip } from "$actions/tooltip";
  import Tooltip from "$components/common/Tooltip.svelte";

  export let members = [];
  export let key = "";
  export let occupation = "";
  export let highlightedIDs = [];
</script>

<div class="group-container">
  <div class="label">{occupation}</div>
  <div class="members-container">
    {#each members as { name, id, gender, country, imgBase }}
      <div
        class="member"
        class:highlighted={highlightedIDs.includes(id)}
        class:male={gender === "M"}
        use:tooltip={{
          component: Tooltip,
          props: { name, country, imgBase },
        }}
      />
    {/each}
  </div>
</div>

<style lang="scss">
  .group-container {
    padding: 5px;
  }

  .label {
    margin: 0 auto 0.2em;
    font-size: 16px;
    font-family: "ABeeZee", sans-serif;
    text-align: left;
  }

  .members-container {
    text-align: left;
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
      border-width: 5px;
      background: var(--color-green);
    }
  }
</style>
