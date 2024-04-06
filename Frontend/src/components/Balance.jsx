import React from 'react'

function Balance({
    userBalance = 0,
}) {

  return (
    <div className='text-base font-extrabold'>
        Balance: <span className='text-gray-600'>₹{userBalance.toFixed(2)}</span>
        </div>
  )
}

export default Balance