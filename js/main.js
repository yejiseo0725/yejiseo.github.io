$(function () {
  Splitting();
});

$(function () {
  $(".animate").scrolla({
    mobile: true,
    once: false,
  });
});

// ----------------------------------------------------------------
// GSAP 플러그인 등록
// ----------------------------------------------------------------
gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------------------
// visual 진입 애니메이션
// ----------------------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelector(".visual")?.classList.add("animate-in");
  }, 100);
});

// ----------------------------------------------------------------
// visual SVG + pin 애니메이션
// ScrollTrigger 하나로 통합 (ticker/scroll 이벤트 제거)
// ----------------------------------------------------------------
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
  .to(".moon", { x: -1000, rotation: 360, ease: "none", duration: 0.9 }, 0)
  .to(".moon", { opacity: 0, ease: "none", duration: 0.1 }, 0.8)
  .to(".sparkle", { x: 1000, rotation: 360, ease: "none", duration: 0.9 }, 0)
  .to(".sparkle", { opacity: 0, ease: "none", duration: 0.1 }, 0.8)
  .to(".atom", { x: -1000, rotation: 360, ease: "none", duration: 0.9 }, 0)
  .to(".atom", { opacity: 0, ease: "none", duration: 0.1 }, 0.8);

// ----------------------------------------------------------------
// visual img 1초마다 변경
// ----------------------------------------------------------------
function setupImageSlider(sliderEl) {
  const imageIndexes = sliderEl.dataset.images.split(",");
  let currentIndex = 0;
  const inner = sliderEl.querySelector(".slider-inner");

  function changeImage() {
    currentIndex = (currentIndex + 1) % imageIndexes.length;
    const newImg = document.createElement("img");
    newImg.src = `./images/img${imageIndexes[currentIndex]}.jpg`;
    newImg.alt = "yeji-pics";
    newImg.style.opacity = 0;
    newImg.style.transition = "opacity 0.6s ease";
    inner.appendChild(newImg);

    requestAnimationFrame(() => {
      newImg.style.opacity = 1;
    });

    setTimeout(() => {
      const imgs = inner.querySelectorAll("img");
      if (imgs.length > 1) imgs[0].remove();
    }, 1000);
  }

  setInterval(changeImage, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".img-slider").forEach(setupImageSlider);
});

// ----------------------------------------------------------------
// header 등장 애니메이션
// ----------------------------------------------------------------
$(function () {
  gsap.set("header", { y: -100, opacity: 0 });
  gsap.to("header", {
    y: 0,
    opacity: 1,
    duration: 1,
    delay: 0.8,
    ease: "power3.out",
  });
});

// ----------------------------------------------------------------
// white-section 진입 시 header 색상 변경
// ----------------------------------------------------------------
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

// ----------------------------------------------------------------
// sc1: half-circle 이동 + border-radius 변화
// ----------------------------------------------------------------
$(function () {
  gsap.to(".half-circle-wrap", {
    top: "-300px",
    ease: "none",
    scrollTrigger: {
      trigger: ".sc1",
      start: "top 80%",
      end: "top 70%",
      scrub: 1,
    },
  });

  gsap.to(".half-circle", {
    borderTopLeftRadius: "0%",
    borderTopRightRadius: "0%",
    ease: "none",
    scrollTrigger: {
      trigger: ".sc1",
      start: "top 80%",
      end: "top 70%",
      scrub: 1,
    },
  });
});

// ----------------------------------------------------------------
// sc1: my-info 텍스트 fill 애니메이션
// ----------------------------------------------------------------
gsap.fromTo(
  ".sc1 .my-info span",
  { "background-size": "0% 100%" },
  {
    "background-size": "100% 100%",
    scrollTrigger: {
      trigger: ".sc1 .my-info",
      pinnedContainer: ".sc1 .my-info",
      start: "40% 90%",
      end: "70% 100%",
      scrub: 3,
    },
  }
);

// ----------------------------------------------------------------
// sc1: 'Drag Me!' 등장
// ----------------------------------------------------------------
$(function () {
  gsap.to(".drag-label", {
    scrollTrigger: {
      trigger: ".my-skill",
      start: "top 80%",
      toggleActions: "play reverse play reverse",
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out",
  });
});

// ----------------------------------------------------------------
// sc1: slick slider (skill)
// ----------------------------------------------------------------
$(function () {
  $(".my-skill").slick({
    centerMode: true,
    centerPadding: "1rem",
    slidesToShow: 3,
    autoplay: false,
    responsive: [
      {
        breakpoint: 800,
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

// ----------------------------------------------------------------
// sc1: accordion
// 열고 닫힐 때 ScrollTrigger.refresh()로 DOM 높이 재계산
// ----------------------------------------------------------------
$(function () {
  $(".accordion .acc-title").on("click", function () {
    const $desc = $(this).next(".acc-desc");
    const $img = $(this).find("img");

    if ($desc.is(":visible")) {
      $desc
        .stop()
        .slideUp(300, () => ScrollTrigger.refresh())
        .removeClass("animate-in");
      $img.attr("src", "./images/asset/add.svg");
    } else {
      $(".accordion .acc-desc:visible")
        .stop()
        .slideUp(300)
        .removeClass("animate-in");
      $(".accordion .acc-title img").attr("src", "./images/asset/add.svg");
      $desc
        .stop()
        .slideDown(300, () => ScrollTrigger.refresh())
        .addClass("animate-in");
      $img.attr("src", "./images/asset/minus.svg");
    }
  });
});

// ----------------------------------------------------------------
// sc2: 배경색 + 텍스트 색상 전환 + h3 슬라이드인
// ----------------------------------------------------------------
$(function () {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".sc2",
        start: "0% 100%",
        end: "0% 0%",
        scrub: 1,
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
      { color: "var(--font-color-w)", ease: "none", duration: 5 },
      0
    )
    .to(
      ".h3-wrap h3 span",
      { color: "var(--font-color-w)", ease: "none", duration: 5 },
      0
    )
    .fromTo(
      ".sc2 h3 .a",
      { x: "-100%" },
      { x: "0%", ease: "none", duration: 5 },
      0
    )
    .fromTo(
      ".sc2 h3 .b",
      { x: "100%" },
      { x: "0%", ease: "none", duration: 5 },
      0
    );
});

// ----------------------------------------------------------------
// sc2: workList img-box / text-box — 한번 등장하면 고정
// (아코디언 높이 변화에 영향받지 않도록 scrub/toggleClass 제거)
// ----------------------------------------------------------------
$(function () {
  gsap.utils.toArray(".img-box").forEach(function (imgBox) {
    ScrollTrigger.create({
      trigger: imgBox,
      start: "top 85%",
      once: true,
      onEnter: () => imgBox.classList.add("active"),
    });
  });

  gsap.utils.toArray(".text-box").forEach(function (textBox) {
    ScrollTrigger.create({
      trigger: textBox,
      start: "top 85%",
      once: true,
      onEnter: () => textBox.classList.add("active"),
    });
  });
});

// ----------------------------------------------------------------
// sc2: workExp li — 한번 등장하면 고정
// ----------------------------------------------------------------
$(function () {
  gsap.utils.toArray(".workExp li").forEach(function (item) {
    ScrollTrigger.create({
      trigger: item,
      start: "top 85%",
      once: true,
      onEnter: () => item.classList.add("active"),
    });
  });
});

// ----------------------------------------------------------------
// sc2: workExp li hover 시 이미지 따라다니기
// (800px 이하에서는 imgBox가 display:none이라 자동으로 비활성)
// ----------------------------------------------------------------
$(function () {
  const listBox = document.querySelectorAll(".sc2 ul.workExp li");
  const imgBox = document.querySelector(".sc2 .imgBox");
  const img = document.querySelector(".sc2 .imgBox img");

  if (!imgBox || !img) return;

  listBox.forEach((item, i) => {
    item.addEventListener("mouseover", () => {
      img.src = `./images/main/d${i + 1}.jpg`;
      gsap.set(imgBox, { scale: 0, opacity: 0 });
      gsap.to(imgBox, { scale: 1, opacity: 1, duration: 0.3 });
    });

    item.addEventListener("mousemove", (e) => {
      imgBox.style.left = e.clientX + 20 + "px";
      imgBox.style.top = e.clientY - 20 + "px";
    });

    item.addEventListener("mouseout", () => {
      gsap.to(imgBox, { scale: 0, opacity: 0, duration: 0.3 });
    });
  });
});

// ----------------------------------------------------------------
// footer h5 — 한번 등장하면 고정
// ----------------------------------------------------------------
$(function () {
  gsap.utils.toArray("footer h5").forEach(function (el) {
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => el.classList.add("active"),
    });
  });
});
