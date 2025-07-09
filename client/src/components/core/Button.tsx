import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export const Button = ({children, ...attributes}: Props) => {
  return (
    <button 
    type='button'
    onClick={attributes.onClick}
    className={`${attributes.className} bg-primary-purple-600 text-white font-bold px-4 py-2 rounded-md hover:bg-primary-purple-700 transition duration-300 ease-in-out hover:cursor-pointer`} >
        {children}
    </button>
  )
}
