<script lang="ts">
  import type Payload from "./types/Payload";
  export let data: Payload;

  import dayjs from 'dayjs'
</script>

<tr>
    <td>
        {dayjs(data.timestamp).format("DD/MM/YY hh:mm:ss a")}
    </td>
    <td>
        {data.code}
    </td>
    <td>
        <pre>{JSON.stringify(data.data, null, 4)}</pre>
    </td>
</tr>
