<script lang="ts">
  export let buttonText = "Scroll to Output";

  function animateScroll(
    scrollDuration: number,
    scrollTarget: number,
    callback?: () => void
  ) {
    const startTime = performance.now();
    const startScroll = window.pageYOffset;
    const scrollDistance = scrollTarget - startScroll;

    function scrollStep(timestamp: number) {
      const timeElapsed = timestamp - startTime;
      const scrollProgress = Math.min(timeElapsed / scrollDuration, 1);
      const easeProgress = (1 - Math.cos(scrollProgress * Math.PI)) / 2;
      const newScrollPosition = startScroll + scrollDistance * easeProgress;

      window.scrollTo(0, newScrollPosition);

      if (timeElapsed < scrollDuration) {
        window.requestAnimationFrame(scrollStep);
      } else if (callback) {
        callback();
      }
    }

    window.requestAnimationFrame(scrollStep);
  }

  function handleClick() {
    if (
      document.documentElement.scrollTop <
      document.documentElement.scrollHeight - window.innerHeight
    ) {
      // Scroll to the bottom
      animateScroll(
        1000,
        document.documentElement.scrollHeight - window.innerHeight,
        function () {
          buttonText = "Scroll to RBAC";
        }
      );
    } else {
      // Scroll to the top
      animateScroll(1000, 0, function () {
        buttonText = "Scroll to Output";
      });
    }
  }
</script>

<button class="scroll-btn" on:click={handleClick}>{buttonText}</button>

<style>
  .scroll-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    padding: 10px 20px;
    border: none;
    background-color: rgba(255, 255, 255, 0.373);
    border-radius: 5px;
    color: black;
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .scroll-btn:hover {
    background-color: #7ebdc2;
    color: white;
  }

  .scroll-btn:focus {
    outline: none;
  }
</style>
