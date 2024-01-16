'use client'
import React from 'react';
import { RandomAvatar } from 'react-random-avatars';
import { userObjType } from './Util';
import HighlightedText from './HighlightedText';

interface UsersDropdownProps {
    userList: userObjType[];
    onSelect: (selected: number) => void;
    userInput: string;
}

const UsersDropdown: React.FC<UsersDropdownProps> = ({ userList, onSelect, userInput }) => {
    return (
        <div className='absolute shadow-lg w-[400px] max-h-[250px] overflow-y-scroll scrollbarhidden border rounded-md bg-white h-auto'>
            {userList.length > 0 ?
                userList.map((item: userObjType, index: number) => (
                    <div
                        className='w-full p-2 flex items-center gap-3 cursor-pointer hover:bg-gray-200'
                        key={index}
                        onClick={() => onSelect(index)}
                    >
                        <RandomAvatar name={item?.name} size={30} />
                        <span className='text-sm font-medium'>
                            <HighlightedText
                                text={item?.name || ''}
                                highlight={userInput}
                            />
                        </span>
                        <span className='text-xs text-gray-00'>{item.email}</span>
                    </div>
                ))
                : <span className='w-full p-2 flex items-center gap-3 cursor-pointer hover:bg-gray-200'>No more user</span>
            }
        </div>
    );
};

export default UsersDropdown;