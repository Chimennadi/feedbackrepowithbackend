import { createContext, useState, useEffect } from 'react'


const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    //Once feedbacontext open, fetchfeedback load by the effect
    useEffect(() => {
        fetchFeedback()
    }, [])

    //Fetch Feedback
    const fetchFeedback = async () => {
        const response = await fetch('http://localhost:5000/feedback')
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
    }

    //Add feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`, 
            {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newFeedback),
            })

        const data = await response.json()

        setFeedback([data, ...feedback])
    }

    //Delete Feedback
    const deleteFeedback = async (id) => {
        if(window.confirm("Are you sure you want to delete?")) {
            await fetch(`http://localhost:5000/feedback/${id}`, { method: 'DELETE'})
        setFeedback(feedback.filter((item) => item.id !== id ))
        }
    }

    //Update Feedback
    const updateFeedback = async (id, upItem) => {
        const response = await fetch(`http://localhost:5000/feedback/${id}`, {
            method: 'PUT',
            header: { 'Content-Type': 'application/json'},
            body: JSON.stringify(upItem)
        })

        const data = await response.json()

        setFeedback(feedback.map((item) => item.id === id ? {...item, ...data } : item ))
    } 

    //Edit Feedback
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    //Functions and variables pass down to providers
    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback
    }}>
        { children }
    </FeedbackContext.Provider>
}

export default FeedbackContext