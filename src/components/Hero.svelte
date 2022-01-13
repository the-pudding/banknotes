<script>
  import { getContext } from "svelte";
  const { copy } = getContext("App");
  const { hero } = copy;
</script>

<div>
  <h1 class="hed">{hero.title}</h1>
  <p class="prompt">{hero.prompt}</p>
  <p class="byline">By</p>
</div>

<style>
  div {
    /* border: solid 1px red; */
    margin: 10px;
  }

  .hed {
    margin-top: 1em;
  }

  .prompt {
    max-width: 60%;
    font-family: "Abhaya Libre", serif;
    font-weight: 500;
    font-size: 30px;
    line-height: 1.33;
    margin: 0 auto;
  }

  .byline {
    font-family: "ABeeZee", sans-serif;
  }
</style>
