import React from 'react'

type Props = {
  title: string
  handleClick: () => void
}

const ButtonComponent = (props: Props) => {
  return (
    <div>
      <button onClick={()=>props.handleClick()} className={`my-1 bg-primaryColor hover:bg-primaryColorVar text-white h-[40px] w-[415px] text-center rounded-lg`}>{props.title}</button>
    </div>
  )
}

export default ButtonComponent