<script lang="ts">
  import BreadCrumbs from "$lib/components/BreadCrumbs.svelte"

  import NoteCard from "$lib/components/NoteCard.svelte"

  import type { PageData } from "./$types"
  export let data: PageData
</script>

<svelte:head>
  <title>{data.note.title}</title>
</svelte:head>

<BreadCrumbs id={data.note.id} />

<h1>{data.note.title}</h1>

{#if data.note.description}
  <h3>{data.note.description}</h3>
{/if}

<hr />

<div class="buttons">
  <a
    href={`/note/${data.note.id}/new`}
    class="btnn btnn-sm btnn-spaced btnn-outline-secondary">Add a subnote</a
  >

  <a
    href={`/note/edit/${data.note.id}`}
    class="btnn btnn-sm btnn-spaced btnn-outline-secondary">Edit note</a
  >

  {#if data.note.parentId}
    <a
      href={`/note/${data.note.parentId}`}
      class="btnn btnn-sm btnn-spaced btnn-outline-secondary">Go to parent note</a
    >
  {:else}
    <a href="/" class="btnn btnn-sm btnn-spaced btnn-outline-secondary"
      >Go to top level</a
    >
  {/if}
</div>

<hr />

<p>
  {data.note.body}
</p>
<hr />
{#each data.note.children as child (child.id)}
  <NoteCard
    href={`/note/${child.id}`}
    title={child.title}
    cardBody={child.description}
  />
{/each}

<a href={`/note/delete/${data.note.id}`} class="btnn btnn-outline-danger btnn-sm"
  >Delete this note</a
>

<style>
  .btn-spaced {
    margin: 0.125rem 0;
  }
</style>
