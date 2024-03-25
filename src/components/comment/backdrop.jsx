import React from 'react'
import {motion} from 'framer-motion'
import './comment.scss'
import { useDispatch } from 'react-redux'
import { ActiveModal } from '../../reducer/event'

const BackDrop=({children , onClick})=> {
  const dispatch=useDispatch()
  return (
    <motion.div
        className='backdrop'
        onClick={()=>{onClick();dispatch(ActiveModal(false))}}
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
    >
        {children}
    </motion.div>
  )
}

export default BackDrop
