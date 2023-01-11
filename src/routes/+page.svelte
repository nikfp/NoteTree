<script lang="ts">
  import type { PageData } from "./$types"
  export let data: PageData

  const notes = data.notes
</script>

<p>
  <a href="/note/new">Add new note</a>
</p>
{#if notes.length > 0}
  <div>
    <ul>
      {#each notes as note (note.id)}
        <li>
          <p>
            <a href={`/note/${note.id}`}>
              {note.title}
            </a>
          </p>
          <p>{note.body}</p>
        </li>
      {/each}
    </ul>
  </div>
{/if}
