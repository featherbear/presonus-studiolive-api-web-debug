<script lang="ts">
  import type Payload from "./types/Payload";
  export let data: Payload;

  import Time from "../Clock";
  import UIState from "../UIState";
  import dayjs from "../dayjs";
  import PayloadFormatter from "./PayloadFormatter";
  import ArrayBufferToHex from "./ArrayBufferToHex";

  console.log(data);
</script>

<tr class="hover">
  <td>
    {#if $UIState.useRelativeTime}
      {dayjs(data.timestamp).from($Time)}
    {:else}
      {dayjs(data.timestamp).format("DD/MM/YY hh:mm:ss a")}
    {/if}
  </td>
  <td>
    {data.code}
  </td>
  <td>
    <pre>{PayloadFormatter(data)}</pre>
  </td>
  <td>
    <pre>{ArrayBufferToHex(data.raw)}</pre>
  </td>
</tr>
