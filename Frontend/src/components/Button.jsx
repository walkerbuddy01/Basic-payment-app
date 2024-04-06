import React from 'react'

function Button({
    children,
    className = "",
    onClick
}) {
  return (
    <button onClick={onClick} className={`flex items-center justify-center  p-2 rounded-xl text-sm font-medium bg-black text-white ${className}`}>{children}</button>
  )
}

export default Button