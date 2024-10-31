"use client"
import React, { useState } from 'react'
import styles from './faq.module.css'
import Icon from '@mdi/react'
import { mdiChevronUp } from '@mdi/js'
import { faqData } from '@/app/services/faqCache'

function page({faq}) {
    const [hidden, setHidden] = useState({})
    const [hovered, setHovered] = useState({})

    function ToggleVisibleAnswers(index)
    {
        setHidden((prev) => ({
            ...prev,
            [index]: !prev[index], // Toggle visibility for the specific giftcard ID
        }));

    }

    function OnEnter(index)
    {
        setHovered((prev) => ({
            ...prev,
            [index]: !prev[index], // Toggle visibility for the specific giftcard ID
        }));
    }

    function OnLeave(index)
    {
        setHovered((prev) => ({
            ...prev,
            [index]: null, // Toggle visibility for the specific giftcard ID
        }));
    }

    return (
    <div className={styles.outerWrp}>
      <div className={styles.inner}>
        {faq.map((section, sectionIndex) => 
          <ul key={sectionIndex} className={styles.faqContent}>
            <h1>{section.title}</h1>
            {section.questions.map((question, questionIndex) => 
              <li key={questionIndex} className={styles.faq}>
                <div onMouseLeave={(e) => OnLeave(`${sectionIndex}${questionIndex}`)} onMouseEnter={(e) => OnEnter(`${sectionIndex}${questionIndex}`)} onClick={(e) => ToggleVisibleAnswers(`${sectionIndex}${questionIndex}`)} className={`${styles.faqHeader}`}>
                  <span>{question.question}</span>
                  <Icon path={mdiChevronUp} size={1} className={`${hidden[`${sectionIndex}${questionIndex}`] ? styles.rotate : ""} ${hovered[`${sectionIndex}${questionIndex}`] ? "accent" : ""}`} />
                </div>
                <div className={`${hidden[`${sectionIndex}${questionIndex}`] ? "" : "hide"} ${styles.answer}`}>
                  <div dangerouslySetInnerHTML={{ __html: question.answer}}></div>
                </div>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default page