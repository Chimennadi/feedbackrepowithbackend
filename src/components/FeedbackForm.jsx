import React from 'react'
import { useState, useContext, useEffect} from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from "./RatingSelect"
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {
    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDisable, setBtnDisable] = useState(true)
    const [message, setMessage] = useState('')

    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)

    //We also try to tell react to do this after click event has been perform
    useEffect(() => {
        if(feedbackEdit.edit === true) {
            setBtnDisable(false)
            setText(feedbackEdit.item.text)
        }
    }, [feedbackEdit])

    const defaultRating = (rating) => {
        setRating(rating)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim().length > 10) {
            const newFeedback = {
                text,
                rating
            }

            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
            addFeedback(newFeedback)
            }

            setText('')
            setBtnDisable(true)
        }
    }

    const handleTextChange = (e) => {
        if(text === '') {
            setBtnDisable(true)
            setMessage(null)
        } else if(text !== '' && text.trim().length <= 10) {
            setMessage('Text must be at least 10 characters')
            setBtnDisable(true)
        } else {
            setMessage(null)
            setBtnDisable(false)
        }
        setText(e.target.value)
    }

    return (
        <>
            <Card reverse={true}>
                <form onSubmit={handleSubmit}>
                    <h3>How would you rate your service with us?</h3>
                    <RatingSelect select={defaultRating} />
                    <div className='input-group'>
                        <input onChange={handleTextChange} placeholder='Write a review' value={text} style={{backgroundColor: "transparent", color: "#fff"}}/>
                        <Button type='submit' isDisable={btnDisable} version='secondary'>Send</Button>
                    </div>
                    {message && <div className='message'>{message}</div>}
                </form>
            </Card>
        </>
        
    )
}

export default FeedbackForm