<script lang="ts">
  import type { PageData } from "./$types"
  import { Card } from "sveltestrap"
  export let data: PageData

  const notes = data.notes
</script>

<p>
  <a href="/note/new" class="btn btn-outline-secondary">Add new note</a>
</p>
{#if notes.length > 0}
  <div>
    <ul>
      {#each notes as note (note.id)}
        <a href={`/note/${note.id}`}>
          <Card class="p-2 mb-3">
            <h4>
              {note.title}
            </h4>
            <p>{note.body}</p>
          </Card>
        </a>
      {/each}
    </ul>
  </div>
{/if}

<style>
  a {
    text-decoration: none;
    color: inherit;
  }

  h4 {
    text-decoration: underline;
  }
</style>
