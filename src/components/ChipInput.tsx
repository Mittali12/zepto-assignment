'use client'
import React, { useState, useRef, useEffect } from 'react';
import Chip from './Chip';
import UsersDropdown from './UsersDropdown';
import { userObjType } from './Util';
import { USER_LIST } from './Config';

interface ChipInputBox {
    chipInputFocus: boolean;
    setChipInputFocus: React.Dispatch<React.SetStateAction<boolean>>;
}


const ChipInput: React.FC<ChipInputBox> = ({ chipInputFocus, setChipInputFocus }) => {
    const [selectedUser, setSelectedUser] = useState<userObjType[]>([]);
    const [dropdownUserList, setDropdownUserList] = useState<userObjType[]>(USER_LIST);
    const [userInput, setUserInput] = useState<string>('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [backspaceRemove, setBackspaceRemove] = useState<boolean>(false)

    useEffect(() => {
        if (inputRef.current && chipInputFocus) {
            inputRef.current.focus();
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setUserInput(inputValue);

        const remainingUsers = USER_LIST.filter(user => !selectedUser.includes(user));

        const filteredUsers = remainingUsers.filter(user => user.name.toLowerCase().includes(inputValue.toLowerCase()));
        setDropdownUserList(filteredUsers);
        setBackspaceRemove(false);
    };

    const handleFilteredUser = (tempSelectedUserList = selectedUser) => {
        return USER_LIST.filter(user => !tempSelectedUserList.includes(user));
    }

    const handleUserSelect = (index: number) => {
        const tempSelectedUserList = [...selectedUser, dropdownUserList[index]];
        setSelectedUser(tempSelectedUserList)
        setDropdownUserList(handleFilteredUser(tempSelectedUserList))
        setUserInput('')
        setBackspaceRemove(false);
    };

    const removeChip = (index: number) => {
        const updatedSelectedUser = selectedUser.filter((user, idx) => index !== idx);
        setSelectedUser(updatedSelectedUser)
        setDropdownUserList(handleFilteredUser(updatedSelectedUser))
        setBackspaceRemove(false);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && userInput === '') {
            setBackspaceRemove(!backspaceRemove)
            if (backspaceRemove && selectedUser.length > 0) {
                removeChip(selectedUser.length - 1);
                setBackspaceRemove(false);
            }
        }
    }

    return (
        <div
            className='w-full p-2 border-b-2 py-2 px-3 flex flex-wrap gap-4 items-center border-blue-500 cursor-text'
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                setChipInputFocus(true);
            }}
        >
            {selectedUser.map((user, index) => (
                <Chip
                    key={index}
                    name={user?.name}
                    index={index}
                    removeChip={removeChip}
                    backspaceRemove={backspaceRemove && index == selectedUser.length - 1}
                />
            ))}
            <span className='relative'>
                <input
                    ref={inputRef}
                    type='text'
                    className='text-1xl focus-visible:outline-none w-auto placeholder:text-sm  placeholder:font-semibold'
                    value={userInput}
                    placeholder={selectedUser.length < USER_LIST.length ? 'Add new user' : ''}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                {chipInputFocus && <UsersDropdown userInput={userInput} userList={dropdownUserList} onSelect={handleUserSelect} />}
            </span>
        </div>
    );
};

export default ChipInput;
