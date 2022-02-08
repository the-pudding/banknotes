<script>
  export let copy = "";
</script>

<section class="methods body-content">
  <div class="title">Methods</div>

  {#each copy as paragraph}
    <p class="paragraph">{@html paragraph.value}</p>
  {/each}
</section>

<style lang="scss">
  .methods {
    padding: 5vh 0 10vh;
  }

  .title {
    width: 100%;
    text-align: left;
    font-family: "Baloo Bhai 2";
    font-size: 26px;
    color: var(--color-green);
    padding: 0 20px;
    border-bottom: solid 2px var(--color-green);
  }

  .paragraph {
    width: 100%;
    padding: 0 20px;
    font-size: 18px;
    text-align: left;

    &:first-of-type {
      margin-top: 15px;
    }
  }
</style>
