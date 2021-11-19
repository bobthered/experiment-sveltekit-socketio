import { writable } from 'svelte/store';

const loaded = {
  db: {
    bool: false,
    description: 'Database connection'
  }
}

export default writable(loaded)