<template>
  <div>
    <playlist-and-search></playlist-and-search>
    <music-detail-card></music-detail-card>
    <bottom-control></bottom-control>
  </div>
</template>

<script>
  import BottomControl from "@/components/common/music/BottomControl";
  import MusicDetailCard from "@/components/common/music/MusicDetailCard";
  import PlaylistAndSearch from "@/components/common/music/PlaylistAndSearch";

  export default {
    name: "MusicIndex",
    data() {
      return {}
    },
    components: {
      BottomControl,
      MusicDetailCard,
      PlaylistAndSearch
    }
  }
</script>

<style scoped>

</style>
