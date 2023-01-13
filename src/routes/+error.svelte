<script lang="ts">
  import { page } from "$app/stores"
</script>

<h1>{$page.error?.message}</h1>

<p><em>Not really sure how you got here, but...</em></p>
<a href="/" class="btn btn-outline-secondary">Click here to go home!</a>

<style>
  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }
</style>
