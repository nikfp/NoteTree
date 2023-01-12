<script lang="ts">
  import NoteCard from "$lib/components/NoteCard.svelte"

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
    <NoteCard
      href={`/note/${child.id}`}
      title={child.title}
      body={child.body}
    />
  {/each}
</ul>
