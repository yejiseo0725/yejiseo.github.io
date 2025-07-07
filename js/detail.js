gsap.registerPlugin(ScrollTrigger);

// white-section 을 만나면 색이 변하는 header
document.querySelectorAll(".white-section").forEach((section) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top 10%",
    end: "bottom 10%",
    onEnter: () => document.body.classList.add("light-header"),
    onEnterBack: () => document.body.classList.add("light-header"),
    onLeave: () => document.body.classList.remove("light-header"),
    onLeaveBack: () => document.body.classList.remove("light-header"),
  });
});

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
