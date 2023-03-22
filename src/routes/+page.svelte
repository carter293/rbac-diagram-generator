<!-- App.svelte -->
<script lang="ts">
	import RBACDiagram from "../components/RBACDiagram.svelte";
	import ScrollButton from "../components/ScrollButton.svelte";
  </script>
  
  <!-- <style>
	main {
	  text-align: center;
	  padding: 1em;
	  max-width: 100%;
	  margin: 0 auto;
	}
  </style>
   -->
  <style>
	* {
	  box-sizing: border-box;
	}

  
	.container {
	  display: flex;
	  flex-direction: column;
	  min-height: 100vh;
		background-color: #F2EFEA;
	}
  
	.header {
	  background-color: #fc7753;	
	  color: white;
	  padding: 1em;
	  text-align: center;
	}
  </style>
  


  
  <main>
	<div class="container">
		<div class="header">
			<h1>RBAC Diagram</h1>
		</div>
		<RBACDiagram />
	</div>
	<ScrollButton />
  </main>