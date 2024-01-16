'use client'
import ChipsCard from '@/components/ChipInput';
import { useState } from 'react';

export default function Home() {
  const [chipInputFocus, setChipInputFocus] = useState<boolean>(false);

  return (
    <div className='w-screen overflow-x-hidden min-h-screen h-auto overflow-y-scroll py-10 px-40 flex flex-col items-center gap-10' onClick={() => setChipInputFocus(false)}>
      <h1 className='w-full text-center text-blue-500 font-bold text-2xl md:text-4xl'>Pick Users</h1>
      <ChipsCard chipInputFocus={chipInputFocus} setChipInputFocus={setChipInputFocus} />
    </div>
  );
}
