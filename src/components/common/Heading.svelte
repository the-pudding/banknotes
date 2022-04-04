<script>
  export let title = "";
</script>

<h2 class="heading">{@html title}</h2>

<style>
  h2 {
    width: 70vw;
    max-width: 1200px;
    margin: 2.5em auto 0.5em;
    font-family: "Baloo Bhai 2", sans-serif;
    font-size: 50px;
    line-height: 1.33;
    text-align: center;
    color: var(--color-brown);
  }

  @media screen and (max-width: 600px) {
    h2 {
      width: 90vw;
      font-size: 32px;
      line-height: 1.05;
    }
  }
</style>
