<script>
  // _imports
  import { onMount } from 'svelte';
  import { loaded } from '$stores';

  // components
  import { Check } from 'svelte-hero-icons';
  import Icon from 'svelte-hero-icons/Icon.svelte';

  // props ( internal )
  let seconds = 0;
  const items = {
    loaded: [],
    loading: []
  };

  // props ( dynamic )
  $: if ($loaded) {
    items.loaded = Object.values($loaded).filter(({ bool }) => bool);
    items.loading = Object.values($loaded).filter(({ bool }) => !bool);
  }
  $: loadingClasses =
    items.loading.length === 0
      ? 'pointer-events-none opacity-0'
      : 'pointer-events-auto opacity-100';
  
  // lifecycle
  onMount(() => {
    setInterval(()=>{
      seconds++;
    }, 1000)
  })
</script>

<div
  class="fixed top-0 left-0 w-screen h-screen bg-gray-900 flex items-center justify-center text-white transition duration-1000 {loadingClasses}"
>
  <div class="flex flex-col space-y-[.5rem] p-[1rem]">
    <div class="font-bold text-[1.25rem]">Loading</div>
    {#each Object.values($loaded) as { bool, description }}
      <div class="flex justify-between space-x-[1rem] items-center transition duration-200 text-white {bool ? 'text-opacity-100' : 'text-opacity-50'}">
        <div>{description}</div>
        <div
          class="block w-[1rem] h-[1rem] relative"
        >
          <Icon src={Check} class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1rem] h-[1rem] {bool ? 'opacity-100' : 'opacity-0'}" />
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 {bool ? 'opacity-0' : 'opacity-100'}">
            {'.'.repeat((seconds % 3)+1)}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
