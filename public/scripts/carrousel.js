import Splide from "../splide-2.4.21/src/js/splide.js";

new Splide( '.splide' , {
    type: "loop",
    perPage: 4,
    perMove: 1,
    autoWidth: true,
    autoHeight: true,
    arrows: false,
    autoplay: true,
    interval: 5000,

} ).mount();