import React from 'react'

type StarComponentProps = {
  numberOfUncolored?: number
  numberOfColored?: number
}

const StarComponent = (props: StarComponentProps) => {
  const renderStars = ()=>{
    const stars = []

    if(props.numberOfUncolored !== undefined){
    for (let i = 0; i < props.numberOfUncolored; i++){
        stars.push(<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`w-4 h-4 text-gray-400`}>
        <path fill-rule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clip-rule="evenodd" />
      </svg></span>)
    }
    return stars 
  }
}
const renderColoredStars = ()=>{
  const stars = []
  if(props.numberOfColored !== undefined){
  for (let i = 0; i < props.numberOfColored; i++){
      stars.push(<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`w-4 h-4 text-yellow-400`}>
      <path fill-rule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clip-rule="evenodd" />
    </svg></span>)
  }
  return stars
}
}
return (
  <div className='flex gap-1'>
    {renderColoredStars()} 
    {renderStars()}
  </div>
)
}

export default StarComponent