<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  import * as d3 from "d3";
  import rawData from "$data/currencyImages.csv";

  export let props = {};
  let { text } = props;

  let data = {};
  d3.flatGroup(
    rawData.map(d => ({
      country: d.countryName,
      imgPath: `assets/images/currency/${d.usableImage}.jpg`,
      caption: d.caption,
    })),
    d => d.country
  ).forEach(d => (data[d[0]] = d[1]));
  let countries = Object.keys(data);

  let images = [];

  const updateCountry = e => {
    let countrySelector = document.getElementById("country-selector");
    let currentCountry = countrySelector.value;
    images = data[currentCountry].map(d => ({ imgPath: d.imgPath, caption: d.caption }));
  };

  let imgSetHeight = 0;
  let imgSetMinHeight = 0;
  $: if (imgSetHeight > 400) {
    imgSetMinHeight = imgSetHeight;
  }

  onMount(() => {
    let countrySelector = document.getElementById("country-selector");
    countrySelector.addEventListener("change", updateCountry);

    // add all countries to the dropdown list
    for (const country of countries) {
      let opt = document.createElement("option");
      opt.value = country;
      opt.innerHTML = country;
      countrySelector.appendChild(opt);
    }

    // initiate selector with value
    countrySelector.value = "United States";
    updateCountry();
  });
</script>

<div class="body-content container">
  <p class="prose">{@html text}</p>
</div>

<div class="body-content image-set" bind:clientHeight={imgSetHeight}>
  {#each images as image, i (image.imgPath)}
    <figure in:fade={{ delay: (i + 1) * 100, duration: 1000 }} class="image">
      <img src={`${image.imgPath}`} alt={image.caption} />
      <figcaption>{image.caption}</figcaption>
    </figure>
  {/each}
</div>

<style>
  .image-set {
    width: 100%;
    min-height: 400px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .image {
    width: 40%;
    display: inline-block;
    padding: 10px;
  }

  @media screen and (max-width: 600px) {
    .image-set {
      min-height: 0px;
    }
  }
</style>
