import React from 'react'
import { useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FeedbackItem from './FeedbackItem'
import FeedbackContext from '../context/FeedbackContext'
import Spinner from './shared/Spinner'

function FeedbackList() {
    const { feedback, isLoading } = useContext(FeedbackContext)

    if(!isLoading && (!feedback || feedback.length === 0)) {
        return  (
            <div className='container'>
                <h4>No Feedback Yet</h4>
            </div>
        )
    }
    return isLoading ? <Spinner /> : (
        <div className='container'>
            <div className='feedback-list'>
                <AnimatePresence>
                    {feedback.map((item) => (
                        <motion.div 
                            key={item.id}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                        >
                            <FeedbackItem key={item} item={item} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
    
}

export default FeedbackList