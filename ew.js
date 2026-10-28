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

    const CONFIG = {
        mainLogoUrl: FIXED_MAIN_LOGO,
        mainName: FIXED_MAIN_NAME,
        subLogos: subLogosArray,
        subNames: subNamesArray,
        singleSubName: subNameSingleAttr ? subNameSingleAttr.trim() : "",
        duration: 3800
    };

    // === 3. Cấu hình CSS động (Cho phép xuống dòng linh hoạt, tự bọc cụm khi quá nhiều logo) ===
    const style = document.createElement('style');
    let ewSpecificCSS = '';

    switch (ewStyle) {
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

        /* Cho phép .ew-content co giãn và tự động xuống dòng (wrap) khi vượt quá chiều rộng */
        .ew-content {
            display: flex; 
            flex-direction: row; 
            flex-wrap: wrap; 
            align-items: center; 
            justify-content: center; 
            text-align: center;
            max-width: 850px; 
            opacity: 0; 
            gap: 18px 24px;
            transform: ${ewStyle === 'explosion' ? 'scale(0.3)' : (ewStyle === 'astronaut' ? 'scale(0.2)' : 'scale(0.85)')};
            transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 20;
        }
        .ew-content.ew-show { opacity: 1; transform: scale(1); }
        .ew-content.ew-fade-out { opacity: 0; transform: scale(1.15); transition: opacity 0.4s ease; }

        .ew-item-group {
            display: flex; align-items: center; gap: 12px;
        }
        
        /* Kích thước logo to rõ ràng, cân đối */
        .ew-main-logo {
            width: 85px; height: 85px; object-fit: contain;
            filter: drop-shadow(0 0 20px rgba(0, 240, 255, 0.8));
        }
        .ew-sub-logo {
            width: 58px; height: 58px; object-fit: contain;
            filter: drop-shadow(0 0 15px rgba(0, 240, 255, 0.6));
        }

        .ew-text-box {
            display: flex; flex-direction: column; align-items: flex-start; text-align: left;
        }
        
        .ew-title {
            color: #ffffff; font-size: 26px; font-weight: 700;
            letter-spacing: 2.5px; text-transform: uppercase;
            text-shadow: 0 0 12px rgba(0, 240, 255, 0.7); white-space: nowrap;
        }
        .ew-subtitle {
            color: #00f0ff; font-size: 18px; font-weight: 600;
            letter-spacing: 2px; text-transform: uppercase;
            text-shadow: 0 0 10px rgba(0, 240, 255, 0.6); white-space: nowrap;
        }
        .ew-multiplier {
            color: rgba(255, 255, 255, 0.6); font-size: 22px; font-weight: 700;
            font-family: monospace; user-select: none; margin: 0 4px;
        }

        /* Tự động tối ưu giao diện trên thiết bị di động */
        @media (max-width: 768px) {
            .ew-content {
                max-width: 95vw;
                gap: 12px 16px;
            }
            .ew-main-logo { width: 65px; height: 65px; }
            .ew-sub-logo { width: 45px; height: 45px; }
            .ew-title { font-size: 18px; }
            .ew-subtitle { font-size: 13px; }
            .ew-multiplier { font-size: 16px; }
        }
    `;
    document.head.appendChild(style);

    // === 4. Xây dựng cấu trúc HTML từng cặp Logo + Tên riêng biệt ===
    let htmlParts = [];

    // Cụm 1: Logo chính + Tên chính
    htmlParts.push(`
        <div class="ew-item-group">
            <img src="${CONFIG.mainLogoUrl}" alt="Main Logo" class="ew-main-logo">
            <div class="ew-text-box">
                <div class="ew-title">${CONFIG.mainName}</div>
                ${CONFIG.singleSubName ? `<div class="ew-subtitle">${CONFIG.singleSubName}</div>` : ''}
            </div>
        </div>
    `);

    // Các cụm tiếp theo: Logo phụ + Tên riêng của từng logo phụ
    CONFIG.subLogos.forEach((logoUrl, index) => {
        let subNameText = CONFIG.subNames[index] || ""; 
        htmlParts.push(`<span class="ew-multiplier">&times;</span>`);
        htmlParts.push(`
            <div class="ew-item-group">
                <img src="${logoUrl}" alt="Sub Logo ${index + 1}" class="ew-sub-logo">
                ${subNameText ? `
                    <div class="ew-text-box">
                        <div class="ew-subtitle">${subNameText}</div>
                    </div>
                ` : ''}
            </div>
        `);
    });

    const splash = document.createElement('div');
    splash.id = 'ew-screen';
    splash.className = 'ew-turning-on';
    splash.innerHTML = `
        <div class="ew-content">
            ${htmlParts.join('')}
        </div>
    `;
    
    if (document.body) {
        document.body.prepend(splash);
    } else {
        document.addEventListener('DOMContentLoaded', () => document.body.prepend(splash));
    }

    // === 5. Điều phối Timeline Hiệu ứng ===
    function runSplash() {
        const content = splash.querySelector('.ew-content');
        if (!content) return;

        setTimeout(() => { content.classList.add('ew-show'); }, 200);
        setTimeout(() => { content.classList.add('ew-fade-out'); }, CONFIG.duration - 1000);
        setTimeout(() => {
            if (ewStyle === 'explosion' || ewStyle === 'sony') {
                splash.classList.add('ew-flash-effect');
                setTimeout(() => splash.classList.remove('ew-flash-effect'), 150);
            }
            splash.classList.add('ew-active-open');
        }, CONFIG.duration - 400);
        setTimeout(() => { splash.remove(); }, CONFIG.duration + 400);
    }

    if (document.readyState === 'complete') {
        runSplash();
    } else {
        window.addEventListener('load', runSplash);
    }
})();
