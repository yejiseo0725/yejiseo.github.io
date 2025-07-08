gsap.registerPlugin(ScrollTrigger);

// slick-slider
$(function () {
  $(".slide-area").slick({
    arrows: true,
    // dots: true,
    appendArrows: $(".slick-arrows"),
    prevArrow: $(".prevArrow"),
    nextArrow: $(".nextArrow"),
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  });
});
