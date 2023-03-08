import React from "react"
import "./ModeSelector.css"

function ModeSelector({ questionMode, answerMode, reverseQuestionAndAnswerModes, reversedQuestionAndAnswerModes }) {
    return (
        <div className="ModeSelector">
            <div className="ModeSelector__Mode">{questionMode.name}</div>
            <button className="ModeSelector__Button" onClick={reverseQuestionAndAnswerModes}>
                <i className={`bi bi-arrow-repeat ${reversedQuestionAndAnswerModes ? "upside-down" : ""}`}></i>
            </button>
            <div className="ModeSelector__Mode">{answerMode.name}</div>
        </div>
    )
}

export default ModeSelector
