import React from 'react'

type Props = {
  title: string;
}

function Head({ title }: Props) {
  return (
    <header style={{ top: '5%'}} className='header'>
      <h1 >{title}</h1>
    </header>
    
  )
}

export default Head