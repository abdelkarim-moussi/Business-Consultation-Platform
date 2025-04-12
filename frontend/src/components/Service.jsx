import React from 'react'

export default function Service({src,alt,title}) {
  return (
    <div className='flex flex-col items-center'>
      <img src={src} alt={alt} />
      <h3 className='text-md font-semibold'>{title}</h3>
    </div>
  )
}

