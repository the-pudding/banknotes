<script>
  import wordmark from "$svg/wordmark.svg";
  import WalletViz from "$components/visualizations/Hero/VizHero.svelte";

  export let title = "";
  export let subtitle = "";

  let visWidth;
  let visHeight;
</script>

<div>
  <div class="wordmark">
    <a href="https://pudding.cool" aria-label="The Pudding">{@html wordmark}</a>
  </div>

  <h1 class="hed">{title}</h1>
  <p class="prompt">{subtitle}</p>

  <!-- Date -->
  <!-- <time datetime="2022-03-01">March XX, 2022</time> -->

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
    // border: solid 1px red;
  }

  img {
    margin: 100px auto;
    width: 300px;
  }

  .wordmark {
    max-width: 10em;
    margin: 0 auto;
    padding: 1em 0;
  }

  .wordmark a {
    border: none;
    color: var(--color-fg);
  }

  .wordmark a:hover {
    background-color: transparent;
  }

  :global(.wordmark svg path) {
    fill: currentColor;
  }

  .hed {
    padding-top: 1em;
    text-align: center;
  }

  .prompt {
    max-width: 510px;
    font-family: "Abhaya Libre", serif;
    font-weight: 500;
    font-size: 30px;
    line-height: 1.33;
    margin: 30px auto;
    text-align: center;
  }

  .bylines-container {
    max-width: 500px;
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
    display: flex;
    justify-content: center;
    font-family: "ABeeZee", sans-serif;
    font-size: 18px;
    margin: 15px;
    gap: 20px;

    .role {
      flex: 1;
      text-align: right;
      color: #424242;
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
