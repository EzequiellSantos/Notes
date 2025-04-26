<!-- filepath: c:\Users\ezequ\OneDrive\Documentos\Estudos\Notes\frontend\src\views\CreateNote.vue -->
<template>
  <div>
    <router-link to="/">Voltar</router-link>
    <h2>Adicione uma nota:</h2>

    <form @submit.prevent="createNote">
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
          class="form-control"
          placeholder="Descreva melhor sua nota..."
        ></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Criar nota</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateNote",
  data() {
    return {
      note: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    async createNote() {
      try {
        const response = await fetch("http://localhost:3000/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.note),
        });

        if (response.ok) {
          alert("Nota criada com sucesso!");
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
/* Adicione estilos específicos para este componente, se necessário */
</style>