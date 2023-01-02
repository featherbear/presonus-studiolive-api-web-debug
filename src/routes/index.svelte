<script lang="ts">
  import { onMount, setContext } from "svelte";

  import type { Socket } from "socket.io-client";
  import Row from "../components/payload/Row.svelte";
  import type Payload from "../components/payload/types/Payload";
  let client: Socket;

  let messages = [];

  onMount(async () => {
    console.log("start");
    client = await import("socket.io-client").then((S) =>
      S.connect({ path: "/p" })
    );

    console.log("Ready");
    client.on("p", function (payload: Payload) {
      updateType(payload.code);
      messages = [{ ...payload }, ...messages];
    });
  });

  import { UIState } from "../components/UIState";

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

<section>
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">Use relative time</span>
      <input
        type="checkbox"
        class="toggle"
        checked={$UIState.useRelativeTime}
        on:change={function ({ target }) {
          UIState.update((v) => ({ ...v, useRelativeTime: target["checked"] }));
        }}
      />
    </label>
  </div>
</section>

<div class="filters">
  <div>Payload Filters</div>
  {#each types as code}
    <button
      class="btn"
      on:click={() => toggleCode(code)}
      class:btn-accent={activeTypes.includes(code)}>{code}</button
    >
  {/each}
  <div class="divider" />
</div>

<div class="overflow-x-auto">
  <table class="table w-full">
    <!-- head -->
    <thead>
      <tr>
        <th>Timestamp</th>
        <th>Code</th>
        <th>Data</th>
        <th>Raw</th>
      </tr>
    </thead>
    <tbody>
      {#each messages.filter(({ code }) => activeTypes.includes(code)) as data}
        <Row {data} />
      {/each}
    </tbody>
  </table>
</div>

<style lang="scss">
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
