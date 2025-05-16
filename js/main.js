// scroll animation
$(function () {
  $(".animate").scrolla({
    mobile: true,
    once: false,
  });
});

$(function () {
  Splitting();
});

$(function () {
  let prevScrollTop = 0;

  document.addEventListener("scroll", function () {
    let nowScrollTop = $(window).scrollTop();

    if (nowScrollTop > prevScrollTop) {
      $("header").addClass("active");
    } else {
      $("header").removeClass("active");
    }
    prevScrollTop = nowScrollTop;
  });
});

// yejiseo
window.onload = function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".visual",
        start: "100% 100%",
        end: "100% 0%",
        scrub: 1,
        // markers: true,
      },
    })
    .to(
      ".logoWrap #y",
      { x: "20", y: "1300", rotate: "40", ease: "none", duration: 7 },
      0
    )
    .to(
      ".logoWrap #e",
      { x: "20", y: "1370", rotate: "-50", ease: "none", duration: 7 },
      0.2
    )
    .to(
      ".logoWrap #j",
      { x: "45", y: "1320", rotate: "50", ease: "none", duration: 7 },
      0.4
    )
    .to(
      ".logoWrap #i",
      { x: "55", y: "1310", rotate: "80", ease: "none", duration: 7 },
      0.1
    )
    .to(
      ".logoWrap #s",
      { x: "20", y: "1400", rotate: "40", ease: "none", duration: 7 },
      0
    )
    .to(
      ".logoWrap #e",
      { x: "20", y: "1380", rotate: "-50", ease: "none", duration: 7 },
      0.2
    )
    .to(
      ".logoWrap #o",
      { x: "45", y: "1320", rotate: "50", ease: "none", duration: 7 },
      0.4
    );
};

// about: resume
$(document).ready(function () {
  const $container = $(".resume a"); // 이벤트를 <a>에 걸기
  const $button = $container.find("button");
  const $span = $button.find("span");
  const $arrowWrap = $button.find(".arrow-wrap");
  const $arrowBg = $button.find(".arrow-bg");
  const $arrowImg = $button.find(".arrow-img");
  const $body = $("body");
  const $box = $(".box");

  const originalBg = $body.css("background-color"); // 원래 색 저장
  const originalBoxBg = $box.css("background");

  $container.on("mousemove", function (e) {
    const rect = $button[0].getBoundingClientRect(); // button 기준으로 거리 계산
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 80) {
      const moveX = dx * 0.9;
      const moveY = dy * 0.9;
      $span.css("transform", `translate(${moveX}px, ${moveY}px)`);
      $arrowWrap.css("transform", `translate(${moveX}px, ${moveY}px)`);
      $body.css("background-color", "var(--primary-color)");

      // 배경색 변경
      $body.css("background-color", "var(--primary-color)");
      // box색 변경
      $box.css("background", "rgba(255, 255, 255, 1)");

      // arrow 배경 슬라이드 등장 + 이미지 교체
      $arrowBg.css("left", "0%");
      $arrowImg.attr("src", "./images/arrow-r-w.svg");
    } else {
      $span.css("transform", "translate(0, 0)");
      $arrowWrap.css("transform", "translate(0, 0)");
      $body.css("background-color", originalBg); // 원래 색으로 복원
      $box.css("background", originalBoxBg);

      $arrowBg.css("left", "100%");
      $arrowImg.attr("src", "./images/arrow-r.svg");
    }
  });

  $container.on("mouseleave", function () {
    $span.css("transform", "translate(0, 0)");
    $arrowWrap.css("transform", "translate(0, 0)");
    $body.css("background-color", originalBg);
    $box.css("background", originalBoxBg);

    $arrowBg.css("left", "100%");
    $arrowImg.attr("src", "./images/arrow-r.svg");
  });
});

// about: floating-box
const box = document.querySelector(".floating-box");
let scrollY = window.scrollY;
let prevScrollY = scrollY;
let offsetY = 0; // 현재 박스 위치
let targetOffsetY = 0; // 목표 위치
const ease = 0.1; // 부드럽게 따라가는 정도
const maxOffset = 30; // 최대 이동 거리 (±30px)

function animate() {
  // 스크롤 변화량 계산
  scrollY = window.scrollY;
  const delta = scrollY - prevScrollY;

  // 스크롤 변화가 있을 때만 목표 위치를 약간 움직임
  targetOffsetY = delta * 1.2; // 반응 강도 조절
  targetOffsetY = Math.max(-maxOffset, Math.min(maxOffset, targetOffsetY));

  // 현재 위치가 목표 위치를 부드럽게 따라가게 하기
  offsetY += (targetOffsetY - offsetY) * ease;

  // 적용
  box.style.transform = `translateY(${offsetY}px)`;

  // 현재 스크롤 저장
  prevScrollY = scrollY;

  requestAnimationFrame(animate);
}

animate();

// text coloring animation
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
  ".intro .about-me span",
  {
    "background-size": "0% 100%",
  },
  {
    "background-size": "100% 100%",
    scrollTrigger: {
      trigger: ".intro",
      pinnedContainer: ".intro",
      start: "30% 60%",
      end: "80% 100%",
      // markers: true,
      scrub: 3,
    },
  }
);

// workList
// gsap.registerPlugin(ScrollTrigger);

// let activeImg;

// gsap.utils.toArray(".workList ul li").forEach((elem) => {
//   let image = elem.querySelector("img.fadeImg"),
//     align = (e) => {
//       setX(e.clientX);
//       setY(e.clientY);
//     },
//     startPoint = () => document.addEventListener("mousemove", align),
//     stopPoint = () => document.removeEventListener("mousemove", align),
//     fade = gsap.to(image, { autoAlpha: 1, ease: "none", paused: true });

//   elem.addEventListener("mouseenter", (e) => {
//     fade.play();
//     startPoint();

//     if (activeImg) {
//       gsap.set(image, {
//         x: gsap.getProperty(activeImg, "x"),
//         y: gsap.getProperty(activeImg, "y"),
//       });
//     }
//     activeImg = image;
//     setX = gsap.quickTo(image, "x", { duration: 0.5, ease: Elastic });
//     setY = gsap.quickTo(image, "y", { duration: 0.5, ease: Elastic });

//     align(e);
//   });

//   elem.addEventListener("mouseleave", () => fade.reverse());
// });
