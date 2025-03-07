document.addEventListener("DOMContentLoaded", function () {
    let grid = document.getElementById("memberGrid");
    
    for (let i = 1; i <= 28; i++) {
        let card = document.createElement("a");
        card.href = `pages/person${i}.html`;
        card.classList.add("card");
        
        card.innerHTML = `
            <img src="images/person${i}.webp" alt="Person ${i}">
            <div class="info">
                <p>Nhân vật ${i}</p>
            </div>
        `;
        
        grid.appendChild(card);
    }
});

function searchCards() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let name = card.querySelector("h2").innerText.toLowerCase();
        if (name.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
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
});

document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector(".profile-container")) return; // Chỉ chạy trong trang cá nhân

    const maxFlowers = 15; 
    let flowers = [];
    let flowerInterval;

    function createFlower() {
        if (flowers.length >= maxFlowers) return; 

        const flower = document.createElement("div");
        flower.classList.add("floating-flower");
        flower.innerHTML = "🌸";

        flower.style.left = Math.random() * window.innerWidth + "px";
        flower.style.animationDuration = (Math.random() * 5 + 3) + "s"; 
        flower.style.opacity = Math.random() * 0.8 + 0.2;

        document.body.appendChild(flower);
        flowers.push(flower);

        setTimeout(() => {
            flower.remove();
            flowers = flowers.filter(f => f !== flower);
        }, 8000); 
    }

    function startFlowerEffect() {
        if (!flowerInterval) {
            flowerInterval = setInterval(createFlower, 1200);
        }
    }

    function stopFlowerEffect() {
        clearInterval(flowerInterval);
        flowerInterval = null;
    }

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopFlowerEffect();
        } else {
            startFlowerEffect();
        }
    });

    startFlowerEffect();
});


document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.querySelector(".loading-screen");
    const loadingBar = document.querySelector(".loading-bar");
    const loadingText = document.querySelector(".loading-text");

    if (!loadingScreen || !loadingBar || !loadingText) {
        console.error("Lỗi: Không tìm thấy phần tử loading.");
        return;
    }

    // Kiểm tra nếu đến từ trang cá nhân thì bỏ qua loading
    const previousPage = document.referrer;
    if (previousPage.includes("person")) {
        loadingScreen.style.display = "none";
        return;
    }

    let progress = 0;

    function updateLoading() {
        progress += Math.random() * 5 + 3; // Tăng từ 3% - 8% mỗi lần
        if (progress > 100) progress = 100;

        loadingBar.style.width = progress + "%";
        loadingText.innerText = `Loading... ${Math.floor(progress)}%`;

        if (progress < 100) {
            setTimeout(updateLoading, 300);
        } else {
            setTimeout(() => {
                loadingScreen.style.opacity = "0"; // Làm mờ loading
                setTimeout(() => {
                    loadingScreen.style.display = "none"; // Ẩn hoàn toàn
                }, 500);
            }, 500);
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded! 🚀");

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

            effect.style.left = Math.random() * window.innerWidth + "px";
            effect.style.animationDuration = (Math.random() * 5 + 3) + "s";
            effect.style.opacity = Math.random() * 0.8 + 0.2;

            document.body.appendChild(effect);
            effectsList.push(effect);

            setTimeout(() => {
                effect.remove();
                effectsList = effectsList.filter(e => e !== effect);
            }, 8000);
        }

        let effectActive = true;

        function startEffects() {
            if (!effectActive) return;
            createEffect();
            setTimeout(startEffects, Math.random() * 1200 + 800); // 🌿 Random thời gian xuất hiện
        }

        // Dừng hiệu ứng khi rời tab để tránh lag
        document.addEventListener("visibilitychange", function () {
            effectActive = !document.hidden;
            if (effectActive) startEffects();
        });

        startEffects();
    }
});


    setTimeout(updateLoading, 500); // Bắt đầu loading sau 0.5s để tránh lag
});
