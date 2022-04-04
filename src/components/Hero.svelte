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
      <div class="role">Story, Data, & Design</div>
      <div class="authors">
        <a href="https://www.pudding.cool/author/alejandra-arevalo"
          ><nobr>Alejandra Arevalo</nobr></a
        >,
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
    max-width: 600px;
    padding-top: 0em;
    text-align: center;
    font-family: "Roboto Condensed", sans-serif;
  }

  .prompt {
    max-width: 600px;
    font-family: "Abhaya Libre", serif;
    font-size: 24px;
    line-height: 1.33;
    margin: 30px auto;
    text-align: center;
  }

  .bylines-container {
    max-width: 500px;
    margin: 20px auto;
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
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    font-family: "Baloo Bhai 2", sans-serif;
    font-size: 18px;
    margin: 15px;
    // gap: 20px;

    .role {
      font-size: 18px;
      flex: 1;
      color: #424242;
    }

    .authors {
      flex: 1;

      a {
        color: var(--color-green);
      }
    }
  }

  .hero-vis {
    width: 100%;
    max-width: 900px;
    height: 450px;
    margin: 100px auto;
  }

  @media screen and (max-width: 600px) {
    .prompt {
      font-size: 22px;
      width: 90vw;
    }

    .hero-vis {
      // border: solid 1px red;
      height: 100%;
    }
  }
</style>
