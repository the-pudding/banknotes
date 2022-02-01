<script>
  import Portrait from "./VizHero.portrait.svelte";

  export let width;
  export let height;

</script>

<div class='container' style:width style:height="500px" >
  <!--background wallet -->
  <img class="wallet" src="assets/images/wallet_bg.png" alt="wallet"/>

  <!-- portraits -->
  <div class="portraits-container">
    {#each [1,2,3,4] as portrait}
       <Portrait width={width/6} />
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
