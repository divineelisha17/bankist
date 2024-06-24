'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector("#section--1");
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');


const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


////Button Scroll
btnScrollto.addEventListener('click',function(e) {
  section1.scrollIntoView({
    behavior: 'smooth'
  })

})

/// Page Navigation
document.querySelector('.nav__link').addEventListener('click',function(e) {
  e.preventDefault();
  if(e.target.classList.contains('.nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})

/// tabbed component
tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');

  //Guard close
  if (!clicked) return;

  //Remove Active class
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  ///remove active content
  tabContent.forEach( c => c.classList.remove
    ('operations__content--active'));

  ///activate tab
  clicked.classList.add('operations__tab--active');

  //activate content
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).
  classList.add('operations__content--active');

})

////////////////////sticky navigation: intersection observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries){
  const [entry] = entries;
  console.log(entry);

  if(!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove('sticky');
}

const headObserver = new IntersectionObserver(stickyNav,{
  root: null,
  threshold:0,
  rootMargin: `-${navHeight}px`
})

headObserver.observe(header);
const handleHover = function(e)
{
  if (e.target.classList.contains('nav__link'))
    {
      const link = e.target;
      const siblings = link.closest('.nav').querySelector('.nav__link');
      const logo = link.closest('.nav').querySelector('img');
      siblings.forEach(el => {
        if( el !== link) el.style.opacity = this;
      })

      logo.style.opacity = this;
    }


}

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// Reveal Section
const allSections = document.querySelectorAll('.section');
const revealSection = function(entries, observe){
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  headObserver.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold: 0.15
})

allSections.forEach(function(section){
  sectionObserver.observer(section);
  section.classList.add('section--header');   

})

////lazy image loading
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function(enteries, observer)
{
  const [entry] = enteries;
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');;

  })
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootmargin: '200px'

});

imgTargets.forEach(img => imgObserver.observer(img));

////function slider--------////////
const slider = function()
{
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dot');
 
  /////functions
  const createDots = function(){
    slides.forEach(function(_, i){
dotContainer.insertAdjacentHTML(
'beforeend', `<button class="dots_dot" data-slide="${i}"></button>`
      )

    })
  }
  const activeDot = function(slide){
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slides   ]`)
  }
}