import React, { useState } from "react"
import ModeSelector from "./ModeSelector.jsx"
import OptionButton from "./OptionButton.jsx"
import modes from "../data/modes.jsx"
import { generateNextOptionLetters, generateNextTargetLetter } from "../helpers/letterGenerator.js"
import "./Quiz.css"
import "./ModeSelector.css"

function AlphabetQuiz() {
    const [questionMode, setQuestionMode] = useState(modes[0])
    const [answerMode, setAnswerMode] = useState(modes[1])

    const [targetLetter, setTargetLetter] = useState()
    const [optionLetters, setOptionLetters] = useState()
    const [selectedLetter, setSelectedLetter] = useState()
    const [checkingState, setCheckingState] = useState(false)

    const [reversedQuestionAndAnswerModes, setReversedQuestionAndAnswerModes] = useState(false)

    function refreshLetter() {
        setCheckingState(false)
        setSelectedLetter(undefined)
        const nextTargetLetter = generateNextTargetLetter(targetLetter)
        const nextOptionLetters = generateNextOptionLetters(nextTargetLetter)
        setTargetLetter(nextTargetLetter)
        setOptionLetters(nextOptionLetters)
    }

    function reverseQuestionAndAnswerModes() {
        const previousQuestionMode = questionMode
        setQuestionMode(answerMode)
        setAnswerMode(previousQuestionMode)
        setReversedQuestionAndAnswerModes(!reversedQuestionAndAnswerModes)
    }

    return (
        <div className="Quiz">
            <ModeSelector questionMode={questionMode}
                          answerMode={answerMode}
                          reverseQuestionAndAnswerModes={reverseQuestionAndAnswerModes}
                          reversedQuestionAndAnswerModes={reversedQuestionAndAnswerModes} />
            {targetLetter && optionLetters
                ?
                    <>
                        <div>
                            <div>{questionMode.selector(targetLetter)}</div>
                            <div className="Quiz__OptionButtons"> 
                                {optionLetters.map(letter =>
                                    <OptionButton optionLetter={letter}
                                                  targetLetter={targetLetter}
                                                  selectedLetter={selectedLetter}
                                                  setSelectedLetter={setSelectedLetter}
                                                  answerMode={answerMode}
                                                  checkingState={checkingState}
                                                  key={letter.name} />
                                )}
                            </div>
                        </div>
                        {
                            checkingState
                                ? <button className="Quiz__ButtonContinue" onClick={refreshLetter}>Continue</button>
                                : <button className="Quiz__ButtonSubmit" onClick={() => setCheckingState(true)} disabled={!selectedLetter}>Submit</button>
                        }
                    </>
                :
                    <button className="Quiz__StartButton" onClick={refreshLetter}>Start</button>
            }
        </div>
    )
}

export default AlphabetQuiz
