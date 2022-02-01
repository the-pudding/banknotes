<script>
  import {onMount} from "svelte";
  import gsap from "gsap";
  
  export let width = 100;

  let ref;


  const handleRepeat = () => {
    console.log('repeating...')
    rotate = -5 + Math.random() * 10;
  }

  const generateTL = () => {
    // generate a timeline that calls itself on completion in order to 
    // loop indefinetly with random values each iteration;
    let rotate = -5 + Math.random() * 10;
    const tl = gsap.timeline({onComplete: generateTL});

    // pop-up, pop-dow
    tl.to(ref, {delay: Math.random() * 1, duration: .5, y: -190, rotate: rotate, ease: "back.out"})
      .to(ref, {delay: Math.random() * 1, duration: .5, y: 0, rotate: 0, ease: "back.out"})

  }

  onMount(() => {
    generateTL();
  })


</script>


<div bind:this={ref} style:width="{width}px" class="portrait">

</div>


<style>
  .portrait {
    background: chartreuse;
    height: 200px;
  }
</style>