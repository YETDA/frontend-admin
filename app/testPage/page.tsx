'use client';

import { useStore } from '@/stores/useStore';

export default function TestPage() {
  const count = useStore(state => state.count);
  const increase = useStore(state => state.increase);
  const decrease = useStore(state => state.decrease);
  return (
    <div>
      <h1>Test Page</h1>
      <h2>Count: {count}</h2>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}
