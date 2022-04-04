<script>
  export let name = "";
  export let country = "";
  export let text = "";
  export let imgBase = "A_Unknown";
  export let color = "#555";
  import { color as appColors } from "$data/variables.json";

  $: showPortrait = imgBase != 'A_Unknown';
  $: showText = text.length > 0;

  let textColor = color === appColors.yellow ? appColors['gray-dark'] : appColors['background'];

  export let x;
  export let y;
</script>

<div id="tooltip" class="tooltip-container" >
  {#if showPortrait}
    <div class="portrait-container" style:border-color={color}>
      <img src={`assets/images/portraits/${imgBase}_300.webp`} alt={`${name} portrait`} />
    </div>
  {/if}
  <div class="text-container" style:padding-top={showPortrait ? '25px' : '10px'} style:color={textColor} style:background-color={color}>
    <div class="name">{name}</div>
    <div class="country">{country}</div>
    {#if showText}
      <div class="text">{@html text}</div>
    {/if}
  </div>
</div>

<style lang="scss">
  .tooltip-container {
    position: relative;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  // * {
  //   border: solid 1px red;
  // }

  .portrait-container {
    position: relative;
    // top: 0;
    // left: 50%;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow:hidden;
    background-color: var(--color-background);
    transform: translate(0, 25%);
    border: solid 5px;
    outline: solid 1px var(--color-background);
    z-index: 10;
    // box-shadow: -10px 15px 20px rgba(0, 0, 0, 0.1);
  }
  

  .text-container {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    padding: 10px 12px;
    border-radius: 5px;
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
    border: solid 1px var(--color-background);
    text-align: center;

    .name {
      font-size: 18px;
      font-family: "Baloo Bhai 2", sans-serif;
      line-height: 1.1;
    }

    .country {
      font-size: 13px;
    }

    .text {
      font-size: 13px;
      margin-top: 10px;
    }

    :global(h2) {
      font-size: 18px;
      line-height: 1.33;
      margin: 0;
      padding: 0;
    }
  }
</style>
