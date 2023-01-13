<script lang="ts">
  import type { PageData } from "./$types"
  import NoteCard from "$lib/components/NoteCard.svelte"
  export let data: PageData

  const notes = data.notes
</script>

<svelte:head>
  <title>NoteTree - Home</title>
</svelte:head>
{#if data.session?.user}
  <p>
    <a href="/note/new" class="btn btn-outline-secondary">Add new note!</a>
  </p>
  {#if notes.length > 0}
    <div>
      {#each notes as note (note.id)}
        <NoteCard
          href={`/note/${note.id}`}
          title={note.title}
          body={note.body}
        />
      {/each}
    </div>
  {/if}
{:else}
  <h2>Please sign in to begin.</h2>
{/if}
