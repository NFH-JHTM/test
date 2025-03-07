document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded! 🚀");

    // 🌸 Tạo Profile Card tự động
    let grid = document.querySelector(".grid");
    if (grid) {
        for (let i = 1; i <= 28; i++) {
            let card = document.createElement("a");
            card.href = `pages/person${i}.html`;
            card.classList.add("card");

            card.innerHTML = `
                <img src="images/person${i}.webp" alt="Person ${i}">
                <div class="info">
                    <h2>Nhân vật ${i}</h2>
                </div>
            `;

            grid.appendChild(card);
        }
    }

    // 🔍 Tìm kiếm Profile
    document.getElementById("searchBar").addEventListener("keyup", function () {
        let input = this.value.toLowerCase();
        let cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            let name = card.querySelector(".info h2").innerText.toLowerCase();
            card.style.display = name.includes(input) ? "block" : "none";
        });
    });

    // 🃏 Hover Effect cho Card
    let cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-5px)";
            card.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0)";
            card.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
        });
    });

    // ⏳ Loading Screen (Chỉ Chạy Ở Trang Chủ)
    const loadingScreen = document.querySelector(".loading-screen");
    if (loadingScreen) {
        let progress = 0;
        const previousPage = document.referrer;

        if (previousPage.includes("person")) {
            loadingScreen.style.display = "none";
        } else {
            function updateLoading() {
                progress += Math.random() * 5 + 3;
                if (progress > 100) progress = 100;

                document.querySelector(".loading-bar").style.width = progress + "%";
                document.querySelector(".loading-text").innerText = `Loading... ${Math.floor(progress)}%`;

                if (progress < 100) {
                    setTimeout(updateLoading, 300);
                } else {
                    setTimeout(() => {
                        loadingScreen.style.opacity = "0";
                        setTimeout(() => {
                            loadingScreen.style.display = "none";
                        }, 500);
                    }, 500);
                }
            }
            setTimeout(updateLoading, 500);
        }
    }



    // 🧐 Kiểm tra nếu đang ở trang cá nhân
    const isProfilePage = window.location.pathname.match(/person\d+\.html/);
    if (!isProfilePage) return; // Nếu không phải trang cá nhân thì dừng lại luôn

    function createFloatingFlower() {
    const grid = document.querySelector(".grid");
    if (!grid) return; // Chỉ chạy nếu có .grid (tức là trang cá nhân)

    const flower = document.createElement("div");
    flower.classList.add("floating-flower");
    flower.innerHTML = "🌸";

    // 🌸 Lấy vị trí của grid để hoa spawn đúng chỗ
    let gridRect = grid.getBoundingClientRect();
    let startX = Math.random() * gridRect.width + gridRect.left; // Random trong phạm vi grid
    let waveX = Math.random() * 200 - 100; // Biên độ lượn sóng (-100px đến 100px)
    let duration = Math.random() * 5 + 7; // Thời gian rơi (7-12 giây)

    flower.style.left = `${startX}px`;
    flower.style.top = `${gridRect.top - 50}px`; // Spawn ngay trên grid
    flower.style.animation = `waveFall ${duration}s linear forwards`;
    flower.style.setProperty("--wave-x", `${waveX}px`); // Truyền biến vào CSS

    document.body.appendChild(flower);

    setTimeout(() => flower.remove(), duration * 1000); // Xóa sau khi rơi xong
}

function startFlowerEffect() {
    createFloatingFlower();
    setTimeout(startFlowerEffect, Math.random() * 1500 + 500); // Random 0.5-2s tạo hoa mới
}

if (window.location.pathname.includes("person")) {
    startFlowerEffect();
}
