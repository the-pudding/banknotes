<script>
  import { createEventDispatcher } from "svelte";
  import { tooltip } from "$actions/tooltip";
  import Tooltip from "$components/common/Tooltip.svelte";

  export let members = [];
  export let key = "";
  export let occupation = "";

  const dispatch = createEventDispatcher();
  const handleGroupHover = () => {
    // tell parent this group was hovered
    dispatch("setGroup", key);
  };
  const handleMouseout = () => {
    // tell parent mouseout
    dispatch("setGroup", "");
  };
</script>

<div
  class="group-container"
  on:mouseover={handleGroupHover}
  on:focus={handleGroupHover}
  on:mouseout={handleMouseout}
  on:blur={handleMouseout}
>
  <div class="label">{occupation}</div>
  <div class="members-container">
    {#each members as { name, country, imgBase }}
      <div
        class="member"
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
    padding: 10px;

    &:hover {
      border: solid 2px var(--color-green);
    }
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
    width: 30px;
    height: 30px;
    margin: 1px;
    background-color: #ddd;
    border: solid 2px var(--color-green);
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      border-width: 5px;
    }
  }
</style>
