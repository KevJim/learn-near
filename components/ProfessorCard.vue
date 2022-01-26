<template>
  <div class="professor-card">
    <header class="d-flex p-2">
      <b-avatar src="https://placekitten.com/300/300" size="74px" />
      <div class="ml-3">
        <p>Tutor del curso</p>
        <p>Abril Urias</p>
        <p>Arquitecto Mobile en Banco de Crédito BCP</p>
      </div>
    </header>
    <div class="body p-2">
      Google Developer Expert(Google Assistant) Me gusta dar todo de mí al encontrar retos nuevos de la vida diaria, buscando la mejora continua de mis aptitudes, estudiando y ganando conocimiento para mi crecimiento.
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfessorCard'
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
