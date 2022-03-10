<script>
  export let text = [];
</script>

<div class="body-content prose">
  {#each text as paragraph}
    <p>{@html paragraph}</p>
  {/each}
</div>
