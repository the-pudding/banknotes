<script>
  export let listItems = [];
</script>

<div class="body-content">
  <ul class="list-container">
    {#each listItems as item}
      <li class="prose">{@html item}</li>
    {/each}
  </ul>
</div>

<style>
  li {
    list-style: disc;
    font-size: 26px;
  }

  .list-container {
    width: 70%;
    text-align: left;
    margin: 0 auto;
  }
</style>
