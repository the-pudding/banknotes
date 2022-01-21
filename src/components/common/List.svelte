<script>
  export let listItems = [];
</script>

<ul class="list-container body-content">
  {#each listItems as item}
    <li class="prose">{@html item}</li>
  {/each}
</ul>

<style>
  li {
    list-style: disc;
  }

  .list-container {
    text-align: center;
  }
</style>
