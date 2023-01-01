<script lang="ts">
  import successkid from "images/successkid.jpg";
  import { onMount } from "svelte";

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
    client.on("p", function (data: Payload) {
      updateType(data.code);
      messages = [
        {
          ...data,
          data: JSON.parse(data.data),
        },
        ...messages,
      ];
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

<div class="filters">
  <div>Payload Filters</div>
  {#each types as code}
    <span
      on:click={() => toggleCode(code)}
      class:active={activeTypes.includes(code)}>{code}</span
    >
  {/each}
</div>

{#each messages.filter(({ code }) => activeTypes.includes(code)) as data}
  <Row {data} />
{/each}



<div class="card w-96 bg-base-100 shadow-xl">
  <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>


<div class="form-control">
  <label class="label">
    <span class="label-text">Your Email</span>
  </label>
  <label class="input-group">
    <span>Email</span>
    <input type="text" placeholder="info@site.com" class="input input-bordered" />
  </label>
</div>



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
