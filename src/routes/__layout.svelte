<script>
  // imports
  import { io } from 'socket.io-client';
  import { onMount } from 'svelte';
  import { loaded, socket } from '$stores';
  import '../app.css';

  // components
  import { Loading } from '$components';

  // lifecycle
  onMount(async () => {
    $socket = io();
    $socket.emit('dbInit', {}, (docs) => {
      $loaded.db.bool = true;
      console.log(docs);
    });
  });
</script>

<div class="bg-gray-900 text-white min-h-screen">
  <slot />
</div>

<Loading />
