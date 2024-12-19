<script lang="ts">
import {onBeforeMount, onMounted, ref, toRaw} from "vue";
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
    const platformList = ref<Platform[]>([]);
    const platformNameList = ref<String[]>([]);
    const userCountList = ref<number[]>([]);
    const loaded = ref<Boolean>(false);

    let userData = {
      labels: platformNameList.value,
      datasets: [
        {
          label: 'User Count',
          backgroundColor: ['rgba(255, 205, 86, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(201, 203, 207, 0.2)'],
          borderColor : ['rgb(255, 205, 86)', 'rgb(54, 162, 235)','rgb(75, 192, 192)',  'rgb(201, 203, 207)'],
          borderWidth : 1,
          data: userCountList.value
        }
      ]
    };
    const userOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    const getPlatformData = async () => {
      await PlatformService.getPlatformList().then(async (response: any) => {
        response.data.map((platform: Platform) => {
          platformList.value.push(platform);
          platformNameList.value.push(platform.platName);
        });

        //get userCountData
        await Promise.all(
            platformList.value.map(async (platform: Platform) => {
              await PlatformService.getUserCountByPlatId(platform.platId).then((response :any) => {
                userCountList.value.push(response.data[0].userCount);
              })
            })
        ).then(()=>{
          loaded.value = true;
        });

      }).catch((error) => {
        console.log(error);
      })
    }

    onBeforeMount(() => {
      getPlatformData()
    });

    onMounted(() => {
      //loaded.value = true;
    })

    return {
      userData,
      userOptions,
      loaded,
    }
  }
}
</script>

<template>
  <Bar v-if="loaded" :data="userData" :options="userOptions"/>
</template>

<style scoped>

</style>