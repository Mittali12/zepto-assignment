'use client'
import React, { FC } from 'react'
import { RandomAvatar } from 'react-random-avatars'

interface ChipProps {
    name: string;
    index: number;
    removeChip: (num: number) => void;
    backspaceRemove: boolean;
}

const Chip: FC<ChipProps> = ({ name, index, removeChip, backspaceRemove }) => {
    return (
        <div className={`bg-gray-300 text-gray-600 font-medium pr-2 w-fit rounded-full flex items-center gap-2 border cursor-default ${backspaceRemove ? "ring-2 ring-blue-500" : ""}`}>
            <RandomAvatar name={name} size={35} />
            <span className='font-semibold'>{name}</span>
            <span className='text-xl cursor-pointer' onClick={() => removeChip(index)}>x</span>
        </div>
    )
}

export default Chip