<script>
  import { onMount } from "svelte";
  import gsap from "gsap/dist/gsap.js";
  import { TextPlugin } from "gsap/dist/TextPlugin.js";
  import { CustomEase } from "gsap/dist/CustomEase.js";

  gsap.registerPlugin(CustomEase);
  gsap.registerPlugin(TextPlugin);

  let mouthEase = CustomEase.create(
    "custom",
    "M0,0,C0,0,0.017,0.396,0.04,0.438,0.042,0.441,0.092,0.969,0.13,0.972,0.16,0.974,0.175,0.154,0.222,0.156,0.277,0.157,0.232,0.562,0.3,0.563,0.341,0.564,0.344,0.367,0.386,0.368,0.427,0.368,0.432,0.999,0.472,1,0.513,1,0.492,0.136,0.53,0.136,0.584,0.136,0.574,0.36,0.622,0.36,0.668,0.36,0.643,0,0.7,0,0.762,0,0.702,0.732,0.768,0.732,0.814,0.732,0.796,0.458,0.844,0.458,0.882,0.458,0.862,0.61,0.898,0.61,0.936,0.61,0.957,0.097,0.971,0.048,0.988,-0.01,1,0,1,0"
  );

  import inView from "$actions/inView";

  export let comment = "";

  let guideTopRef;
  let commentRef;

  let animation;
  const handleEnter = () => {
    tl.play();
  };
  const handleExit = () => {
    tl.pause();
    tl.seek(0);
  };

  const tl = gsap.timeline({ repeat: 0 });

  onMount(() => {
    let textDuration = comment.length * 0.03; // lower is faster
    let mouthDuration = 1.5; // length of 1 cycle
    let mouthRepeats = Math.max(1, Math.floor((textDuration * 0.9) / mouthDuration));

    // mouth movement timeline
    let mouthTL = gsap.timeline({ repeat: mouthRepeats });
    mouthTL.to(guideTopRef, { duration: mouthDuration, rotation: -10, ease: mouthEase });

    tl.addLabel("start", 0)
      .add(mouthTL, "start")
      .to(commentRef, { duration: textDuration, text: { value: comment }, ease: "none" }, "start")
      .pause();
  });
</script>

<div
  class="comment-container"
  use:inView={{ bottom: 200 }}
  on:enter={handleEnter}
  on:exit={handleExit}
>
  <div class="guide">
    <img src="assets/images/guide_bottom.webp" alt="Frida, your guide, says" />
    <img bind:this={guideTopRef} src="assets/images/guide_top.webp" alt="Frida, your guide, says" />
  </div>

  <div bind:this={commentRef} class="comment-text" />
</div>

<style lang="scss">
  .comment-container {
    width: 100%;
    max-width: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 70px auto;
  }

  .guide {
    position: relative;
    width: 200px;
    height: 200px;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 200px;
      transform-origin: 45% 73%;
    }
  }

  .comment-text {
    width: 80%;
    text-align: left;
    font-style: italic;
    border: solid 2px var(--color-green);
    border-radius: 10px;
    padding: 20px;
  }
</style>
