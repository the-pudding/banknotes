<script>
  export let name = "";
  export let country = "";
  export let text = "";
  export let imgBase = "A_Unknown";

  export let x;
  export let y;
</script>

<div id="tooltip" class="tooltip-container">
  <div class="portrait-container">
    <img src={`assets/images/portraits/${imgBase}_300.png`} alt={`${name} portrait`} />
  </div>
  <div class="text-container">
    <div class="name">{name}</div>
    <div class="country">{country}</div>
    <div class="text">{text}</div>
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
    // outline: solid 5px var(--color-background);
    // outline-offset: -5px;
    border: solid 3px var(--color-green);
  }

  .text-container {
    float: right;
    width: 80%;
    height: 100%;
    min-height: 90px;
    padding: 20px 60px;
    color: white;
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
  }
</style>
