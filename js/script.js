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

    // 🌸 Hiệu ứng hoa rơi lượn sóng
    function createFloatingEffect() {
        const profileGrid = document.querySelector(".grid");
        if (!profileGrid) return;

        const floatingEffect = document.createElement("div");
        floatingEffect.classList.add("floating-effect");
        floatingEffect.innerHTML = "🌸";

        let gridRect = profileGrid.getBoundingClientRect();
        let startX = Math.random() * gridRect.width + gridRect.left; // Random vị trí trên grid
        let duration = Math.random() * 10 + 5; // Thời gian rơi chậm hơn (5-15s)
        let amplitude = Math.random() * 80 + 30; // Độ rộng lượn sóng (mềm hơn)
        let speed = Math.random() * 1 + 0.5; // Tốc độ dao động (chậm hơn)

        floatingEffect.style.position = "fixed";
        floatingEffect.style.left = `${startX}px`;
        floatingEffect.style.top = `${gridRect.top - 50}px`; // Bắt đầu ngay trên grid
        floatingEffect.style.fontSize = "24px";
        floatingEffect.style.opacity = Math.random() * 0.8 + 0.4;
        floatingEffect.style.zIndex = "10";
        floatingEffect.style.pointerEvents = "none";

        document.body.appendChild(floatingEffect);

        let startTime = Date.now();

        function animateEffect() {
            let elapsed = (Date.now() - startTime) / 1000; // Thời gian trôi qua
            let newX = startX + Math.sin(elapsed * speed) * amplitude; // Lượn sóng ngang
            let newY = elapsed * (gridRect.height / duration); // Rơi xuống từ từ

            floatingEffect.style.transform = `translate(${newX - startX}px, ${newY}px)`;
            floatingEffect.style.opacity = 1 - elapsed / duration; // Mờ dần

            if (elapsed < duration) {
                requestAnimationFrame(animateEffect);
            } else {
                floatingEffect.remove();
            }
        }

        requestAnimationFrame(animateEffect);
    }

    function startFloatingEffects() {
        createFloatingEffect();
        setTimeout(startFloatingEffects, Math.random() * 2000 + 1000); // Xuất hiện ngẫu nhiên (1-3s)
    }

    startFloatingEffects();

    // Khi rời tab rồi quay lại, hiệu ứng sẽ tiếp tục
    document.addEventListener("visibilitychange", function () {
        if (!document.hidden) startFloatingEffects();
    });
});
