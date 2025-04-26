<template>
   <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a href="/" class="navbar-brand">Notes</a>
        <span
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="false"
          aria-label="Toggle-Navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </span>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Minhas Notas</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/notes" class="nav-link">Adicionar Notas</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <main id="main-container" class="container">
      <router-view />
    </main>
    <footer id="footer">
      <p>Notes &copy;</p>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  margin-bottom: 100px;
}

textarea {
  min-height: 46vh;
}

#mainViewNotes {
  margin-bottom: 100px;
}

#actions {
  display: flex;
  flex-direction: row;
  justify-content: left;
  gap: 10px;
}

footer {
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 0;
  background-color: rgb(51, 51, 51);
  color: #cfcfcf;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

footer > p {
  margin-bottom: 0;
}
</style>
