<script>
  import { onMount } from "svelte";
  import Icon from "$components/helpers/Icon.svelte";
  import { color as appColors } from "$data/variables.json";

  let Carousel;
  let carousel;
  onMount(async () => {
    const module = await import("svelte-carousel");
    Carousel = module.default;
  });

  const handlePrevClick = () => {
    carousel.goToPrev();
  };

  const handleNextClick = () => {
    carousel.goToNext();
  };

  let props = {
    autoplay: true,
    autoplayDuration: 3000,
    dots: false,
    pauseOnFocus: true,
    swiping: true,
  };

  export let images = [];
</script>

<div class="container">
  <svelte:component this={Carousel} bind:this={carousel} {...props}>
    <div slot="prev" class="arrow-container">
      <div class="slideshow-arrow" on:click={handlePrevClick}>
        <Icon
          name="chevron-left"
          xOffset="-1px"
          width="80%"
          height="80%"
          stroke={appColors.background}
        />
      </div>
    </div>

    <div slot="next" class="arrow-container">
      <div class="slideshow-arrow" on:click={handleNextClick}>
        <Icon
          name="chevron-right"
          xOffset="1px"
          width="80%"
          height="80%"
          stroke={appColors.background}
        />
      </div>
    </div>
    {#each images as { img, caption }}
      <figure>
        <img src={`assets/images/${img}`} alt={caption} />
        <figcaption>{caption}</figcaption>
      </figure>
    {/each}
  </svelte:component>
</div>

<style lang="scss">
  .container {
    margin: 100px auto;
    width: 60vw;
    max-width: 650px;
  }

  figure {
    margin: 0 auto;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }

  figcaption {
    margin: 10px;
    font-size: 14px;
  }

  img {
    width: 100%;
    box-shadow: 5px 7px 10px rgba(0, 0, 0, 0.1);
  }

  .arrow-container {
    height: 220px;
    margin: 0 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .slideshow-arrow {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: var(--color-green);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 7px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  @media screen and (max-width: 600px) {
    .container {
      width: 90vw;
    }

    .arrow-container {
      height: 200px;
      margin: 0;
    }

    // * {
    //   border: solid 1px red;
    // }
  }
</style>
