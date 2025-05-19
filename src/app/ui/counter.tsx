"use client";

import { useState } from "react";

interface CounterProps {
  catFact: string;
}

export default function Counter({ catFact }: CounterProps) {
  const [counter, setCounter] = useState(0);

  return (
    <div className="flex flex-col">
      Cat fact of the day: {catFact}
      <button onClick={() => setCounter((c) => c + 1)}>
        Clicked {counter} times.
      </button>
    </div>
  );
}
