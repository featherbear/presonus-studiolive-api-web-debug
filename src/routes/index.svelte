<script lang="ts">
  import successkid from "images/successkid.jpg";
  import { onMount } from "svelte";

  import type { Socket } from "socket.io-client";
  let client: Socket;

  let messages = [];

  onMount(async () => {
    console.log("start");
    client = await import("socket.io-client").then((S) =>
      S.connect({ path: "/p" })
    );

    console.log("Ready");
    client.on("p", function (data: { code: string; data: any }) {
      updateType(data.code);
      messages = [data, ...messages];
    });
  });

  let types = [];
  function updateType(type: string) {
    if (types.includes(type)) return;
    types = [...types, type];
  }
  let activeTypes = [];
  function toggleCode(type: string) {
    if (activeTypes.includes(type)) {
      activeTypes = activeTypes.filter((c) => c != type);
    } else {
      activeTypes = [...activeTypes, type];
    }
  }
</script>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

<figure>
  <img alt="Success Kid" src={successkid} />
  <figcaption>Have fun with Sapper!</figcaption>
</figure>

<div class="filters">
  {#each types as code}
    <span
      on:click={() => toggleCode(code)}
      class:active={activeTypes.includes(code)}>{code}</span
    >
  {/each}
</div>

{#each messages.filter(({ code }) => activeTypes.includes(code)) as data}
  <pre>
    {JSON.stringify(data, null, 2)}
  </pre>
{/each}

<style lang="scss">
  div.filters {
    span {
      & .active {
        font-weight: bold;
        color: red;
      }
    }
  }

  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>
