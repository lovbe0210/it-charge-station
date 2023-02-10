<template>
  <div>
    <music-detail-card class="musicDetailCard"></music-detail-card>
    <bottom-control></bottom-control>
  </div>
</template>

<script>
  import BottomControl from "@/components/common/music/BottomControl";
  import MusicDetailCard from "@/components/common/music/MusicDetailCard";

  export default {
    name: "MusicIndex",
    data() {
      return {}
    },
    components: {
      BottomControl,
      MusicDetailCard
    }
  }
</script>

<style scoped>

</style>
