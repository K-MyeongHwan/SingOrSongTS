<script lang="ts">
import {onBeforeMount, ref, toRaw} from "vue";
import {Bar} from "vue-chartjs";
import Platform from "@/types/Platform";
import PlatformService from "@/api/platformService";
import {Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


export default {
  name: "Chart_UserByPlat",
  components: {
    Bar
  },
  setup() {
    const platformList = ref<String[]>([]);
    const loaded = ref<boolean>(false);

    let userData = {
      labels: platformList.value,
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39]
        }
      ]
    };
    const userOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    const getPlatformList = async () => {
      await PlatformService.getPlatformList().then((response: any) => {
        response.data.map((platform: Platform) => {
          platformList.value.push(platform.platName);
        })

        console.log(platformList.value);
        loaded.value = true;
      }).catch((error) => {
        console.log(error);
      })
    }

    const getUserCountByPlatId = async (platId: number) => {
      await PlatformService.getUserCountByPlatId(platId).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      })
    }

    onBeforeMount(() => {
      getPlatformList();
      getUserCountByPlatId(4);
    });

    return {
      userData,
      userOptions,
      platformList,
      loaded
    }
  }
}
</script>

<template>
  <Bar v-if="loaded" :data="userData" :options="userOptions"/>
</template>

<style scoped>

</style>