<script lang="ts">
  import { enhance } from "$app/forms"
</script>

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
