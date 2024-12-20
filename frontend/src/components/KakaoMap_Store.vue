<script lang="ts">
import {onMounted, ref, watch} from "vue";

export default {
  name: "KakaoMap_Store",
  setup() {
    const initMap = ()=>{
      var container  = document.getElementById('map')!;
      var options = {
        center : new kakao.maps.LatLng(33.450701, 126.570667),
        level : 3
      };

      var map = new kakao.maps.Map(container, options);
    }

    onMounted(()=>{
      console.log(process.env);

      if(window.kakao && window.kakao.maps) {
        initMap();
      } else {
        const script = document.createElement('script');
        script.onload = () => {
          kakao.maps.load(()=>{
            initMap()
          });
        }
        script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=`;
        document.head.appendChild(script);
      }
    });

    return {}
  }
}
</script>

<template>
  <div>
    <div id="map" style="width: 100%; height: 70vh"></div>
  </div>
</template>

<style scoped>

</style>