<script lang="ts">

import {Chart as ChartJS, ArcElement, Legend, Tooltip} from "chart.js";
import {Doughnut} from "vue-chartjs";
import UserService from "@/api/userService";
import {onBeforeMount, onMounted, ref, toRaw} from "vue";
import User from "@/types/User";

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: "Chart_UserByBirth",
  components: {
    Doughnut
  },
  setup() {
    const userBirthList = ref<String[]>([]);
    const userBirthCount = ref<number[]>([0, 0, 0, 0, 0]);
    const loaded = ref<Boolean>(false);

    let userData = {
      labels: ['10대', '20대', '30대', '40대', 'etc'],
      datasets: [
        {
          label: 'User Birth',
          backgroundColor: ['#F6D6D6', '#F6F7C4', '#A1EEBD', '#7BD3EA', '#BCCCDC'],
          data: userBirthCount.value
        }
      ]
    };
    const userOptions = {
      responsive: true,
      maintainAspectRatio: false
    }


    const getUserBirthData = async () => {
      let todayYear = new Date().getFullYear();

      await UserService.getUserBirthList().then(async (response: any) => {
        response.data.map((user: User) => {
          userBirthList.value.push((user.userBirth + "").split('T')[0]);
        })
      });

      await Promise.all(
          userBirthList.value.map(async (userBirth: String) => {
            let userBirthYear = new Date(userBirth + '').getFullYear();
            let age: number = todayYear - userBirthYear;

            if (10 <= age && age < 20) {
              userBirthCount.value[0]++;
            } else if (20 <= age && age < 30) {
              userBirthCount.value[1]++;
            } else if (30 <= age && age < 40) {
              userBirthCount.value[2]++;
            } else if (40 <= age && age < 50) {
              userBirthCount.value[3]++;
            } else {
              userBirthCount.value[4]++;
            }
          })
      ).then(() => {
        loaded.value = true;
      })
    }

    onBeforeMount(() => {
      getUserBirthData()
    })

    return {
      userData,
      userOptions,
      loaded
    }
  },
}
</script>

<template>
  <div class="myChart">
    <Doughnut v-if="loaded" :data="userData" :options="userOptions"/>
  </div>
</template>

<style scoped>
.myChart {
  height : 400px;
}
</style>