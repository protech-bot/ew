(function() {
    // === 1. CỐ ĐỊNH LOGO CHÍNH & TÊN CHÍNH (MAIN BRAND NAME) ===
    const FIXED_MAIN_LOGO = "https://raw.githubusercontent.com/protech-code/.github/refs/heads/main/Protech%20logo.png";
    const FIXED_MAIN_NAME = "PROTECH GROUP"; // Tên chính luôn hiển thị

    // === 2. Đọc dữ liệu từ thẻ <script đang nhúng> ===
    const currentScript = document.currentScript;
    
    const subLogosAttr = currentScript ? currentScript.getAttribute('data-sublogos') : null;
    
    // Đọc tên phụ (subname) từ thẻ script
    const subNameAttr = currentScript ? currentScript.getAttribute('data-subname') : null;
    
    const ewStyle = currentScript ? (currentScript.getAttribute('data-ew') || currentScript.getAttribute('data-tv') || 'samsung').toLowerCase() : 'samsung';

    const CONFIG = {
        logoUrl: FIXED_MAIN_LOGO,
        subLogos: subLogosAttr ? subLogosAttr.split(',').map(s => s.trim()).filter(Boolean) : [],
        mainName: FIXED_MAIN_NAME,
        subName: subNameAttr ? subNameAttr.trim() : "",
        duration: 3800 // Tổng thời gian chạy hiệu ứng (ms)
        const subLogosArray = subLogosAttr ? subLogosAttr.split(',').map(s => s.trim()).filter(Boolean) : [];
    
        // === THÊM ĐOẠN NÀY ĐỂ TỰ ĐỘNG CO GIÃN LOGO THEO SỐ LƯỢNG ===
        const totalLogosCount = 1 + subLogosArray.length;
        let logoSize = 65;
        let gapSize = 14;
        if (totalLogosCount > 3) { logoSize = 50; gapSize = 10; }
        if (totalLogosCount > 5) { logoSize = 40; gapSize = 8; }
    };

    // === 3. Cấu hình CSS động (Dùng tiền tố ew) ===
    const style = document.createElement('style');
    let ewSpecificCSS = '';

    switch (ewStyle) {
        case 'explosion':
            ewSpecificCSS = `
                #ew-screen { background-color: #050202; }
                #ew-screen.ew-turning-on::before {
                    content: '';
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background: #ff3300;
                    border-radius: 50%;
                    box-shadow: 0 0 120px 60px #ff3300, 0 0 300px 150px rgba(255, 68, 0, 0.6), 0 0 600px 300px rgba(255, 200, 0, 0.3);
                    z-index: 10;
                    transform: scale(0.1);
                    opacity: 1;
                    transition: transform 0.6s cubic-bezier(0.1, 1, 0.2, 1), opacity 0.5s ease 0.2s;
                }
                #ew-screen.ew-active-open::before { transform: scale(200); opacity: 0; }
                #ew-screen.ew-flash-effect { background: #fff5e6 !important; transition: background 0.08s ease-out; }
            `;
            break;
        case 'astronaut':
            ewSpecificCSS = `
                #ew-screen { 
                    background-color: #020205; 
                    background-image: radial-gradient(circle at center, #0f172a 0%, #020205 100%);
                }
                #ew-screen.ew-turning-on::before {
                    content: '';
                    position: absolute;
                    width: 100vw;
                    height: 100vw;
                    background: radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%);
                    z-index: 10;
                    transform: scale(0.1);
                    opacity: 1;
                    transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.6s ease;
                }
                #ew-screen.ew-active-open::before { transform: scale(3); opacity: 0; }
            `;
            break;
        case 'lg':
            ewSpecificCSS = `
                #ew-screen { background-color: #040814; }
                #ew-screen.ew-turning-on::before {
                    content: '';
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background: #0098ff;
                    border-radius: 50%;
                    box-shadow: 0 0 100px 50px #0098ff, 0 0 300px 150px rgba(0, 152, 255, 0.4);
                    z-index: 10;
                    transform: scale(1);
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
                @keyframes sony-fade-in {
                    0% { filter: brightness(5); }
                    100% { filter: brightness(1); }
                }
            `;
            break;
        case 'toshiba':
            ewSpecificCSS = `
                #ew-screen { background-color: #0a0a0a; }
                #ew-screen.ew-turning-on::before,
                #ew-screen.ew-turning-on::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    width: 50%;
                    height: 100%;
                    background: #000000;
                    z-index: 10;
                    transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
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
                #ew-screen.ew-turning-on::before,
                #ew-screen.ew-turning-on::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    width: 100%;
                    height: 50%;
                    background: #000000;
                    z-index: 10;
                    transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
                }
                #ew-screen.ew-turning-on::before { top: 0; transform-origin: top; }
                #ew-screen.ew-turning-on::after { bottom: 0; transform-origin: bottom; }
                #ew-screen.ew-active-open::before,
                #ew-screen.ew-active-open::after { transform: scaleY(0); }
            `;
            break;
    }

    style.innerHTML = `
        #ew-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 999999;
            font-family: system-ui, -apple-system, sans-serif;
            overflow: hidden;
            transition: opacity 0.5s ease;
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            z-index: 999999; font-family: system-ui, -apple-system, sans-serif;
            overflow: hidden; transition: opacity 0.5s ease; box-sizing: border-box; padding: 20px;
        }
        ${ewSpecificCSS}

        .ew-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            opacity: 0;
            transform: ${ewStyle === 'explosion' ? 'scale(0.3)' : (ewStyle === 'astronaut' ? 'scale(0.2)' : 'scale(0.85)')};
            z-index: 20;
            display: flex; flex-direction: column; align-items: center; text-align: center;
            max-width: 90vw; opacity: 0;
            transform: ${ewStyle === 'explosion' ? 'scale(0.3)' : (ewStyle === 'astronaut' ? 'scale(0.2)' : 'scale(0.85)')};
        }
        .ew-content.ew-show { opacity: 1; transform: scale(1); }
        .ew-content.ew-fade-out { opacity: 0; transform: scale(1.15); transition: opacity 0.4s ease; }

        /* === PHẦN TỰ ĐỘNG CĂN CHỈNH LOGO === */
        .ew-logos-wrapper {
            display: flex; align-items: center; justify-content: center;
            gap: ${gapSize}px; margin-bottom: 20px; flex-wrap: wrap; max-width: 100%;
        }

        .ew-logo-item {
            width: ${logoSize}px; height: ${logoSize}px;
            object-fit: contain; filter: drop-shadow(0 0 15px rgba(0, 240, 255, 0.6));
            transition: width 0.3s ease, height 0.3s ease;
        }

        .ew-multiplier {
            color: rgba(255, 255, 255, 0.7);
            font-size: ${Math.max(16, logoSize * 0.35)}px;
            font-weight: 600; font-family: monospace;
            text-shadow: 0 0 8px rgba(0, 240, 255, 0.4); user-select: none;
        }

        /* === PHẦN TỰ ĐỘNG CĂN CHỈNH TÊN === */
        .ew-names-wrapper {
            display: flex; flex-direction: column; align-items: center; gap: 8px; width: 100%;
        }

        .ew-title {
            color: #ffffff; font-size: clamp(18px, 4vw, 26px); font-weight: 700;
            letter-spacing: 4px; text-transform: uppercase;
            text-shadow: 0 0 12px rgba(0, 240, 255, 0.6); word-break: break-word;
        }

        .ew-subtitle {
            color: #00f0ff; font-size: clamp(12px, 2.5vw, 15px); font-weight: 600;
            letter-spacing: 3px; text-transform: uppercase;
            text-shadow: 0 0 8px rgba(0, 240, 255, 0.5); word-break: break-word;
        }

        .ew-content.ew-show {
            opacity: 1;
            transform: scale(1);
        }
        .ew-content.ew-fade-out {
            opacity: 0;
            transform: scale(1.15);
            transition: opacity 0.4s ease;
        }

        .ew-logos-wrapper {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 16px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .ew-logo-item {
            width: 65px;
            height: 65px;
            object-fit: contain;
            filter: drop-shadow(0 0 15px rgba(0, 240, 255, 0.6));
        }

        .ew-multiplier {
            color: rgba(255, 255, 255, 0.7);
            font-size: 20px;
            font-weight: 600;
            font-family: monospace;
            text-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
            user-select: none;
        }

        /* Khu vực hiển thị Tên chính & Tên phụ */
        .ew-names-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
        }

        .ew-title {
            color: #ffffff;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 4px;
            text-transform: uppercase;
            text-shadow: 0 0 12px rgba(0, 240, 255, 0.6);
        }

        .ew-subtitle {
            color: #00f0ff;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 3px;
            text-transform: uppercase;
            text-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
        }

        
    `;
    document.head.appendChild(style);

    // === 4. Xây dựng cấu trúc HTML (Logo Chính + Các logo phụ) ===
    let allLogos = [CONFIG.logoUrl, ...CONFIG.subLogos];
    let items = [];
    allLogos.forEach((url, index) => {
        items.push(`<img src="${url}" alt="Logo ${index}" class="ew-logo-item">`);
        if (index < allLogos.length - 1) {
            items.push(`<span class="ew-multiplier">&times;</span>`);
        }
    });

    // Xây dựng phần hiển thị tên (Tên chính luôn hiện + Tên phụ nếu có)
    let namesHTML = `<div class="ew-title">${CONFIG.mainName}</div>`;
    if (CONFIG.subName) {
        namesHTML += `<div class="ew-subtitle">${CONFIG.subName}</div>`;
    }

    const splash = document.createElement('div');
    splash.id = 'ew-screen';
    splash.className = 'ew-turning-on';
    splash.innerHTML = `
        <div class="ew-content">
            <div class="ew-logos-wrapper">${items.join('')}</div>
            <div class="ew-names-wrapper">
                ${namesHTML}
            </div>
        </div>
    `;
    
    if (document.body) {
        document.body.prepend(splash);
    } else {
        document.addEventListener('DOMContentLoaded', () => document.body.prepend(splash));
    }

    // === 5. Điều phối Timeline Hiệu ứng ===
    window.addEventListener('load', () => {
        const content = splash.querySelector('.ew-content');

        setTimeout(() => {
            content.classList.add('ew-show');
        }, 200);

        setTimeout(() => {
            content.classList.add('ew-fade-out');
        }, CONFIG.duration - 1000);

        setTimeout(() => {
            if (ewStyle === 'explosion' || ewStyle === 'sony') {
                splash.classList.add('ew-flash-effect');
                setTimeout(() => splash.classList.remove('ew-flash-effect'), 150);
            }
            splash.classList.add('ew-active-open');
        }, CONFIG.duration - 400);

        setTimeout(() => {
            splash.remove();
        }, CONFIG.duration + 400);
    });
})();
