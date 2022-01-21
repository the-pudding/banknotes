<script>
  import { onMount } from "svelte";
  import gsap from "gsap/dist/gsap.js";
  import { TextPlugin } from "gsap/dist/TextPlugin.js";
  gsap.registerPlugin(TextPlugin);
  import inView from "$actions/inView";

  export let comment;

  let animation;
  const handleEnter = () => {
    animation.play();
  };
  const handleExit = () => {
    animation.pause();
    animation.seek(0);
  };

  onMount(() => {
    animation = gsap
      .to(".comment-text", { duration: 3, text: { value: comment }, ease: "none" })
      .pause();
  });
</script>

<div class="comment" use:inView={{ bottom: 200 }} on:enter={handleEnter} on:exit={handleExit}>
  <div class="comment-text" />
</div>

<style>
  .comment {
    width: 100%;
    height: 100%;
    margin: 70px auto;
    background: hotpink;
  }
</style>
