<script>
  import { onMount } from "svelte";
  export let props = {};

  let { text } = props;

  $: console.log(props);

  onMount(() => {
    let countryChoice = document.getElementById("country-selector");

    let countries = ["USA", "Canada", "Mexico"];
    for (const country of countries) {
      let opt = document.createElement("option");
      opt.value = country;
      opt.innerHTML = country;
      countryChoice.appendChild(opt);
    }
  });
</script>

<h1>Test Banknotes Viz</h1>
<p>{@html text}</p>
