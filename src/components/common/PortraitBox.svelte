<script>
  export let portraitID = "";
  export let text = [];

  let h;

</script>

<div bind:clientHeight={h} class="portrait-box-container">
  <div class="content-wrapper">
    <img style:height={`${h}px`} style:width={`${h}px`} src={`assets/images/${portraitID}`} alt='' />
    {#each text as { type, value }}
      <p class="body-content prose">{@html value}</p>
    {/each}
  </div>
</div>

<style lang="scss">
  .portrait-box-container {
    position: relative;
    background-color: var(--color-brown);
    height: 100%;
    width: 100%;
    padding: 2em 0;

    :global a {
      color: var(--color-background);
    }
  }

  .content-wrapper {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  img {
    position: absolute;
    max-height: 400px;
    max-width: 400px;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    opacity: 0.5;
  }

  p {
    position: relative;
    color: var(--color-background);
    padding: 1em;
  }


</style>
