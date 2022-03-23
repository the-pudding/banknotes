<script>
  import { rawData } from "$data/data.js";
  import { shuffle } from "$utils/utils.js";
  import Portrait from "./VizHero.portrait.svelte";
  import { uniq } from "lodash";

  export let width;

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

<div class='container' style:width >
  <!--background wallet -->
  <img class="wallet" src="assets/images/wallet_bg.webp" alt="wallet"/>

  <!-- portraits -->
  <div class="portraits-container">
    {#each popUps as { portraits }}
       <Portrait width={width/5} portraitIDs={portraits} />
    {/each}
  </div>


  <!-- foreground wallet -->
  <img class="wallet" src="assets/images/wallet_fg.webp" alt="wallet"/>

</div> 


<style>
  .container {
    position: relative;
    height: 500px;
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
    /* border: solid 2px red; */
  }

  .wallet {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 850px;
  }

  @media screen and (max-width: 600px){
    /* * {
      border: solid 1px red;
    } */

    .container {
      margin-top: 150px;
      height: 200px;
    }

    .portraits-container {
      height: 0px;
      top: 25%;
    }

    .wallet {
      top: 30%;
    }


  }
</style>
