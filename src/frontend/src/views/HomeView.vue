<!-- filepath: c:\Users\ezequ\OneDrive\Documentos\Estudos\Notes\frontend\src\views\Home.vue -->
<template>
  <div>
    <h1>Suas notas:</h1>

    <main id="mainViewNotes">
      <table id="myTable" class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Título</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(note, index) in notes" :key="note._id">
            <th scope="row">{{ index }}</th>
            <td class="title-column">
              <router-link :to="`/notes/${note._id}`">{{ note.title }}</router-link>
            </td>
            <td id="actions" class="actions-column">
              <button @click="deleteNote(note._id)" class="btn btn-danger">Remover</button>
            </td>
          </tr>
          <tr v-if="notes.length === 0">
            <td colspan="3">
              <p>
                Não há notas no sistema ainda,
                <router-link to="/notes">clique aqui</router-link> para adicionar.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      notes: [],
    };
  },
  created() {
    this.fetchNotes();
  },
  methods: {
    async fetchNotes() {
      try {
        const response = await fetch("http://localhost:3000/notes");
        if (response.ok) {
          this.notes = await response.json();
        } else {
          alert("Erro ao carregar as notas.");
        }
      } catch (error) {
        console.error("Erro ao buscar as notas:", error);
        alert("Erro ao buscar as notas.");
      }
    },
    async deleteNote(id) {
      try {
        const response = await fetch("http://localhost:3000/notes/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          alert("Nota removida com sucesso!");
          this.fetchNotes(); // Atualiza a lista de notas
        } else {
          alert("Erro ao remover a nota.");
        }
      } catch (error) {
        console.error("Erro ao remover a nota:", error);
        alert("Erro ao remover a nota.");
      }
    },
  },
};
</script>

<style scoped>
/* Adicione estilos específicos para este componente, se necessário */
</style>