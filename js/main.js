$(function () {
  Splitting();
});

$(function () {
  $(".animate").scrolla({
    mobile: true,
    once: false,
  });
});

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("DOMContentLoaded", () => {
  // 약간의 시간차를 두고 애니메이션 클래스 추가
  setTimeout(() => {
    document.querySelector(".visual")?.classList.add("animate-in");
  }, 100); // DOM 로드 직후 약간의 지연
});

// visual img 위로 올라가게
gsap.to(".img-slider", {
  y: "-1000%", // 화면 위쪽으로 자기 높이만큼 이동
  ease: "none",
  scrollTrigger: {
    trigger: ".visual", // 애니메이션 시작 기준 영역
    start: "top top", // 스크롤 영역 시작
    end: "+=800", // 이 스크롤 구간 동안 애니메이션 진행
    scrub: true, // 스크롤과 애니메이션 동기화
  },
});

// visual svg 이동 + 회전 + fadeOut
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".visual",
      start: "top top",
      end: "+=1600",
      scrub: true,
      pin: true,
    },
  })
  .to(
    ".moon",
    {
      x: -1000,
      rotation: 360,
      ease: "none",
      duration: 0.9, // 전체 타임라인 중 70% 구간
    },
    0
  )
  .to(
    ".moon",
    {
      opacity: 0,
      ease: "none",
      duration: 0.1, // 나머지 30% 구간에서 사라짐
    },
    0.8
  )

  .to(
    ".sparkle",
    {
      x: 1000,
      rotation: 360,
      ease: "none",
      duration: 0.9,
    },
    0
  )
  .to(
    ".sparkle",
    {
      opacity: 0,
      ease: "none",
      duration: 0.1,
    },
    0.8
  )

  .to(
    ".atom",
    {
      x: -1000,
      rotation: 360,
      ease: "none",
      duration: 0.9,
    },
    0
  )
  .to(
    ".atom",
    {
      opacity: 0,
      ease: "none",
      duration: 0.1,
    },
    0.8
  );

// 스크롤에 따라 이동하는 visual svg 애니메이션
const moon = document.querySelector(".moon");
const sparkle = document.querySelector(".sparkle");
const atom = document.querySelector(".atom");

let targetScroll = 0; // 실제 스크롤값
let currentScroll = 0; // 현재 애니메이션에서 사용되는 값

// 스크롤 이벤트로 targetScroll 업데이트
window.addEventListener("scroll", () => {
  targetScroll = window.scrollY;
});

// 매 프레임마다 currentScroll이 targetScroll로 부드럽게 움직임 (lerp)
gsap.ticker.add(() => {
  // lerp 함수 (linear interpolation)
  currentScroll += (targetScroll - currentScroll) * 0.1; // 0.1은 부드러움 정도 (낮을수록 더 느림)

  // 애니메이션에 반영
  gsap.set(moon, {
    x: -currentScroll / 5,
    rotation: currentScroll / 5,
  });
  gsap.set(sparkle, {
    x: currentScroll / 5,
    rotation: currentScroll / 5,
  });
  gsap.set(atom, {
    x: -currentScroll / 10,
    rotation: currentScroll / 5,
  });
});

// visual img 1초마다 변경
function setupImageSlider(sliderEl) {
  const imageIndexes = sliderEl.dataset.images.split(","); // ["4", "5", "6"]
  let currentIndex = 0;
  const inner = sliderEl.querySelector(".slider-inner");

  function changeImage() {
    currentIndex = (currentIndex + 1) % imageIndexes.length;
    const newImg = document.createElement("img");
    newImg.src = `./images/img${imageIndexes[currentIndex]}.jpg`;
    newImg.alt = "yeji-pics";

    // 기존 이미지 위로 밀고, 새 이미지 아래에 추가
    inner.appendChild(newImg);

    // 전환 후 처리
    setTimeout(() => {
      const imgs = inner.querySelectorAll("img");
      if (imgs.length > 1) {
        imgs[0].remove(); // 위로 밀린 기존 이미지 제거
      }
    }, 600); // transition과 맞춰야 함
  }

  // 매 1초마다 실행
  setInterval(changeImage, 1000);
}

// 모든 슬라이더 설정
document.querySelectorAll(".img-slider").forEach(setupImageSlider);

$(".accordion ul li .acc-title").on("click", function () {
  const li = $(this).closest("li");
  const desc = $(this).next(".acc-desc");

  if (desc.is(":visible")) {
    // 닫힐 때
    desc.removeClass("animate-in"); // 애니메이션 제거
    desc.removeClass("open");
    desc.slideUp(200, () => {
      ScrollTrigger.refresh();
    });
  } else {
    // 열릴 때
    desc.stop(true, true).slideDown(200, function () {
      // 슬라이드 완료 후 애니메이션 클래스 추가
      desc.addClass("animate-in");
      li.addClass("open");
      ScrollTrigger.refresh();
    });
  }
});

// header 천천히 위 -> 아래 등장
$(function () {
  gsap.set("header", { y: -100, opacity: 0 }); // 초기 상태: 위로 올라가 있고 안 보임

  gsap.to("header", {
    y: 0,
    opacity: 1,
    duration: 1,
    delay: 0.8,
    ease: "power3.out",
  });
});

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

$(function () {
  // 1. half-circle-wrap 이동
  gsap.to(".half-circle-wrap", {
    top: "-300px",
    ease: "none",
    scrollTrigger: {
      trigger: ".sc1",
      start: "top 80%",
      end: "top 70%",
      scrub: 1,
      // markers: true,
    },
  });

  // 2. 반원 → 직선 변화 (border-radius 줄이기)
  gsap.to(".half-circle", {
    borderTopLeftRadius: "0%",
    borderTopRightRadius: "0%",
    ease: "none",
    scrollTrigger: {
      trigger: ".sc1",
      start: "top 80%",
      end: "top 70%",
      scrub: 1,
      // markers: true, // 필요 시 켜기
    },
  });
});

gsap.fromTo(
  ".sc1 .my-info span",
  {
    "background-size": "0% 100%",
  },
  {
    "background-size": "100% 100%",
    scrollTrigger: {
      trigger: ".sc1 .my-info",
      pinnedContainer: ".sc1 .my-info",
      start: "40% 90%",
      end: "70% 100%",
      // markers: true,
      scrub: 3,
    },
  }
);

$(function () {
  $(".my-skill").slick({
    centerMode: true,
    centerPadding: "1rem",
    slidesToShow: 3,
    autoplay: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "1rem",
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  });
});

$(function () {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".sc2",
        start: "0% 100%",
        end: "0% 0%",
        scrub: 1,
        // markers: true,
      },
    })

    .to(
      ".sc2",
      {
        backgroundColor: "var(--main-color)",
        color: "var(--font-color-w)",
        ease: "none",
        duration: 5,
      },
      0
    )
    .to(
      ".pj-cat",
      {
        color: "var(--font-color-w)",
        borderBottom: "1px solid var(--font-color-w)",
        ease: "none",
        duration: 5,
      },
      0
    )
    .to(
      ".pj-cat strong",
      {
        color: "var(--font-color-w)",
        ease: "none",
        duration: 5,
      },
      0
    )
    .to(
      ".h3-wrap h3 span",
      {
        color: "var(--font-color-w)",
        ease: "none",
        duration: 5,
      },
      0
    )

    .fromTo(
      ".sc2 h3 .a",
      {
        x: "-100%",
      },
      {
        x: "0%",
        ease: "none",
        duration: 5,
      },
      0
    )
    .fromTo(
      ".sc2 h3 .b",
      {
        x: "100%",
      },
      {
        x: "0%",
        ease: "none",
        duration: 5,
      },
      0
    );
});

// workList GSAP
$(function () {
  gsap.utils.toArray(".img-box").forEach(function (imgBox) {
    gsap.timeline({
      scrollTrigger: {
        trigger: imgBox,
        start: "50% 80%",
        end: "100% 0%",
        toggleClass: { targets: imgBox, className: "active" },
        scrub: 1,
        // markers: true,
      },
    });
  });

  gsap.utils.toArray(".text-box").forEach(function (textBox) {
    gsap.timeline({
      scrollTrigger: {
        trigger: textBox,
        start: "50% 80%",
        end: "100% 0%",
        toggleClass: { targets: textBox, className: "active" },
        scrub: 1,
        // markers: true,
      },
    });
  });
});

// workExp GSAP
$(function () {
  gsap.utils.toArray(".workExp li").forEach(function (item) {
    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "50% 80%",
        end: "100% 0%",
        toggleClass: { targets: item, className: "active" },
        scrub: 1,
        // markers: true,
      },
    });
  });
});

// workExp li hover 시 이미지 등장
$(function () {
  // sc2 workExp: hover img
  let listBox = document.querySelectorAll(".sc2 ul.workExp li");
  let imgBox = document.querySelector(".sc2 .imgBox");
  let img = document.querySelector(".sc2 .imgBox img");

  for (let i = 0; i < listBox.length; i++) {
    listBox[i].addEventListener("mouseover", () => {
      const src = `./images/img${i + 1}.jpg`;
      img.src = src;
      console.log("hover img src:", src); // 로그 확인

      gsap.set(imgBox, { scale: 0, opacity: 0 });
      gsap.to(imgBox, { scale: 1, opacity: 1, duration: 0.3 });
    });

    listBox[i].addEventListener("mousemove", (e) => {
      let imgBoxX = e.clientX + 20;
      let imgBoxY = e.clientY - 20;
      imgBox.style.left = imgBoxX + "px";
      imgBox.style.top = imgBoxY + "px";
    });

    listBox[i].addEventListener("mouseout", () => {
      gsap.to(imgBox, { scale: 0, opacity: 0, duration: 0.3 });
    });
  }
});

// contact & footer 스크롤에 맞춰 위로 올라오게
$(function () {
  gsap.to(".contact-footer-wrap", {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".contact-footer-wrap",
      start: "top 80%",
      end: "top 70%",
      scrub: 1,
    },
  });
});
