<script>
  export let text = [];
</script>

<div class="container">
  <div class="box body-content prose">
    <b>Methodology</b>
    {#each text as paragraph}
      <p class="body">{@html paragraph}</p>
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
    padding-bottom: 5vh;
    background-color: var(--color-background);

    :global a {
      color: var(--color-black);
    }
  }

  .box {
    background-color: var(--color-brown-transparent);
    padding: 30px 50px;
    margin: 100px auto;
    border-radius: 10px;

    b {
      color: var(--color-background);
    }
  }

  .body {
    margin: 20px auto;
    font-family: "Abhaya Libre", serif;
    font-size: 20px;
    line-height: 30px;
  }

  @media screen and (max-width: 600px) {
    .box {
      margin: 50px auto;
      padding: 30px;
    }

    .body {
      font-size: 16px;
      line-height: 1.333;
    }
  }
</style>
