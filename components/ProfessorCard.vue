<template>
  <div class="professor-card">
    <header class="d-flex p-2">
      <template v-if="!loading">
        <b-avatar
          :src="getImgSrc(professor.photo)"
          size="74px"
        />
        <div class="ml-3">
          <p>Tutor del curso</p>
          <p>{{ professor.name }}</p>
          <p>{{ professor.title }}</p>
        </div>
      </template>
      <template v-else>
        <b-skeleton type="avatar" size="74px" />
        <div class="w-50 ml-3">
          <p>Tutor del curso</p>
          <b-skeleton height="22px" width="90%" />
          <b-skeleton height="18px" width="80%" />
        </div>
      </template>
    </header>
    <div class="body p-2">
      <template v-if="!loading">
        {{ professor.biography }}
      </template>
      <template v-else>
        <b-skeleton height="18px" width="90%" />
        <b-skeleton height="18px" width="80%" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfessorCard',
  props: {
    professor: {
      type: Object,
      required: false,
      default () { return {} }
    },
    loading: {
      type: Boolean,
      default: true

    }
  },
  methods: {
    getImgSrc (imgSrc) {
      return this.$config.cdnBaseURL + imgSrc
    }
  }
}
</script>

<style scoped>
.professor-card {
  max-width: 540px;
}

header p {
  color: var(--dark-gray-3);
  font-weight: 800;
  margin-bottom: 0;
}

header p:nth-child(1) {
  color: var(--light-blue-1);
  font-size: .75rem;
}

header p:nth-child(2) {
  font-size: 1.25rem;
}

header p:nth-child(3) {
  font-size: .84rem;
}

.body {
  color: var(--dark-gray-5);
  font-size: 1rem;
}
</style>
