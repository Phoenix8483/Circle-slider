import './style.css'
import { mockData } from "./mock&utils/mock.js";
import { swiper } from './mock&utils/swiperJS.js';
import { gsapDate, box1, box2 } from './mock&utils/gsap-utils.js'

const wrapperCircle = document.querySelector(".wrapperCircle");
let circle = document.querySelector('.circle')
let circleElement = document.querySelectorAll(".circleElement");
let circleElementPoint = document.querySelectorAll('.circleElementPoint')
let circleElementPointText = document.querySelectorAll('.circleElementPointText')
let circleElementName = document.querySelectorAll('.circleElementName')
const horizontalCheckLine = document.querySelector('.horizontalCheckLine');
const verticalCheckLine = document.querySelector('.verticalLine')
const sliderContainer = document.querySelector(".swiper-wrapper");
let sliderElement = document.querySelectorAll(".swiper-slide");
let sliderElementYear = document.querySelectorAll(".sliderElementDates");
let sliderElementDescription = document.querySelectorAll(".sliderElementDescription");
const prevButton = document.querySelector(".prevButtonCircle");
const nextButton = document.querySelector(".nextButtonCircle");
let numberCurrentPoint = document.querySelector('.numberCurrentPoint')
let numberAllPoints = document.querySelector('.numberAllPoints')
let mobileNamePoint = document.querySelector('.mobileNamePoint')

let degrees = 0;
let degCount = 360 / mockData.length
let circleElementDistance = 0;
let horizontalLineCoordinate = horizontalCheckLine.getBoundingClientRect().top
let verticalLineCoordinate = verticalCheckLine.getBoundingClientRect().left

// Рендер GSAP для моков[0]
gsapDate(mockData[0].dateFrom, mockData[0].dateTo);

/* Рендер круга */
circle = document.createElement("div");  
circle.classList.add("circle");
wrapperCircle.append(circle);

/* Динамический рендеринг поинтов */
for(let i = 0; i < mockData.length; i++) {     
  circleElement = document.createElement("div");
  circleElement.classList.add("circleElement");
  circle.append(circleElement);
  circleElement.style.offsetDistance = `${circleElementDistance}%`

  circleElementPoint = document.createElement("div");
  circleElementPoint.classList.add("circleElementPoint");
  circleElement.append(circleElementPoint);

  circleElementPointText = document.createElement("div");
  circleElementPointText.classList.add("circleElementPointText");
  circleElementPoint.append(circleElementPointText);

  circleElementName = document.createElement('div')
  circleElementName.classList.add('circleElementName')
  circleElement.append(circleElementName)
  circleElementDistance += (100 / mockData.length);
};

let arrayCircleElements = [...document.querySelectorAll(".circleElement")];
let arrayCircleElementsPoint = [...document.querySelectorAll(".circleElementPoint")];
let arrayCircleElementsName = [...document.querySelectorAll('.circleElementName')]
let arrayCircleElementsText = [...document.querySelectorAll('.circleElementPointText')]


let beginPointDegree = -30;
for (let j = 0; j < mockData.length; j++) {
  arrayCircleElements[j].style.transform = `rotate(${beginPointDegree}deg)`
  arrayCircleElementsPoint[j].style.transform = `rotate(-90deg)`
  beginPointDegree -= degCount

  arrayCircleElementsText[j].textContent = mockData[j].number;
  arrayCircleElementsName[j].textContent = mockData[j].name;
}  

for (let j = 0; j < mockData[0].subArray.length; j++) {
  sliderElement = document.createElement('div');
  sliderElement.classList.add('swiper-slide');
  sliderContainer.append(sliderElement);

  sliderElementYear = document.createElement('div');
  sliderElementYear.classList.add('sliderElementYear');
  sliderElementYear.textContent = mockData[0].subArray[j].date
  sliderElement.append(sliderElementYear);

  sliderElementDescription = document.createElement('div');
  sliderElementDescription.classList.add('sliderElementDescription');
  sliderElementDescription.textContent = mockData[0].subArray[j].description
  sliderElement.append(sliderElementDescription);
}

numberAllPoints.textContent = mockData.length;

let renderSliderComponent = () => {
  for(let i = 0; i < mockData.length; i++) {
    if (
      arrayCircleElements[i].getBoundingClientRect().top < horizontalLineCoordinate &&
      arrayCircleElements[i].getBoundingClientRect().left > verticalLineCoordinate
      ) {
        box1.innerHTML = "";
        box2.innerHTML = "";
        
        gsapDate(mockData[i].dateFrom, mockData[i].dateTo)
        
        for (let j = 0; j < mockData[i].subArray.length; j++) {
          sliderElement = document.createElement('div');
          sliderElement.classList.add('swiper-slide');
          sliderContainer.append(sliderElement);
                  
          sliderElementYear = document.createElement('div');
          sliderElementYear.classList.add('sliderElementYear');
          sliderElementYear.textContent = mockData[i].subArray[j].date
          sliderElement.append(sliderElementYear);

          sliderElementDescription = document.createElement('div');
          sliderElementDescription.classList.add('sliderElementDescription');
          sliderElementDescription.textContent = mockData[i].subArray[j].description
          sliderElement.append(sliderElementDescription);
        }     
      }
    }
}

beginPointDegree = -30;
let prevButtonClick = () => {
  sliderContainer.innerHTML = "";  
  degrees -= degCount;
  circle.style = `transform: rotate(${degrees}deg)`;
  setTimeout(renderSliderComponent, 500)
}

let nextButtonClick = () => {
  sliderContainer.innerHTML = ""; 
  degrees += degCount;
  circle.style = `transform: rotate(${degrees}deg)`;
  setTimeout(renderSliderComponent, 400)
}

setInterval(() => {
  for (let j = 0; j < mockData.length; j++) {
    if (arrayCircleElements[j].getBoundingClientRect().top < horizontalLineCoordinate &&
      arrayCircleElements[j].getBoundingClientRect().left < verticalLineCoordinate) {

      arrayCircleElements[j].onmouseover = () => {
        arrayCircleElements[j].style.transform = `rotate(30deg)`
      }
    }
  }
})


let renderForPointClick = () => {
arrayCircleElements.forEach(element => {
  element.addEventListener('click', () => {
    sliderContainer.innerHTML = ""; 
    degrees = 0;
      for(let j = arrayCircleElements.indexOf(element); j < mockData.length; j++) {
        degrees += degCount;
        circle.style = `transform: rotate(${degrees}deg)`;
        setTimeout(renderSliderComponent, 600)
      }
      beginPointDegree += 360 - degCount;
  })
})
}

setInterval(() => {
for (let i = 0; i < mockData.length; i++) {
  if (arrayCircleElements[i].getBoundingClientRect().top < horizontalLineCoordinate &&
      arrayCircleElements[i].getBoundingClientRect().left > verticalLineCoordinate
    ) {

    numberCurrentPoint.textContent = mockData[i].number
    arrayCircleElements[i].style.transform = `rotate(-30deg)`

    arrayCircleElementsPoint[i].classList.add('circleElementPoint-isActive')
    arrayCircleElementsText[i].classList.remove('hideElement')
    arrayCircleElementsText[i].classList.add('showElement')
    arrayCircleElementsName[i].classList.remove('hideElement')
    arrayCircleElementsName[i].classList.add('showElement')

  } else {
    arrayCircleElementsPoint[i].classList.remove('circleElementPoint-isActive')
    arrayCircleElementsText[i].classList.remove('showElement')
    arrayCircleElementsText[i].classList.add('hideElement')
    arrayCircleElementsName[i].classList.remove('showElement')
    arrayCircleElementsName[i].classList.add('hideElement')                         
  }
}
}, 100)

if (document.documentElement.offsetWidth < 1000) {
  let currentIndex = 0
  mobileNamePoint.textContent = mockData[0].name
  numberCurrentPoint.textContent = mockData[0].number
  arrayCircleElementsPoint[currentIndex].classList.add('pointMobileActive')
  
renderForPointClick = () => {
    arrayCircleElements.forEach(element => {
      element.addEventListener('click', () => {
        arrayCircleElementsPoint.forEach(point => {
          point.classList.remove('pointMobileActive')
        })
        
        let currentIndex = arrayCircleElements.indexOf(element);
        sliderContainer.innerHTML = ""; 
        
        for(let j = arrayCircleElements.indexOf(element); j < mockData.length; j++) {
          numberCurrentPoint.textContent =  currentIndex + 1
          arrayCircleElementsPoint[j].classList.add('pointMobileActive')
          box1.innerHTML = ""
          box2.innerHTML = ""
      
      gsapDate(mockData[currentIndex].dateFrom, mockData[currentIndex].dateTo)
      
      for (let i = 0; i < mockData.length; i++) {
        sliderElement = document.createElement('div');
        sliderElement.classList.add('swiper-slide');
        sliderContainer.append(sliderElement);
                  
        sliderElementYear = document.createElement('div');
        sliderElementYear.classList.add('sliderElementYear');
        sliderElementYear.textContent = mockData[j].subArray[i].date
        sliderElement.append(sliderElementYear);

        sliderElementDescription = document.createElement('div');
        sliderElementDescription.classList.add('sliderElementDescription');
        sliderElementDescription.textContent = mockData[j].subArray[i].description
        sliderElement.append(sliderElementDescription);

        mobileNamePoint.textContent = mockData[j].name
      }
    }
  })
})
}

let renderComponentForNextBtn = () => {

  if (currentIndex == arrayCircleElements.length - 1) {
    currentIndex = 0
    arrayCircleElementsPoint.forEach(point => {
      point.classList.remove('pointMobileActive')
    })
    arrayCircleElementsPoint[currentIndex].classList.add('pointMobileActive')
  } else {
    currentIndex++
    arrayCircleElementsPoint.forEach(point => {
      point.classList.remove('pointMobileActive')
    })
    arrayCircleElementsPoint[currentIndex].classList.add('pointMobileActive')
  }
  
  box1.innerHTML = "";
  box2.innerHTML = "";
  
  gsapDate(mockData[currentIndex].dateFrom, mockData[currentIndex].dateTo)

    for (let j = 0; j < mockData[currentIndex].subArray.length; j++) {
      sliderElement = document.createElement('div');
      sliderElement.classList.add('swiper-slide');
      sliderContainer.append(sliderElement);
                  
      sliderElementYear = document.createElement('div');
      sliderElementYear.classList.add('sliderElementYear');
      sliderElementYear.textContent = mockData[currentIndex].subArray[j].date
      sliderElement.append(sliderElementYear);

      sliderElementDescription = document.createElement('div');
      sliderElementDescription.classList.add('sliderElementDescription');
      sliderElementDescription.textContent = mockData[currentIndex].subArray[j].description
      sliderElement.append(sliderElementDescription);

      
      numberCurrentPoint.textContent = mockData[currentIndex].number
      mobileNamePoint.textContent = mockData[currentIndex].name
    }
}

let renderComponentForPrevBtn = () => {
  if (currentIndex == 0) {
    currentIndex = mockData.length - 1
    arrayCircleElementsPoint.forEach(point => {
      point.classList.remove('pointMobileActive')
    })
    arrayCircleElementsPoint[arrayCircleElements.length - 1].classList.add('pointMobileActive')
  } else {
    currentIndex--
    arrayCircleElementsPoint.forEach(point => {
      point.classList.remove('pointMobileActive')
    })
    arrayCircleElementsPoint[currentIndex].classList.add('pointMobileActive')
  }
  
  box1.innerHTML = "";
  box2.innerHTML = "";
  
  gsapDate(mockData[currentIndex].dateFrom, mockData[currentIndex].dateTo)

    for (let j = 0; j < mockData[currentIndex].subArray.length; j++) {
      sliderElement = document.createElement('div');
      sliderElement.classList.add('swiper-slide');
      sliderContainer.append(sliderElement);
                  
      sliderElementYear = document.createElement('div');
      sliderElementYear.classList.add('sliderElementYear');
      sliderElementYear.textContent = mockData[currentIndex].subArray[j].date
      sliderElement.append(sliderElementYear);

      sliderElementDescription = document.createElement('div');
      sliderElementDescription.classList.add('sliderElementDescription');
      sliderElementDescription.textContent = mockData[currentIndex].subArray[j].description
      sliderElement.append(sliderElementDescription);

      numberCurrentPoint.textContent = mockData[currentIndex].number
      mobileNamePoint.textContent = mockData[currentIndex].name
    }
}


nextButtonClick = () => {
    sliderContainer.innerHTML = ""; 
  setTimeout(renderComponentForNextBtn, 400)
}

prevButtonClick = () => {
    sliderContainer.innerHTML = ""; 
  setTimeout(renderComponentForPrevBtn, 400)
}

}











prevButton.addEventListener('click', prevButtonClick)
nextButton.addEventListener('click', nextButtonClick)
renderForPointClick()

