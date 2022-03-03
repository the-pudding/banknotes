<script>
  import { onMount, SvelteComponent } from "svelte";

  let Carousel;
  let carousel;
  onMount(async () => {
    const module = await import("svelte-carousel");
    Carousel = module.default;
  });

  let props = {
    autoplay: true,
    autoplayDuration: 3000,
    dots: false,
    pauseOnFocus: true,
    swiping: true,
  };

  const handleNextClick = () => {
    carousel.goToNext();
  };

  export let images = [];
</script>

<div class="container">
  <svelte:component this={Carousel} bind:this={carousel} {...props}>
    {#each images as { img, caption }}
      <figure>
        <img src={`assets/images/${img}`} alt={caption} />
        <figcaption>{caption}</figcaption>
      </figure>
    {/each}
  </svelte:component>
</div>

<style>
  .container {
    margin: 25vh auto;
    width: 500px;
  }

  figure {
    margin: 0 auto;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    height: 200px;
  }
</style>
