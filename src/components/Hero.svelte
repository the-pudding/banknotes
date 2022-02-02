<script>
  import WalletViz from "$components/visualizations/Hero/VizHero.svelte";

  export let copy = {};

  let visWidth;
  let visHeight;
</script>

<div>
  <h1 class="hed">{copy.title}</h1>
  <p class="prompt">{copy.prompt}</p>
  <!-- <p class="byline">By</p> -->

  <div class="hero-vis" bind:clientHeight={visHeight} bind:clientWidth={visWidth}>
    <WalletViz width={visWidth} height={visHeight} />
  </div>
</div>

<style>
  div {
    /* border: solid 1px red; */
    margin: 10px;
  }

  img {
    margin: 100px auto;
    width: 300px;
  }

  .hed {
    margin-top: 1em;
  }

  .prompt {
    max-width: 60%;
    font-family: "Abhaya Libre", serif;
    font-weight: 500;
    font-size: 30px;
    line-height: 1.33;
    margin: 0 auto;
  }

  .byline {
    font-family: "ABeeZee", sans-serif;
  }

  .hero-vis {
    width: 100%;
    max-width: 900px;
    height: 450px;
    margin: 100px auto;
  }
</style>
