<script>
  export let name = "";
  export let country = "";
  export let text = "";
  export let imgBase = "A_Unknown";
  export let color = "#555";
  import { color as appColors } from "$data/variables.json";

  let textColor = color === appColors.yellow ? appColors['gray-dark'] : appColors['background'];

  export let x;
  export let y;
</script>

<div id="tooltip" class="tooltip-container">
  <div class="portrait-container" style:border-color={color}>
    <img src={`assets/images/portraits/${imgBase}_300.webp`} alt={`${name} portrait`} />
  </div>
  <div class="text-container" style:color={textColor} style:background-color={color}>
    <div class="name">{name}</div>
    <div class="country">{country}</div>
    <div class="text">{@html text}</div>
  </div>
</div>

<style lang="scss">
  .tooltip-container {
    position: relative;
    width: 400px;
  }

  .portrait-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    transform: translate(6%, -25%);
    overflow: hidden;
    background-color: var(--color-background);
    border: solid 3px;
  }

  .text-container {
    float: right;
    width: 80%;
    height: 100%;
    min-height: 90px;
    padding: 20px 10px 20px 60px;
    background-color: var(--color-green);
    outline: solid 1px var(--color-background);
    outline-offset: -3px;

    .name {
      font-size: 22px;
      font-family: "Baloo Bhai 2", cursive;
      line-height: 1.1;
    }

    .text {
      font-size: 14px;
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
