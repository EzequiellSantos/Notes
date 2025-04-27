<template>
  <div>
    <router-link to="/"><p>Voltar</p></router-link>
    <h2>Editar Nota:</h2>

    <form @submit.prevent="updateNote">
      <div class="mb-3">
        <label for="title" class="form-label">Título:</label>
        <input
          type="text"
          v-model="note.title"
          id="title"
          class="form-control"
          placeholder="O que você pretende fazer?"
        />

        <label for="description" class="form-label">Descrição:</label>
        <textarea
          id="description"
          v-model="note.description"
          class="form-control textarea-min-height"
          style="min-height: 46vh;"
          placeholder="Descreva melhor sua nota..."
        ></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Atualizar Nota</button>
    </form>
  </div>
</template>

<script>
import { BASE_URL } from "../config.js"; // Importa a URL base da API

export default {
  name: "NoteView",
  data() {
    return {
      note: {
        title: "",
        description: "",
      },
      apiURL: BASE_URL,
    };
  },
  created() {
    this.fetchNote();
  },
  methods: {
    // Busca os dados da nota com base no ID da rota
    async fetchNote() {
      try {
        const id = this.$route.params.id; // Obtém o ID da rota
        const response = await fetch(`${this.apiURL}/${id}`);
        if (response.ok) {
          const data = await response.json();
          this.note = {
            title: data.title,
            description: data.description,
          };
        } else {
          alert("Erro ao carregar a nota.");
        }
      } catch (error) {
        console.error("Erro ao buscar a nota:", error);
        alert("Erro ao buscar a nota.");
      }
    },
    // Atualiza os dados da nota
    async updateNote() {
      try {
        const id = this.$route.params.id; // Obtém o ID da rota
        const response = await fetch(`${this.apiURL}/notes/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.note),
        });

        if (response.ok) {
          alert("Nota atualizada com sucesso!");
          this.$router.push("/"); // Redireciona para a página inicial
        } else {
          alert("Erro ao atualizar a nota.");
        }
      } catch (error) {
        console.error("Erro ao atualizar a nota:", error);
        alert("Erro ao atualizar a nota.");
      }
    },
  },
};
</script>

<style scoped>
h2, .mb-3, p{
  text-align: left;
}
label {
  margin-top: 5px;
}
button{
  display: block;
  margin-right: auto
}
</style>