<!-- filepath: c:\Users\ezequ\OneDrive\Documentos\Estudos\Notes\frontend\src\views\CreateNote.vue -->
<template>
  <div>
    <router-link to="/"><p>Voltar</p></router-link>
    <h2>Adicione uma nota:</h2>

    <form @submit.prevent="createNote">
      <div class="mb-3">
        <label for="title" class="form-label">Título:</label>
        <input
          type="text"
          v-model="title"
          id="title"
          class="form-control"
          placeholder="O que você pretende fazer?"
        />

        <label for="description" class="form-label">Descrição:</label>
        <textarea
          id="description"
          v-model="description"
          class="form-control textarea-min-height"
          style="min-height: 46vh;"
          placeholder="Descreva melhor sua nota..."
        ></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Criar nota</button>
    </form>
  </div>
</template>

<script>
import { BASE_URL } from "../config.js"; // Importa a URL base do arquivo de configuração 
export default {
  name: "CreateNote",
  data() {
    return {
        title: "",
        description: "",
      apiURL: BASE_URL,
    };
  },
  methods: {
    async createNote() {
      try {
        const data = {
          title: this.title,
          description: this.description,
        }
        const response = await fetch(`${this.apiURL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          this.$router.push("/"); // Redireciona para a página inicial
        } else {
          alert("Erro ao criar a nota.");
        }
      } catch (error) {
        console.error("Erro ao criar a nota:", error);
        alert("Erro ao criar a nota.");
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
button {
  display: block;
  margin-right: auto
}
</style>