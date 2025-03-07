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


    // 🌸 Danh sách hiệu ứng cho từng người
    const effects = [
        "🌸", "🍂", "🎶", "💖", "✨", "🔥", "❄️", "🌿", "🍁", "💎", "🎈", "🌟", "💥", "🦋", "🎀", "🌊",
        "☁️", "💫", "🎵", "🏵️", "🌺", "🍀", "🐚", "🕊️", "🔮", "🎇", "🌠", "💡", "🍭"
    ];

    // Kiểm tra nếu đang ở trang cá nhân
    const match = window.location.pathname.match(/person(\d+)\.html/);
    if (match) {
        const personIndex = parseInt(match[1]) - 1;
        const chosenEffect = effects[personIndex % effects.length];

        let effectsList = [];
        const maxEffects = 15; // 🌸 Giới hạn số hiệu ứng trên màn hình

        function createEffect() {
            if (effectsList.length >= maxEffects) return; // Nếu đạt giới hạn, không tạo thêm

            const effect = document.createElement("div");
            effect.classList.add("floating-effect");
            effect.innerHTML = chosenEffect;

            let startX = Math.random() * window.innerWidth;
            let duration = Math.random() * 5 + 3; // Random thời gian rơi
            let amplitude = Math.random() * 100 + 50; // Độ rộng lượn sóng
            let speed = Math.random() * 2 + 1; // Tốc độ lượn

            effect.style.position = "fixed";
            effect.style.left = `${startX}px`;
            effect.style.top = "-50px"; // Bắt đầu từ trên cao
            effect.style.fontSize = "24px";
            effect.style.opacity = Math.random() * 0.8 + 0.2;
            effect.style.zIndex = "10";
            effect.style.pointerEvents = "none"; // Không ảnh hưởng UI

            document.body.appendChild(effect);
            effectsList.push(effect);

            let startTime = Date.now();

            function animateEffect() {
                let elapsed = (Date.now() - startTime) / 1000; // Thời gian đã trôi qua
                let newX = startX + Math.sin(elapsed * speed) * amplitude; // Tạo hiệu ứng lượn
                let newY = elapsed * (window.innerHeight / duration); // Rơi xuống từ từ

                effect.style.transform = `translate(${newX - startX}px, ${newY}px)`;
                effect.style.opacity = 1 - elapsed / duration; // Mờ dần khi gần chạm đất

                if (elapsed < duration) {
                    requestAnimationFrame(animateEffect);
                } else {
                    effect.remove();
                    effectsList = effectsList.filter(e => e !== effect);
                }
            }

            requestAnimationFrame(animateEffect);
        }

        function startEffects() {
            createEffect();
            setTimeout(startEffects, Math.random() * 1200 + 800);
        }

        document.addEventListener("visibilitychange", function () {
            if (!document.hidden) startEffects();
        });

        startEffects();
    }
});

