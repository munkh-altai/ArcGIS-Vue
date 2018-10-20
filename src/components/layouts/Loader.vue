<template>
  <div class="loading">
    <div id="preloader">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-globe" style="background: none;">
            <g transform="rotate(-23.5 50 50)">
                    <circle cx="50" cy="50"  r="40" fill="rgba(0,0,0,0)" stroke="#ffffff" stroke-width="2"></circle>
                    <ellipse cx="50" cy="50" ry="0.1"  fill="none"  rx="40" stroke="#ffffff" stroke-width="2"></ellipse>
                    <ellipse cx="50" cy="50" fill="none"  ry="40" stroke="#ffffff" stroke-width="2" rx="31.3816">
                        <animate attributeName="rx" calcMode="linear" values="40;0;40" keyTimes="0;0.5;1" dur="1.8" begin="0s" repeatCount="indefinite"></animate>
                    </ellipse>
                    <ellipse cx="50" cy="50" fill="none" ry="40" stroke="#ffffff" stroke-width="2" rx="4.74163">
                        <animate attributeName="rx" calcMode="linear" values="40;0;40" keyTimes="0;0.5;1" dur="1.8" begin="-0.5994s" repeatCount="indefinite"></animate>
                    </ellipse>
                    <ellipse cx="50" cy="50"  fill="none"  ry="40" stroke="#ffffff" stroke-width="2" rx="21.9544">
                        <animate attributeName="rx" calcMode="linear" values="40;0;40" keyTimes="0;0.5;1" dur="1.8" begin="-1.20006s" repeatCount="indefinite"></animate>
                    </ellipse>
                </g>
          </svg>
      </div>
  </div>
</template>

<script>

    export default {


    };
</script>

<style media="screen">
  .loading{
    width: 100%;
    height: 100%;
    background: rgba(34, 91, 165,0.3);
    position: absolute;
    z-index: 999;
}
  #preloader{
    position: relative;
width: 100%;
height: 80px;
top: calc(50% - 50px);
text-align: center;
margin: 0 auto;
  }
</style>
