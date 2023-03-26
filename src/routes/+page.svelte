<!-- App.svelte -->
<script lang="ts">
  import RBACDiagram from "../lib/components/RBACDiagram.svelte";
  import ScrollButton from "../lib/components/ScrollButton.svelte";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";

  inject({ mode: dev ? "development" : "production" });
</script>

<main>
  <div class="container">
    <div class="header">
      <h1>RBAC Diagram</h1>
    </div>
    <RBACDiagram />
  </div>
  <ScrollButton />
</main>

<style>
  * {
    box-sizing: border-box;
  }

  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #efe6dd;
  }

  .header {
    background-color: #0b6e4f;
    border-radius: 1em;
    color: white;
    padding: 1em;
    text-align: center;
  }
</style>
