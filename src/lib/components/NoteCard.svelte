<script lang="ts">
  import { Card } from "sveltestrap"
  export let title: string
  export let body: string
  export let href: string
</script>

<a {href}>
  <Card class="p-2 mb-3">
    <h4>
      {title}
    </h4>
    <p>{body}</p>
  </Card>
</a>

<style>
  a {
    text-decoration: none;
    color: inherit;
  }

  h4 {
    text-decoration: underline;
  }
</style>
