gsap.registerPlugin(ScrollTrigger);

$(function () {
  Splitting();

  gsap.from(".main h1 .char", {
    y: 100, // 아래에서 올라오게
    opacity: 0, // 안보이다가
    stagger: 0.04, // 한 글자씩 빠르게
    ease: "power4.out", // 부드러운 느낌
    duration: 0.8,
    delay: 0.2, // 약간의 딜레이 후 실행
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
