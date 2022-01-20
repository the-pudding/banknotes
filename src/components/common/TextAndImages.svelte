<script>
  import inView from "$actions/inView";
  export let text = "";
  export let images = [];

  // set images to alternate which side they appear on
  let left = Math.random() <= 0.5;
  let imageSet = images.map(img => {
    left = !left;
    return {
      fname: img.id,
      alt: img.caption,
      align: left ? "flex-start" : "flex-end",
      show: false,
    };
  });

  // animations
  const handleImageInView = (idx, event) => {
    imageSet[idx].show = event === "enter";
  };
</script>

<div class="container">
  <div class="images-container">
    {#each imageSet as image, i}
      <div
        class="image-container"
        use:inView={{ bottom: 150 }}
        on:enter={() => handleImageInView(i, "enter")}
        on:exit={() => handleImageInView(i, "exit")}
        style:justify-content={image.align}
      >
        <figure class:show={image.show} class="sidebar-image">
          <img src="assets/images/{image.fname}" alt={image.alt} />
        </figure>
      </div>
    {/each}
  </div>

  <div class="body-content prose">
    <p>{@html text}</p>
  </div>
</div>

<style lang="scss">
  .container {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  .images-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .image-container {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .sidebar-image {
    width: 100px;
    margin: 20px;
    transform: scale(0);
    transition: transform 1s;

    &.show {
      transform: scale(1);
      transition: transform 1s;
    }
  }

  @media screen and (max-width: 1024px) {
    .images-container {
      position: relative;
      flex-direction: row;
      justify-content: space-around;
    }
  }
</style>
