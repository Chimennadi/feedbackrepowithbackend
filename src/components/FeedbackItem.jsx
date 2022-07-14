import React from 'react'
import { useContext} from 'react'
import { FaTimes, FaEdit } from 'react-icons/fa'
import Card from './shared/Card'
import FeedbackContext from '../context/FeedbackContext'


function FeedbackItem({ item }) {
    const { deleteFeedback, editFeedback } = useContext(FeedbackContext)

    return (
        <>
            <Card reverse={true}>
                <div className='num-display'>{item.rating}</div>
                <button onClick={() => deleteFeedback(item.id)} className='close'>
                    <FaTimes color='#ff6a95' />
                </button>
                <button onClick={() => editFeedback(item)} className='edit'>
                    <FaEdit color="#ff6a95" />
                </button>
                <div className='text-display'>{item.text}</div>
            </Card>
        </>
        
    )
}


export default FeedbackItem