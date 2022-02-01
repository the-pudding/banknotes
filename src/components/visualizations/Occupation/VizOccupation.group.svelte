<script>
  import { createEventDispatcher } from "svelte";
  import { tooltip } from "$actions/tooltip";

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
    {#each members as member}
      <div
        use:tooltip={{
          content: member.name,
          placement: "top-end",
          arrow: false,
        }}
        class="member"
      />
    {/each}
  </div>
</div>

<style lang="scss">
  // * {
  //   border: solid 1px red;
  // }

  .group-container {
    padding: 10px;

    &:hover {
      background-color: #efefef;
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
  }
</style>
