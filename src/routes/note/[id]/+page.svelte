<script lang="ts">
  import NoteCard from "$lib/components/NoteCard.svelte"

  import type { PageData } from "./$types"
  export let data: PageData
</script>

<svelte:head>
  <title>{data.note.title}</title>
</svelte:head>

<h1>{data.note.title}</h1>

<div class="buttons">
  <a
    href={`/note/${data.note.id}/new`}
    class="btn btn-spaced btn-outline-secondary">Add a subnote</a
  >

  <a
    href={`/note/edit/${data.note.id}`}
    class="btn btn-spaced btn-outline-secondary">Edit note</a
  >

  {#if data.note.parentId}
    <a
      href={`/note/${data.note.parentId}`}
      class="btn btn-spaced btn-outline-secondary">Go to parent note</a
    >
  {:else}
    <a href="/" class="btn btn-spaced btn-outline-secondary">Go to top level</a>
  {/if}
</div>

<hr />

<p>
  {data.note.body}
</p>
<hr />
{#each data.note.children as child (child.id)}
  <NoteCard href={`/note/${child.id}`} title={child.title} body={child.body} />
{/each}

<style>
  .btn-spaced {
    margin: 0.125rem 0;
  }
</style>
