<script lang="ts">
import Song from "@/types/Song";
import {onBeforeMount, ref} from "vue";
import SongService from "@/api/songService";
import {ClickRowArgument} from "vue3-easy-data-table";

export default {
  name : 'Main',
  setup() {
    const headers = ref([
      { text : "곡 번호", value : "songNum"},
      { text : "곡 이름", value : "songName"},
      { text : "재생 횟수", value : "replayCount"},
    ]);
    const items = ref<Song[]>([]);
    const selectedSong = ref<Song>();
    const getSongList = async ()=>{
      await SongService.getSongList().then((response: any)=>{
        console.log(response.data);
        selectedSong.value = response.data[0];
        items.value = response.data;
      })
    }
    const changeSelectedSong = (item :ClickRowArgument)=>{
      let song :Song = {
        songNum : item.songNum,
        songName : item.songNum,
        singerNum :item.singerNum,
        categoryNum : item.categoryNum,
        replayCount : item.replayCount,
        songImageUrl : item.songImageUrl,
        registeredDate : item.registeredDate
      }

      selectedSong.value = song;
    }

    onBeforeMount(()=>{
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
          {{selectedSong}}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>