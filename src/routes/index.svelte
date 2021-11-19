<script>
  // imports
  import { socket } from '$stores';

  $: if ($socket) {
  }
</script>

<a href="/test">Test</a>
<slot />
