<script>
  import {onMount} from "svelte";
  import { randBw, randFromArr } from "$utils/utils";
  import gsap from "gsap";
  gsap.config({  // <-- turn off irritating warnings that are specific to staging
    nullTargetWarn: false,
    trialWarn: false,
});
  
  export let width = 100;
  export let portraitIDs = [];

  let color = randFromArr(['red', 'yellow', 'green', 'brown']); 

  let ref;
  const portraitsDir = 'assets/images/portraits';
  let portraitIdx = 0;
  $: imgSrc = `${portraitsDir}/${portraitIDs[portraitIdx]}_300.webp`;

  let rotate = -5 + Math.random() * 10;

  const generateTL = () => {
    // generate a timeline that calls itself on completion in order to 
    // loop indefinetly with random values each iteration;
    rotate = randBw(-8,8);
    portraitIdx++;
    if (portraitIdx >= portraitIDs.length){
      portraitIdx = 0;
    }

    const tl = gsap.timeline({onComplete: generateTL});  

    // pop-up, pop-dow
    tl.to(ref, {delay: randBw(0,2), duration: .5, y: -180, rotate: rotate, ease: "back.out"})
      .to(ref, {delay: randBw(1,3), duration: .5, y: 0, rotate: 0, ease: "back.out"})
  }

  onMount(() => {
    generateTL();
  })


</script>


<div bind:this={ref} style:width="{width}px" class={`portrait ${color}`}>
  <img src={imgSrc} alt="portrait popup" />
</div>


<style lang="scss">
  
  .portrait {
    background: radial-gradient(var(--color-background) 30%,  var(--color-green));
    outline: solid 10px var(--color-green);
    outline-offset: -13px;
    border: solid 2px var(--color-gray-dark);
    border-radius: 7px;
    height: 200px;
    box-shadow: 5px 5px 5px rgba(#000, .5);
  }

  .red {
    background: radial-gradient(var(--color-background) 30%,  var(--color-red));
    outline: solid 10px var(--color-red);
  }

  .yellow {
    background: radial-gradient(var(--color-background) 30%,  var(--color-yellow));
    outline: solid 10px var(--color-yellow);
  }

  .brown {
    background: radial-gradient(var(--color-background) 30%,  var(--color-brown));
    outline: solid 10px var(--color-brown);
  }



</style>