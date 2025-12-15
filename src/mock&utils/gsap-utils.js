import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(SplitText,TextPlugin);

const box1 = document.querySelector('.box1')
const box2 = document.querySelector('.box2')

let gsapDate = (dateFromMock, dateToMock) => {
  gsap.timeline({defaults:{
    duration: 0.3,
    ease:'sine.inOut',
    yoyo:true,
    repeat:0,
  }})
  .to(box1, {
    textContent: dateFromMock,
    snap:'textContent',
  }, 0)

  .to(box2, {
    textContent: dateToMock,
    snap:'textContent', 

  }, 0)
}

export { gsapDate, box1, box2 }