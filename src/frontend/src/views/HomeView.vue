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
            <td style="font-weight: bolder;">{{ index }}</td>
            <td class="title-column">
              <router-link :to="`/notes/${note._id}`">{{ note.title }}</router-link>
            </td>
            <td id="actions" class="actions-column">
              <button id="RemoveBtn" @click="deleteNote(note._id)" class="btn btn-danger">Remover</button>
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
import { BASE_URL } from "../config.js"; // Importa a URL base do arquivo de configuração
export default {
  name: "HomeView",
  data() {
    return {
      notes: [],
      apiURL: BASE_URL
    };
  },
  created() {
    this.fetchNotes();
  },
  methods: {
    async fetchNotes() {
      try {
        const response = await fetch(`${this.apiURL}/`);
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
        const response = await fetch(`${this.apiURL}/delete`, {
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
.table>:not(caption)>*>* {
    background-color: var(--color-background-light);
}

table > thead{
    border-bottom: 2px solid #212529a9;
}

tr > th{
    text-align: left;
}

.title-column{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100px;
    text-align: left;
}

th{
    line-height: 3em;
}

td{
  line-height: 46px;
}

.title-column a{
    text-decoration: none;
    color: #212529;
    text-align: left;
}

.title-column a:hover{
    text-decoration: underline;
}

#RemoveBtn{
  margin: 7px;
  display: block;
}

#mainViewNotes a.btn {
    height: 40px;
    margin-top: 6px;
}

</style>