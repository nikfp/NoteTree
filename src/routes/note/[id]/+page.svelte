<script lang="ts">
  import type { PageData } from "./$types"
  export let data: PageData
</script>

<p>
  Title: {data.note.title}
  <br />
  {data.note.body}
  </p>
