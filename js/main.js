// ----------------------------------------------------------------
// GSAP 플러그인 등록
// ----------------------------------------------------------------
gsap.registerPlugin(ScrollTrigger, Draggable);

// ----------------------------------------------------------------
// Splitting.js 초기화
// ----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  Splitting();
});

// ----------------------------------------------------------------
// visual 진입 애니메이션
// ----------------------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelector(".visual")?.classList.add("animate-in");
  }, 100);
});

// ----------------------------------------------------------------
// visual SVG 스크롤 애니메이션 — pin 제거, scrub만 유지
// ----------------------------------------------------------------
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".visual",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  })
  .to(".moon", { x: -400, rotation: 360, opacity: 0, ease: "none" }, 0)
  .to(".sparkle", { x: 400, rotation: 360, opacity: 0, ease: "none" }, 0)
  .to(".atom", { x: -200, rotation: 360, opacity: 0, ease: "none" }, 0);

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
gsap.set("header", { y: -100, opacity: 0 });
gsap.to("header", {
  y: 0,
  opacity: 1,
  duration: 1,
  delay: 0.8,
  ease: "power3.out",
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
      start: "40% 90%",
      end: "70% 100%",
      scrub: 3,
    },
  }
);

// ----------------------------------------------------------------
// sc1: 'Drag Me!' 등장
// ----------------------------------------------------------------
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

// ----------------------------------------------------------------
// skill 카드 — GSAP Draggable (slick 대체)
// .inner의 overflow:hidden 때문에 scrollWidth가 정확히 안 잡히므로
// 카드 수 × 카드 너비로 직접 계산
// ----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".my-skill");
  if (!track) return;

  const CARD_WIDTH = 300;
  const GAP = 20; // gap: 2rem = 32px
  const VISIBLE = 3; // 한 화면에 보이는 카드 수

  const setDraggable = () => {
    const cardCount = track.querySelectorAll(".skillSet").length;
    const totalW = cardCount * CARD_WIDTH + (cardCount - 1) * GAP;
    const wrapW =
      track.parentElement.offsetWidth ||
      VISIBLE * CARD_WIDTH + (VISIBLE - 1) * GAP;
    const minX = Math.min(-(totalW - wrapW), 0);
    const maxX = 0;

    const existing = Draggable.get(track);
    if (existing) existing.kill();

    Draggable.create(track, {
      type: "x",
      bounds: { minX, maxX },
      inertia: true,
      edgeResistance: 0.85,
      cursor: "grab",
      activeCursor: "grabbing",
    });
  };

  setDraggable();
  window.addEventListener("resize", setDraggable);
});

// ----------------------------------------------------------------
// sc1: 아코디언 — max-height 방식
// ----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const accTitles = document.querySelectorAll(".accordion .acc-title");

  accTitles.forEach((title) => {
    title.addEventListener("click", () => {
      const desc = title.nextElementSibling;
      const img = title.querySelector("img");
      const isOpen = desc.classList.contains("animate-in");

      // 열린 항목 전부 닫기
      document.querySelectorAll(".accordion .acc-desc").forEach((d) => {
        d.classList.remove("animate-in");
      });
      document.querySelectorAll(".accordion .acc-title img").forEach((i) => {
        i.src = "./images/asset/add.svg";
      });

      // 클릭한 항목 토글
      if (!isOpen) {
        desc.classList.add("animate-in");
        img.src = "./images/asset/minus.svg";
      }

      // max-height 트랜지션 완료 후 ScrollTrigger 재계산
      setTimeout(() => ScrollTrigger.refresh(), 450);
    });
  });
});

// ----------------------------------------------------------------
// sc2: 배경색 + 텍스트 색상 전환 + h3 슬라이드인
// ----------------------------------------------------------------
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

// ----------------------------------------------------------------
// sc2: workList img-box / text-box — 한번 등장하면 고정
// ----------------------------------------------------------------
document.querySelectorAll(".img-box").forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: "top 85%",
    once: true,
    onEnter: () => el.classList.add("active"),
  });
});

document.querySelectorAll(".text-box").forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: "top 85%",
    once: true,
    onEnter: () => el.classList.add("active"),
  });
});

// ----------------------------------------------------------------
// sc2: workExp li — 한번 등장하면 고정
// ----------------------------------------------------------------
document.querySelectorAll(".workExp li").forEach((item) => {
  ScrollTrigger.create({
    trigger: item,
    start: "top 85%",
    once: true,
    onEnter: () => item.classList.add("active"),
  });
});

// ----------------------------------------------------------------
// sc2: workExp li hover 시 이미지 따라다니기
// ----------------------------------------------------------------
const listItems = document.querySelectorAll(".sc2 ul.workExp li");
const imgBox = document.querySelector(".sc2 .imgBox");
const hoverImg = document.querySelector(".sc2 .imgBox img");

if (imgBox && hoverImg) {
  listItems.forEach((item, i) => {
    item.addEventListener("mouseover", () => {
      hoverImg.src = `./images/main/d${i + 1}.jpg`;
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
}

// ----------------------------------------------------------------
// footer h5 — 한번 등장하면 고정
// ----------------------------------------------------------------
document.querySelectorAll("footer h5").forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: "top 85%",
    once: true,
    onEnter: () => el.classList.add("active"),
  });
});
