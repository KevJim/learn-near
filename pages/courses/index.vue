<template>
  <div
    id="courses"
    class="container mt-5"
  >
    <h1>Cursos</h1>
    <b-form-group
      v-slot="{ ariaDescribedby }"
      label="Niveles de estudio"
    >
      <b-form-radio-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        class="level-btn"
        buttons
        button-variant="primary"
        name="buttons-2"
        size="sm"
        @change="selectLevel($event)"
      />
    </b-form-group>
    <div class="row mt-5">
      <b-col
        v-for="(course, index) in courses"
        :key="index"
        cols="12"
        sm="6"
        xl="3"
        class="mb-4"
      >
        <CourseCard
          :course-info="course"
        />
      </b-col>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoursesIndex',
  data () {
    return {
      selected: '', // Must be an array reference!
      options: [
        { text: 'Basico', value: 'basic' },
        { text: 'Intermedio', value: 'intermediate' },
        { text: 'Avanzado', value: 'advanced' }
      ],
      courses: [
        {
          name: 'Rust desde cero',
          imgSrc: 'course-4.png',
          uri: 'rust-desde-cero'
        },
        {
          name: 'Desarrolla tu primer contrato con assembly script',
          imgSrc: 'course-2.png',
          uri: 'assembly-script'
        },
        {
          name: 'Desarrolla tu primer contrato con Rust',
          imgSrc: 'course-3.png',
          uri: 'primer-contrato-rust'
        },
        {
          name: 'Crea una tienda nft',
          imgSrc: 'course-1.png',
          uri: 'crear-tienda-nft'
        },
        {
          name: 'Accesar a una Wallet',
          imgSrc: 'course-6.png',
          uri: 'accesar-wallet'
        },
        {
          name: 'Como funciona NEAR',
          imgSrc: 'course-5.png',
          uri: 'como-funciona-near'
        },
        {
          name: 'Desarrolla tu primer contrato con Rust',
          imgSrc: 'course-3.png',
          uri: 'primer-contrato-rust'
        },
        {
          name: 'Crea una tienda nft',
          imgSrc: 'course-1.png',
          uri: 'crear-tienda-nft'
        },
        {
          name: 'Rust desde cero',
          imgSrc: 'course-4.png',
          uri: 'rust-desde-cero'
        },
        {
          name: 'Desarrolla tu primer contrato con assembly script',
          imgSrc: 'course-2.png',
          uri: 'assembly-script'
        },
        {
          name: 'Desarrolla tu primer contrato con Rust',
          imgSrc: 'course-3.png',
          uri: 'primer-contrato-rust'
        },
        {
          name: 'Crea una tienda nft',
          imgSrc: 'course-1.png',
          uri: 'crear-tienda-nft'
        },
        {
          name: 'Accesar a una Wallet',
          imgSrc: 'course-6.png',
          uri: 'accesar-wallet'
        },
        {
          name: 'Como funciona NEAR',
          imgSrc: 'course-5.png',
          uri: 'como-funciona-near'
        },
        {
          name: 'Desarrolla tu primer contrato con Rust',
          imgSrc: 'course-3.png',
          uri: 'primer-contrato-rust'
        },
        {
          name: 'Crea una tienda nft',
          imgSrc: 'course-1.png',
          uri: 'crear-tienda-nft'
        }
      ]
    }
  },
  mounted () {
    const param = this.$route.params.level
    if (param) { this.selected = param }
  },
  methods: {
    selectLevel (opt) {
      this.$router.replace({ name: 'courses', params: { level: opt } })
    }
  }
}
</script>

<style>
.level-btn > .btn-primary {
  background: var(--light-blue-1);
  border-color: var(--light-blue-1);
}
</style>

<router>
  {
    path: '/courses/level/:level?'
  }
</router>
