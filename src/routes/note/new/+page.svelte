<script lang="ts">
  import type { ActionData } from "./$types"
  import { enhance } from "$app/forms"
  export let form: ActionData
</script>

<h1>You hit the new note page!</h1>
<form use:enhance method="post">
  <p>
    <label for="title">Title</label>
    <input id="title" type="text" name="title" />
  </p>
  <p>
    <label for="body">Body</label>
    <textarea id="body" name="body" />
  </p>
  <button type="submit">submit</button>
</form>
{#if form?.error}
  <ul>
    {#each form.errors as error}
      <li>{error.message}</li>
    {/each}
  </ul>
{/if}
