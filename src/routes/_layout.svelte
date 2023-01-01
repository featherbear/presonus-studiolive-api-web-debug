<script lang="ts">
  import { onMount, setContext } from "svelte";
  import Nav from "../components/Nav.svelte";

  export let segment: string;
</script>

<Nav {segment} />

<main>
  <slot />
</main>

<style global lang="scss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
