(function() {
    // === 1. CỐ ĐỊNH LOGO CHÍNH & TÊN CHÍNH ===
    const FIXED_MAIN_LOGO = "https://raw.githubusercontent.com/protech-code/.github/refs/heads/main/Protech%20logo.png";
    const FIXED_MAIN_NAME = "PROTECH GROUP";

    // === 2. Đọc dữ liệu từ thẻ <script đang nhúng> ===
    const currentScript = document.currentScript;
    const subLogosAttr = currentScript ? currentScript.getAttribute('data-sublogos') : null;
    const subNamesAttr = currentScript ? currentScript.getAttribute('data-subnames') : null; 
    const subNameSingleAttr = currentScript ? currentScript.getAttribute('data-subname') : null;
    const ewStyle = currentScript ? (currentScript.getAttribute('data-ew') || currentScript.getAttribute('data-tv') || 'samsung').toLowerCase() : 'samsung';

    const subLogosArray = subLogosAttr ? subLogosAttr.split(',').map(s => s.trim()).filter(Boolean) : [];
    const subNamesArray = subNamesAttr ? subNamesAttr.split(',').map(s => s.trim()).filter(Boolean) : [];

    // Tổng hợp danh sách tất cả các bước cần trình chiếu
    const sequenceList = [];
    sequenceList.push({
        logo: FIXED_MAIN_LOGO,
        title: FIXED_MAIN_NAME,
        subtitle: subNameSingleAttr ? subNameSingleAttr.trim() : ""
    });

    subLogosArray.forEach((logoUrl, index) => {
        sequenceList.push({
            logo: logoUrl,
            title: subNamesArray[index] || `SUB ${index + 1}`,
            subtitle: ""
        });
    });

    // === 3. Cấu hình CSS động (Hỗ trợ đầy đủ các kiểu cũ + kiểu 'slide' mới) ===
    const style = document.createElement('style');
    let ewSpecificCSS = '';

    switch (ewStyle) {
        case 'slide':
            ewSpecificCSS = `
                #ew-screen { background-color: #030712; }
            `;
            break;
        case 'explosion':
            ewSpecificCSS = `
                #ew-screen { background-color: #050202; }
                #ew-screen.ew-turning-on::before {
                    content: ''; position: absolute; width: 20px; height: 20px;
                    background: #ff3300; border-radius: 50%;
                    box-shadow: 0 0 120px 60px #ff3300, 0 0 300px 150px rgba(255, 68, 0, 0.6), 0 0 600px 300px rgba(255, 200, 0, 0.3);
                    z-index: 10; transform: scale(0.1); opacity: 1;
                    transition: transform 0.6s cubic-bezier(0.1, 1, 0.2, 1), opacity 0.5s ease 0.2s;
                }
                #ew-screen.ew-active-open::before { transform: scale(200); opacity: 0; }
                #ew-screen.ew-flash-effect { background: #fff5e6 !important; transition: background 0.08s ease-out; }
            `;
            break;
        case 'astronaut':
            ewSpecificCSS = `
                #ew-screen { background-color: #020205; background-image: radial-gradient(circle at center, #0f172a 0%, #020205 100%); }
                #ew-screen.ew-turning-on::before {
                    content: ''; position: absolute; width: 100vw; height: 100vw;
                    background: radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%);
                    z-index: 10; transform: scale(0.1); opacity: 1;
                    transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.6s ease;
                }
                #ew-screen.ew-active-open::before { transform: scale(3); opacity: 0; }
            `;
            break;
        case 'lg':
            ewSpecificCSS = `
                #ew-screen { background-color: #040814; }
                #ew-screen.ew-turning-on::before {
                    content: ''; position: absolute; width: 10px; height: 10px;
                    background: #0098ff; border-radius: 50%;
                    box-shadow: 0 0 100px 50px #0098ff, 0 0 300px 150px rgba(0, 152, 255, 0.4);
                    z-index: 10; transform: scale(1);
                    transition: transform 0.9s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.5s ease;
                }
                #ew-screen.ew-active-open::before { transform: scale(150); opacity: 0; }
            `;
            break;
        case 'sony':
            ewSpecificCSS = `
                #ew-screen { background-color: #000000; }
                #ew-screen.ew-flash-effect { background: #ffffff !important; transition: background 0.1s ease-in; }
                #ew-screen.ew-turning-on { animation: sony-fade-in 0.8s ease forwards; }
                @keyframes sony-fade-in { 0% { filter: brightness(5); } 100% { filter: brightness(1); } }
            `;
            break;
        case 'toshiba':
            ewSpecificCSS = `
                #ew-screen { background-color: #0a0a0a; }
                #ew-screen.ew-turning-on::before, #ew-screen.ew-turning-on::after {
                    content: ''; position: absolute; top: 0; width: 50%; height: 100%;
                    background: #000000; z-index: 10; transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
                }
                #ew-screen.ew-turning-on::before { left: 0; transform-origin: left; }
                #ew-screen.ew-turning-on::after { right: 0; transform-origin: right; }
                #ew-screen.ew-active-open::before { transform: scaleX(0); }
                #ew-screen.ew-active-open::after { transform: scaleX(0); }
            `;
            break;
        default:
            ewSpecificCSS = `
                #ew-screen { background-color: #05050a; }
                #ew-screen.ew-turning-on::before, #ew-screen.ew-turning-on::after {
                    content: ''; position: absolute; left: 0; width: 100%; height: 50%;
                    background: #000000; z-index: 10; transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
                }
                #ew-screen.ew-turning-on::before { top: 0; transform-origin: top; }
                #ew-screen.ew-turning-on::after { bottom: 0; transform-origin: bottom; }
                #ew-screen.ew-active-open::before, #ew-screen.ew-active-open::after { transform: scaleY(0); }
            `;
            break;
    }

    style.innerHTML = `
        #ew-screen {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            z-index: 999999; font-family: system-ui, -apple-system, sans-serif;
            overflow: hidden; transition: opacity 0.5s ease; box-sizing: border-box; padding: 20px;
        }
        ${ewSpecificCSS}

        /* Khung hiển thị cho chế độ slide hoặc hiển thị thông thường */
        .ew-content-box {
            display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
            opacity: 0; transform: scale(0.85);
            transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 20; gap: 16px;
        }
        .ew-content-box.ew-show { opacity: 1; transform: scale(1); }
        .ew-content-box.ew-hide { opacity: 0; transform: scale(1.1); transition: opacity 0.4s ease, transform 0.4s ease; }

        .ew-logo-img {
            width: 105px; height: 105px; object-fit: contain;
            filter: drop-shadow(0 0 25px rgba(0, 240, 255, 0.9));
        }
        .ew-text-group {
            display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px;
        }
        .ew-title {
            color: #ffffff; font-size: clamp(24px, 5vw, 36px); font-weight: 700;
            letter-spacing: 3px; text-transform: uppercase;
            text-shadow: 0 0 15px rgba(0, 240, 255, 0.8);
        }
        .ew-subtitle {
            color: #00f0ff; font-size: clamp(14px, 3vw, 20px); font-weight: 600;
            letter-spacing: 2px; text-transform: uppercase;
            text-shadow: 0 0 10px rgba(0, 240, 255, 0.7);
        }

        /* Trường hợp dùng các kiểu thông thường (lg, sony, samsung...) hiển thị chung 1 khung */
        .ew-static-wrap {
            display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;
            gap: 20px; opacity: 0; transform: scale(0.85); flex-wrap: wrap;
            transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 20; max-width: 95vw;
        }
        .ew-static-wrap.ew-show { opacity: 1; transform: scale(1); }
        .ew-static-wrap.ew-fade-out { opacity: 0; transform: scale(1.15); transition: opacity 0.4s ease; }
        
        .ew-item-group { display: flex; align-items: center; gap: 12px; }
        .ew-main-logo-static { width: 90px; height: 90px; object-fit: contain; filter: drop-shadow(0 0 20px rgba(0, 240, 255, 0.8)); }
        .ew-sub-logo-static { width: 60px; height: 60px; object-fit: contain; filter: drop-shadow(0 0 15px rgba(0, 240, 255, 0.6)); }
        .ew-text-box-static { display: flex; flex-direction: column; align-items: flex-start; text-align: left; }
        .ew-multiplier { color: rgba(255, 255, 255, 0.7); font-size: 26px; font-weight: 700; font-family: monospace; }
    `;
    document.head.appendChild(style);

    const splash = document.createElement('div');
    splash.id = 'ew-screen';
    splash.className = 'ew-turning-on';
    splash.innerHTML = `<div id="ew-container" style="display:flex; align-items:center; justify-content:center;"></div>`;
    
    if (document.body) {
        document.body.prepend(splash);
    } else {
        document.addEventListener('DOMContentLoaded', () => document.body.prepend(splash));
    }

    // === 4. Điều phối hiển thị tùy theo style (slide hay các kiểu khác) ===
    function runSplash() {
        const container = document.getElementById('ew-container');
        if (!container) return;

        if (ewStyle === 'slide') {
            // --- KIỂU SLIDE: Trình chiếu tuần tự từng logo một ---
            container.innerHTML = `<div id="ew-slide-box" class="ew-content-box"></div>`;
            const slideBox = document.getElementById('ew-slide-box');
            let index = 0;
            const timePerSlide = 1400; 
            const transitionDelay = 400;

            function nextSlide() {
                if (index >= sequenceList.length) {
                    setTimeout(() => {
                        splash.classList.add('ew-active-open');
                    }, 200);
                    setTimeout(() => { splash.remove(); }, 900);
                    return;
                }

                const item = sequenceList[index];
                slideBox.innerHTML = `
                    <img src="${item.logo}" alt="Logo" class="ew-logo-img">
                    <div class="ew-text-group">
                        <div class="ew-title">${item.title}</div>
                        ${item.subtitle ? `<div class="ew-subtitle">${item.subtitle}</div>` : ''}
                    </div>
                `;

                setTimeout(() => { slideBox.classList.add('ew-show'); }, 50);
                setTimeout(() => {
                    slideBox.classList.remove('ew-show');
                    slideBox.classList.add('ew-hide');
                }, timePerSlide - transitionDelay);

                setTimeout(() => {
                    slideBox.classList.remove('ew-hide');
                    index++;
                    nextSlide();
                }, timePerSlide);
            }
            setTimeout(nextSlide, 300);

        } else {
            // --- CÁC KIỂU KHÁC (lg, sony, astronaut, explosion...): Hiển thị đồng thời toàn bộ ---
            let htmlParts = [];
            htmlParts.push(`
                <div class="ew-item-group">
                    <img src="${FIXED_MAIN_LOGO}" alt="Main Logo" class="ew-main-logo-static">
                    <div class="ew-text-box-static">
                        <div class="ew-title" style="font-size:24px;">${FIXED_MAIN_NAME}</div>
                        ${subNameSingleAttr ? `<div class="ew-subtitle" style="font-size:15px;">${subNameSingleAttr}</div>` : ''}
                    </div>
                </div>
            `);

            subLogosArray.forEach((logoUrl, i) => {
                let subNameText = subNamesArray[i] || "";
                htmlParts.push(`<span class="ew-multiplier">&times;</span>`);
                htmlParts.push(`
                    <div class="ew-item-group">
                        <img src="${logoUrl}" alt="Sub Logo" class="ew-sub-logo-static">
                        ${subNameText ? `
                            <div class="ew-text-box-static">
                                <div class="ew-subtitle" style="font-size:15px;">${subNameText}</div>
                            </div>
                        ` : ''}
                    </div>
                `);
            });

            container.innerHTML = `<div id="ew-static-content" class="ew-static-wrap">${htmlParts.join('')}</div>`;
            const staticContent = document.getElementById('ew-static-content');

            setTimeout(() => { staticContent.classList.add('ew-show'); }, 200);
            setTimeout(() => { staticContent.classList.add('ew-fade-out'); }, CONFIG_DURATION - 1000 || 2800);
            setTimeout(() => {
                if (ewStyle === 'explosion' || ewStyle === 'sony') {
                    splash.classList.add('ew-flash-effect');
                    setTimeout(() => splash.classList.remove('ew-flash-effect'), 150);
                }
                splash.classList.add('ew-active-open');
            }, 3400);
            setTimeout(() => { splash.remove(); }, 3800);
        }
    }

    if (document.readyState === 'complete') {
        runSplash();
    } else {
        window.addEventListener('load', runSplash);
    }
})();
                
