<script lang="ts">
  import type { PageData } from "./$types"
  export let data: PageData
</script>

<h1>{data.note.title}</h1>
<a href={`/note/${data.note.id}/new`} class="btn btn-outline-secondary"
  >Add a subnote</a
>
<hr />
<p>
  {data.note.body}
</p>
<hr />
<ul>
  {#each data.note.children as child (child.id)}
    <li>{child.title}</li>
  {/each}
</ul>
