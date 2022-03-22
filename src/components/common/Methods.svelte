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
  }

  .body {
    margin: 20px auto;
    font-family: "Abhaya Libre", serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
  }
</style>
