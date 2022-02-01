<template>
  <div
    id="v-player"
    :class="['video-player', customClass]"
  />
</template>

<script>
import Player from '@vimeo/player'
export default {
  props: {
    customClass: {
      type: String,
      default: ''
    },
    videoSrc: {
      type: String,
      required: true
    },
    isForTrailer: {
      type: Boolean,
      default: true
    },
    courseUri: {
      type: String,
      default: '',
      required: false
    },
    autoPlay: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      player: null,
      percentageToSetAsViewed: 80
    }
  },
  computed: {
    currentLesson () {
      const courseStore = this.$store.state.course.course
      if (courseStore) {
        return this.$store.state.course.course_watch.currentLesson
      }
      return ''
    },
    playerOptions () {
      const opts = {
        url: '',
        responsive: true,
        autoplay: true,
        transparent: true
      }
      return opts
    }
  },
  watch: {
    videoSrc (newVal, oldVal) { // watch it
      if (newVal !== oldVal) {
        this.setSrc(true)
      }
    }
  },
  mounted () {
    this.setPlayerListeners()
  },
  methods: {
    setPlayerListeners () {
      this.playerOptions.url = this.videoSrc
      if (this.isForTrailer) {
        this.playerOptions.autoplay = false
      }
      this.player = new Player('v-player', this.playerOptions)
      if (!this.isForTrailer) {
        this.player.on('ended', () => {
          this.videoEnd()
        })
      }
    },
    setSrc (play = false) {
      this.playerOptions.url = this.videoSrc
      this.player.loadVideo(this.playerOptions)
        .then(() => {
          if (play === true) {
            this.player.play()
          }
        })
    },
    videoEnd () {
      this.validateViewed()
    },
    async validateViewed () {
      const duration = await this.player.getDuration()
      const played = await this.player.getPlayed()
      let viewed = 0
      played.forEach((range) => {
        viewed += range[1] - range[0]
      })
      // console.log("Duration: ", duration);
      // console.log("Viewed: ", viewed);
      const viewedPercentage = viewed * 100 / duration
      // console.log('viewedPercentage: ', viewedPercentage)
      if (viewedPercentage >= this.percentageToSetAsViewed) {
        this.saveAsViewed()
      }
      this.goToNextLesson()
    },
    saveAsViewed () {
      this.$store.dispatch('course/setViewedLesson', { lessonId: this.currentLesson.lessonId })
    },
    goToNextLesson () {
      if (this.autoPlay) {
        this.$store.dispatch('course/goToNextLesson', { courseUri: this.courseUri })
      }
    }
  }
}
</script>

<style scoped>
.video-player {
  border-radius: 5px;
  margin: 0 auto;
}

.video-player > iframe {
  margin: auto;
}
</style>
