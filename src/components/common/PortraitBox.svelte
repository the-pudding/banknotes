<script>
  export let portraitID = "";
  export let text = [];

  let h;

</script>

<div bind:clientHeight={h} class="container">
  <img style:height={`${h}px`} style:width={`${h}px`} src={`assets/images/${portraitID}`} alt='' />
  {#each text as { type, value }}
    <p class="body-content prose">{@html value}</p>
  {/each}
</div>

<style>
  .container {
    position: relative;
    background-color: var(--color-brown);
    height: 100%;
    width: 100%;
    padding: 2em 0;
  }

  img {
    position: absolute;
    max-height: 400px;
    max-width: 400px;
    left: 66%;
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
