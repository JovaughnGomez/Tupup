"use client"
import React, { useEffect } from 'react'
import styles from '@/public/css/ProductSlider.module.css'
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

function ProductSlider({children, name="slider"}) {
    let slider;
    let leftArrow;
    let rightArrow;
    let currentSlideIndex = 0;
    let totalSlides = 1;
    let allSlides = [];
    let slideMargin = 0;
    let slideWidth = 0;
    let totalSlidesWidth = 0;
    let resizeTimeout;
    
    useEffect(() =>{
        slider = document.getElementById(`${name}_wrapper`);
        rightArrow = slider.getElementsByClassName(styles.rightArrow)[0];
        leftArrow = slider.getElementsByClassName(styles.leftArrow)[0];
        allSlides = slider.getElementsByClassName("slide");
        totalSlides = slider.getElementsByClassName("slide").length;
        window.addEventListener('resize', function() {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
        
            resizeTimeout = setTimeout(function() {
                Transition();
                // Your resize-related code here
            }, 200); // Adjust the timeout delay as needed
        });

        CalculateValues();
    }, [])

    function CalculateValues()
    {
        slideMargin = 13;
        slideWidth = allSlides[0].offsetWidth + slideMargin;
        totalSlidesWidth = allSlides.length * slideWidth;
    }
    
    function Correction()
    {

    }

    function PreviousSlide(e)
    {
        CalculateValues();
        currentSlideIndex--;
        if(currentSlideIndex < 0)
        {
            currentSlideIndex = 0
            return;
        }

        for (let index = 0; index < allSlides.length; index++) {
            const slide = allSlides[index];
            slide.style.transition = 'transform .5s ease-in-out';
            slide.style.transform =  `translateX(-${currentSlideIndex * 100}%)`
        }
        ToggleArrows();
    }

    function Transition()
    {
        for (let index = 0; index < allSlides.length; index++) {
            const slide = allSlides[index];
            let newWidth = currentSlideIndex * slideWidth;
            if(currentSlideIndex == totalSlides - 1)
            {
                let remainingDistance = slider.offsetWidth - slideWidth;
                newWidth -= (remainingDistance + slideMargin - 5);
            }
            
            slide.style.transition = 'transform .5s ease-in-out';
            slide.style.transform =  `translateX(-${newWidth}px)`
        }    
    }

    function NextSlide(e)
    {
        CalculateValues();
        currentSlideIndex++;
        if(currentSlideIndex >= totalSlides)
        {
            currentSlideIndex = totalSlides - 1;
            return;
        }

        for (let index = 0; index < allSlides.length; index++) {
            const slide = allSlides[index];
            let newWidth = currentSlideIndex * slideWidth;
            if(currentSlideIndex == totalSlides - 1)
            {
                let remainingDistance = slider.offsetWidth - slideWidth;
                newWidth -= (remainingDistance + slideMargin - 5);
            }
            
            slide.style.transition = 'transform .5s ease-in-out';
            slide.style.transform =  `translateX(-${newWidth}px)`
        }

        ToggleArrows();
    }

    function ToggleArrows()
    {
        if(currentSlideIndex >= totalSlides - 1)
        {
            if(rightArrow.classList.contains("hide"))
                rightArrow.classList.add("hide");
            else
                rightArrow.classList.remove("hide");
        }

        if(currentSlideIndex >= totalSlides - 1)
        {   
            if(!rightArrow.classList.contains("hide"))
                rightArrow.classList.add("hide");
        } else {
            if(rightArrow.classList.contains("hide"))
                rightArrow.classList.remove("hide");
        }
        
        if(currentSlideIndex > 0)
        {
            if(leftArrow.classList.contains("hide"))
                leftArrow.classList.remove("hide");
        } else {
            if(!leftArrow.classList.contains("hide"))
                leftArrow.classList.add("hide");
        }
    }
    

    return (
        <div id={`${name}_wrapper`} className={styles.wrapper}>
            <div className={styles.arrows}>
                <Icon className={`${styles.leftArrow} ${styles.arrow} hide`} path={mdiChevronLeft} size={1.1} onClick={PreviousSlide} />
                <Icon className={`${styles.rightArrow} ${styles.arrow}`} path={mdiChevronRight} size={1.1} onClick={NextSlide} />
            </div>
            <div id={name} className={styles.slider}>
                {children}
            </div>
        </div>
  )
}

export default ProductSlider