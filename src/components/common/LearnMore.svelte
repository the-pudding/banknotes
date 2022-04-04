<script>
  import { CollapsibleCard } from "svelte-collapsible";

  export let title = "";
  export let text = "";

  let isOpen = false;
</script>

<div class="body-content learn-more-container">
  <CollapsibleCard bind:open={isOpen}>
    <div slot="header" class="header">
      <div class="triangle" class:active={isOpen} />
      <div class="title"><b>{title}</b></div>
    </div>

    <div slot="body" class="body" class:active={isOpen}>{@html text}</div>
  </CollapsibleCard>
</div>

<style lang="scss">
  .learn-more-container {
    margin: 30px auto;
  }

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    cursor: pointer;
  }

  .title {
    font-family: "Abhaya Libre", serif;
    font-size: 20px;
    line-height: 30px;
    padding-left: 10px;

    b {
      color: var(--color-dark-gray);
    }
  }

  .triangle {
    margin-top: 5px;
    width: 0px;
    height: 0px;
    border-top: 10px solid transparent;
    border-left: 19px solid var(--color-brown);
    border-bottom: 10px solid transparent;
    transform: scale(0.9);
    transform-origin: center left;
    transition: transform 0.2s;

    &.active {
      transform: rotate(90deg);
    }
  }

  .body {
    padding: 0 35px;
    margin: 20px auto;
    font-family: "Abhaya Libre", serif;
    font-size: 20px;
    line-height: 30px;
  }

  @media screen and (max-width: 600px) {
    .title {
      font-size: 16px;
      line-height: 1.333;
    }

    .body {
      font-size: 14px;
      line-height: 1.333;
    }
  }
</style>
