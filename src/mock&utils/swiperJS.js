import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const swiper = new Swiper(".swiper", {
   modules: [Navigation],
      slidesPerView: 3,
      centeredSlides: false,
      spaceBetween: 10,

      navigation: {
        nextEl: ".nextButton",
        prevEl: ".prevButton",
      },
    });   