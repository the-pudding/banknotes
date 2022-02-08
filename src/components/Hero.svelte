<script>
  import WalletViz from "$components/visualizations/Hero/VizHero.svelte";

  export let copy = {};

  let visWidth;
  let visHeight;
</script>

<div>
  <h1 class="hed">{copy.title}</h1>
  <p class="prompt">{copy.prompt}</p>

  <!-- Date -->
  <time datetime="2022-03-01">March XX, 2022</time>

  <!-- By Lines -->
  <div class="bylines-container">
    <div class="byline">
      <div class="role">Story & Data</div>
      <div class="authors">
        <a href="https://www.pudding.cool/author/alejandra-arevalo"
          ><nobr>Alejandra Arevalo</nobr></a
        >
        &
        <a href="https://www.pudding.cool/author/eric-hausken"><nobr>Eric Hausken</nobr></a>
      </div>
    </div>
    <div class="byline">
      <div class="role">Code</div>
      <div class="authors">
        <a href="https://www.pudding.cool/author/jeff-macinnes">Jeff MacInnes</a>
      </div>
    </div>
  </div>

  <div class="hero-vis" bind:clientHeight={visHeight} bind:clientWidth={visWidth}>
    <WalletViz width={visWidth} height={visHeight} />
  </div>
</div>

<style lang="scss">
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
    max-width: 600px;
    font-family: "Abhaya Libre", serif;
    font-weight: 500;
    font-size: 30px;
    line-height: 1.33;
    margin: 30px auto;
  }

  .bylines-container {
    max-width: 400px;
    // display: flex;
    margin: 20px auto;
    // border: solid 1px red;
  }

  time {
    background-color: var(--color-green);
    padding: 3px 5px;
    color: white;
    font-size: 18px;
  }

  .byline {
    // border: solid 1px red;
    display: flex;
    justify-content: center;
    font-family: "ABeeZee", sans-serif;
    font-size: 16px;
    margin: 0;

    .role {
      flex: 1;
      text-align: right;
    }

    .authors {
      flex: 1;
      text-align: left;
    }
  }

  .hero-vis {
    width: 100%;
    max-width: 900px;
    height: 450px;
    margin: 100px auto;
  }
</style>
