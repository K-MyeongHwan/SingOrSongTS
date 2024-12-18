<script lang="ts">
import Song from "@/types/Song";
import {onBeforeMount, ref} from "vue";
import SongService from "@/api/songService";
import {ClickRowArgument} from "vue3-easy-data-table";
import SingerService from "@/api/singerService";
import CategoryService from "@/api/categoryService";
import Category from "@/types/Category";

export default {
  name: 'Main',
  setup() {
    const headers = ref([
      {text: "곡 번호", value: "songNum"},
      {text: "곡 이름", value: "songName"},
      {text: "재생 횟수", value: "replayCount"},
    ]);
    const items = ref<Song[]>([]);
    const selectedSong = ref<Song>({
      songNum: 0,
      songName: '',
      singerNum: 0,
      categoryNum: 0,
      replayCount: 0,
    });
    const getSongList = async () => {
      await SongService.getSongList().then((response: any) => {
        console.log(response.data);
        selectedSong.value = response.data[0];
        getSingerBySingerNum(response.data[0].singerNum);
        getCategoryByCategoryNum(response.data[0].categoryNum);
        items.value = response.data;
      })
    }
    const getSingerBySingerNum = async (singerNum: number) => {
      await SingerService.getSingerBySingerNum(singerNum).then((response: any) => {
        selectedSong.value.singerName = response.data[0].singerName;
      }).catch((error) => {
        console.log(error);
      })
    }
    const getCategoryByCategoryNum = async (categoryNum: number) => {
      await CategoryService.getCategoryByCategoryNum(categoryNum).then((response: any) => {
        selectedSong.value.categoryName = response.data[0].categoryName;
      }).catch((error) => {
        console.log(error);
      })
    }

    const changeSelectedSong = (item: ClickRowArgument) => {
      getCategoryByCategoryNum(item.categoryNum);
      getSingerBySingerNum(item.singerNum);

      let song: Song = {
        songNum: item.songNum,
        songName: item.songName,
        singerNum: item.singerNum,
        categoryNum: item.categoryNum,
        singerName: selectedSong.value.singerName,
        categoryName: selectedSong.value.categoryName,
        replayCount: item.replayCount,
        songImageUrl: item.songImageUrl,
        registeredDate: item.registeredDate
      }

      console.log(song);

      selectedSong.value = song;
    }

    onBeforeMount(() => {
      getSongList()
    });

    return {
      headers,
      items,
      selectedSong,
      changeSelectedSong
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <EasyDataTable
              :headers="headers"
              :items="items"
              :rows-per-page="5"
              @click-row="changeSelectedSong"
          />
        </div>
      </div>
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-5">
                <img class="mySongImage" alt="..." :src="selectedSong?.songImageUrl"/>
              </div>
              <div class="col-7">
                <div class="myTodayInfo text-start">
                  <h2>{{ selectedSong?.songName }}</h2>
                  <h4>{{ selectedSong?.singerName }}</h4>
                  <h6> 카테고리: {{ selectedSong?.categoryName }}</h6>
                  <h6>발매일 : {{ selectedSong?.registeredDate }}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mySongImage {
  width: 200px;
  height: 200px;
  border: 3px solid #E2E2E2;
  position: relative;
  margin-bottom: 15px;
}

.myTodayInfo h2 {
  font-weight: 500;
}

.myTodayInfo h4 {
  font-weight: 400;
}

.myTodayInfo h6 {
  font-weight: 200;
  padding-bottom: 8px;
}
</style>