<script>
  import { rawData } from "$data/data.js";
  import { shuffle } from "$utils/utils.js";
  import Portrait from "./VizHero.portrait.svelte";
  import { uniq } from "lodash";

  export let width;
  export let height;

  // set up portraits for each bill position
  let portraitIDs = uniq(rawData.filter(d => d.hasPortrait).map(d => d.id));

  const totalPortraits = portraitIDs.length;
  const nPopUps = 4;
  let popUps = new Array(nPopUps)
    .fill()
    .map(_ => {
      const thesePortraitIds = portraitIDs.splice(0, Math.floor(totalPortraits / nPopUps))
      return {
        portraits: shuffle(thesePortraitIds)
      }
    });
</script>

<div class='container' style:width style:height="500px" >
  <!--background wallet -->
  <img class="wallet" src="assets/images/wallet_bg.png" alt="wallet"/>

  <!-- portraits -->
  <div class="portraits-container">
    {#each popUps as { portraits }}
       <Portrait width={width/5} portraitIDs={portraits} />
    {/each}
  </div>


  <!-- foreground wallet -->
  <img class="wallet" src="assets/images/wallet_fg.png" alt="wallet"/>

</div> 


<style>
  .container {
    position: relative;
  }

  .portraits-container {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    width: 80%;
    height: 200px;
    border: solid 2px red;
  }

  .wallet {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 850px;
  }
</style>
