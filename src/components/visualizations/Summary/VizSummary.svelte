<script>
  export let props;
  let { mapID, nBanknotes, nIndividuals, propFemale, propMale } = props;

  let w = 0;
  $: femaleW = w * parseFloat(propFemale);
  $: maleW = w * parseFloat(propMale);
  $: femalePercent = (parseFloat(propFemale) * 100).toFixed(1);
  $: malePercent = (parseFloat(propMale) * 100).toFixed(1);


</script>

<div class="container">
  <div class="body-content stats">
    <div class="stat-container">
      <h2 class="big-number">{nBanknotes}</h2>
      <div class="label">unique banknotes</div>
    </div>

    <div class="stat-container">
      <h2 class="big-number">{nIndividuals}</h2>
      <div class="label">unique individuals</div>
    </div>
  </div>

  <div bind:clientWidth={w} class="body-content gender-proportions">
    <div class="gender-container">
      <div class="females gender-rect" style:width="{femaleW}px" />
      <div class="gender-label">Female ({femalePercent}%)</div>
    </div>

    <div class="gender-container">
      <div class="males gender-rect" style:width="{maleW}px" />
      <div class="gender-label">Male ({malePercent}%)</div>
    </div>

  </div>

  <!-- BG Image -->
  <img class="bg-image" src={`assets/images/${mapID}`} alt="" />
</div>

<style lang="scss">
  .container {
    position: relative;
    margin: 15vh auto;
  }


  // * {
  //     border: solid 1px red;
  //   }

  .bg-image {
    width: 100%;
    max-width: 1000px;
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0.3;
    transform: translate(-50%, -50%);
    mix-blend-mode: multiply;
  }

  .stats {
    display: flex;
    justify-content: space-around;
    margin: 100px auto;
  }

  .stat-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Abhaya Libre";
    z-index: 1;

    .big-number {
      margin: 0;
      font-size: 80px;
      line-height: 70px;
      font-weight: 600;
      color: var(--color-brown);
    }

    .label {
      color: var(--color-gray-dark);
      font-size: 24px;
      font-weight: 600;
    }
  }

  .gender-proportions {
    display: flex;
    height: 80px;
    font-family: "Abhaya Libre";
    color: var(--color-gray-dark);
    font-weight: 600;
    font-size: 24px;
    z-index: 1;

    .gender-container {
      display: flex;
      flex-direction: column;
    }

    .gender-rect {
      height: 50%;
      outline: solid 2px white;
    }

    .females {
      background-color: var(--category-female);
    }

    .males {
      background-color: var(--category-male);
    }

    .gender-label {
      height: 50%;
      padding: 5px 10px;
    }
  }
  
  @media screen and (max-width: 600px) {
    .container {
      margin: 1vh auto;
    }

    .stats {
      margin: 40px auto;
    }

    .stat-container{
      .big-number {
        font-size: 48px;
        line-height: 36px;
      }

      .label {
        font-size: 16px;
      }
    }

    .gender-proportions {
      font-size: 14px;
    }

  }

</style>


