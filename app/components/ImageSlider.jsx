"use client"
import React from 'react'
import { useEffect } from 'react'
import styles from '@/public/css/ImageSlider.module.css'
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

function ImageSlider({id}) {
  let slider;
  let allSlides = [];
  let previousSlideIndex = 0;
  let currentSlideIndex = 0;
  let nextSlideIndex = 1;
  let waitingSlideIndex = 2;

  let previousSlide;
  let currentSlide;
  let nextSlide;
  let waitingSlide;
  let totalSlides;

  useEffect(() => {
    slider = document.getElementById(styles.slider);
    allSlides = document.getElementsByClassName(styles.slide);

    totalSlides = allSlides.length;
    previousSlideIndex = totalSlides - 1;

    previousSlide = allSlides[previousSlideIndex];
    currentSlide = allSlides[currentSlideIndex];
    nextSlide = allSlides[nextSlideIndex];
    waitingSlide = allSlides[waitingSlideIndex];

    previousSlide.classList.add(styles.previousSlide);
    currentSlide.classList.add(styles.currentSlide);
    nextSlide.classList.add(styles.nextSlide);
    waitingSlide.classList.add(styles.waitingSlide);

    const intervalId = setInterval(() => {
      Slide();
    }, 5000); // 5000 milliseconds = 5 seconds
    
    return () => clearInterval(intervalId);
  }, []);
  
  async function Slide()
  {
    previousSlide.classList.add(styles.moveSlides);
    currentSlide.classList.add(styles.moveSlides);
    nextSlide.classList.add(styles.moveSlides);
    const currentImage = currentSlide.getElementsByTagName("img")[0];
    currentImage.classList.remove(styles.zoomIn);
    waitingSlide.classList.add(styles.moveSlides);

    setTimeout(() => {
      previousSlide.classList.remove(styles.moveSlides);
      currentSlide.classList.remove(styles.moveSlides);
      nextSlide.classList.remove(styles.moveSlides);
      waitingSlide.classList.remove(styles.moveSlides);

      previousSlide.classList.remove(styles.previousSlide);
      currentSlide.classList.remove(styles.currentSlide);
      nextSlide.classList.remove(styles.nextSlide);
      waitingSlide.classList.remove(styles.waitingSlide);

      AssignNewPlacements();
      previousSlide.classList.add(styles.previousSlide);
      currentSlide.classList.add(styles.currentSlide);
      nextSlide.classList.add(styles.nextSlide);
      waitingSlide.classList.add(styles.waitingSlide);
      const currentImage = currentSlide.getElementsByTagName("img")[0];
      currentImage.classList.add(styles.zoomIn);
    }, 450);
  }

  function AssignNewPlacements()
  {
    previousSlideIndex = currentSlideIndex;
    currentSlideIndex = nextSlideIndex;
    nextSlideIndex++;
    if(nextSlideIndex >= allSlides.length)
      nextSlideIndex = 0;
    
    waitingSlideIndex = nextSlideIndex + 1;
    if(waitingSlideIndex >= allSlides.length)
        waitingSlideIndex = 0

    currentSlide = allSlides[currentSlideIndex];
    previousSlide = allSlides[previousSlideIndex];
    nextSlide = allSlides[nextSlideIndex];
    waitingSlide = allSlides[waitingSlideIndex];
  }

  return (
    <div id={id} className={styles.slideWrapper}>
      <div id={styles.slider} className={styles.slider}>
            <a className={`${styles.slide}`} href="" target="_blank" rel="noopener noreferrer">
              <div className={styles.picture}>
                <picture>
                    <source media="(min-width:481px)" srcSet='/img/wallpapers/cod_hero.jpg'/>
                    <source media="(max-width:480px)" srcSet='/img/wallpapers/cod_hero_small.webp'/>
                    <img className={`${styles.img} ${styles.zoomIn}`} src="/img/wallpapers/cod_hero.webp" alt="" />
                </picture>  
              </div>
            </a>
            <a className={`${styles.slide}`} href="" target='_blank' rel="noopener noreferrer">
              <div className={styles.picture}>
                <picture>
                    <source media="(min-width:481px)" srcSet='/img/wallpapers/clashofclans_hero.jpg'/>
                    <source media="(max-width:480px)" srcSet='/img/wallpapers/clashofclans_hero_small.webp'/>
                    <img className={styles.img} src="/img/wallpapers/clashofclans_hero.webp" alt="" />
                </picture>
              </div>
            </a>
            <a className={`${styles.slide}`} href="" target='_blank' rel="noopener noreferrer">
              <div className={styles.picture}>
                <picture>
                    <source media="(min-width:481px)" srcSet='/img/wallpapers/freefire_hero.jpg'/>
                    <source media="(max-width:480px)" srcSet='/img/wallpapers/freefire_hero_small.webp'/>
                    <img className={styles.img} src="/img/wallpapers/freefire_hero.webp" alt="" />
                </picture>
              </div>
            </a>
            <a className={`${styles.slide}`} href="" target='_blank' rel="noopener noreferrer">
              <div className={styles.picture}>
                <picture>
                    <source media="(min-width:481px)" srcSet='/img/wallpapers/clashofclans_hero.jpg'/>
                    <source media="(max-width:480px)" srcSet='/img/wallpapers/clashofclans_hero_small.webp'/>
                    <img className={styles.img} src="/img/wallpapers/clashofclans_hero.webp" alt="" />
                </picture>
              </div>
            </a>
            <a className={`${styles.slide}`} href="" target='_blank' rel="noopener noreferrer">
              <div className={styles.picture}>
                <picture>
                    <source media="(min-width:481px)" srcSet='/img/wallpapers/freefire_hero.jpg'/>
                    <source media="(max-width:480px)" srcSet='/img/wallpapers/freefire_hero_small.webp'/>
                    <img className={styles.img} src="/img/wallpapers/freefire_hero.webp" alt="" />
                </picture>
              </div>
            </a>
      </div>
      {/* <div id={styles.sldierControl} className={styles.sliderControl}>
        <div>

        </div>
      </div> */}
    </div>
  )
}

export default ImageSlider