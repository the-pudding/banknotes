<div class="legend-container">
  <div class="group">
    <div class="circle female" />
    <div class="label">Female</div>
  </div>

  <div class="group">
    <div class="circle male" />
    <div class="label">Male</div>
  </div>
</div>

<style lang="scss">
  .legend-container {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 3px;
  }

  .group {
    display: flex;
    align-items: center;
    margin: 0px 10px;
  }

  .circle {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: solid 1px var(--color-background);

    &.female {
      background-color: var(--category-female);
    }

    &.male {
      background-color: var(--category-male);
    }
  }

  .label {
    padding-left: 5px;
    font-family: "Baloo Bhai 2", sans-serif;
    font-size: 16px;
  }
</style>
