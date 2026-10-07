const stage = document.getElementById("stage");
const photos = stage.querySelectorAll("img");
const label = document.getElementById("view-label");
const dotsBox = document.getElementById("dots");

let current = 0;

// 사진 개수만큼 점 만들기
const dots = Array.from(photos, () => {
  const dot = document.createElement("span");
  dot.className = "dot";
  dotsBox.appendChild(dot);
  return dot;
});

// index번 사진 보여주기 (끝에서 넘어가면 처음으로 돌아감)
function show(index) {
  current = (index + photos.length) % photos.length;

  photos.forEach((photo, i) => {
    photo.classList.toggle("is-active", i === current);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("is-active", i === current);
  });
  label.textContent = photos[current].dataset.label;
}

// 오른쪽 화살표: 앞 → 오른쪽 → 뒤 → 왼쪽, 왼쪽 화살표는 반대로
document.getElementById("next").addEventListener("click", () => show(current + 1));
document.getElementById("prev").addEventListener("click", () => show(current - 1));

// 키보드 ← → 로도 돌리기
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") show(current + 1);
  if (event.key === "ArrowLeft") show(current - 1);
});

// 휴대폰: 손가락을 오른쪽으로 밀면 오른쪽으로, 왼쪽으로 밀면 왼쪽으로 돌리기
let touchStartX = null;

stage.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
}, { passive: true });

stage.addEventListener("touchend", (event) => {
  if (touchStartX === null) return;
  const moved = event.changedTouches[0].clientX - touchStartX;
  touchStartX = null;

  if (moved > 40) show(current + 1);
  if (moved < -40) show(current - 1);
});

show(0);
