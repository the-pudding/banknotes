<script>
  export let images = [];
</script>

<div class="body-content image-set">
  {#each images as { id, caption }}
    <img class="image" src={`assets/images/${id}`} alt={caption} />
  {/each}
</div>

<style>
  .image-set {
  }

  .image {
    width: 40%;
    display: inline-block;
    padding: 10px;
  }
</style>
