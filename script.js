document.addEventListener("DOMContentLoaded", () => {
    // 1. LIVE OS CLOCK
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID', { hour12: false });
        document.getElementById('live-clock').textContent = timeString;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 2. TYPEWRITER EFFECT
    const namaText = "Kiyoshi Oloan R.S.";
    let i = 0;
    const speed = 150;
    
    function typeWriter() {
        if (i < namaText.length) {
            document.getElementById("typewriter").innerHTML += namaText.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    setTimeout(typeWriter, 1000);

    // 3. WINDOW CONTROLS (MINIMIZE & CLOSE)
    const minBtns = document.querySelectorAll('.btn-min');
    const closeBtns = document.querySelectorAll('.btn-close');
    const restoreBtn = document.getElementById('restore-btn');

    minBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const windowBox = e.target.closest('.window-box');
            const windowBody = windowBox.querySelector('.window-body');
            if (windowBody.style.display === 'none') {
                windowBody.style.display = 'block';
                e.target.textContent = '_';
            } else {
                windowBody.style.display = 'none';
                e.target.textContent = '□';
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const windowBox = e.target.closest('.window-box');
            windowBox.style.display = 'none';
            restoreBtn.style.display = 'block';
        });
    });

    restoreBtn.addEventListener('click', () => {
        document.querySelectorAll('.window-box').forEach(box => {
            box.style.display = 'block';
            const windowBody = box.querySelector('.window-body');
            if(windowBody) windowBody.style.display = 'block';
        });
        restoreBtn.style.display = 'none';
    });

    // 4. DRAGGABLE WINDOWS (DESKTOP ONLY)
    if (window.innerWidth > 768) {
        const draggables = document.querySelectorAll('.draggable');
        
        draggables.forEach(draggable => {
            const header = draggable.querySelector('.window-header');
            let isDragging = false;
            let currentX, currentY, initialX, initialY;
            let xOffset = 0, yOffset = 0;

            draggable.style.position = 'relative';
            draggable.style.zIndex = '1';

            header.addEventListener("mousedown", dragStart);
            document.addEventListener("mouseup", dragEnd);
            document.addEventListener("mousemove", drag);

            function dragStart(e) {
                if (e.target.classList.contains('btn-min') || e.target.classList.contains('btn-close')) return;
                
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
                isDragging = true;
                
                draggables.forEach(d => d.style.zIndex = '1');
                draggable.style.zIndex = '100';
            }

            function dragEnd() {
                initialX = currentX;
                initialY = currentY;
                isDragging = false;
            }

            function drag(e) {
                if (isDragging) {
                    e.preventDefault();
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                    xOffset = currentX;
                    yOffset = currentY;
                    
                    draggable.style.transform = `translate(${currentX}px, ${currentY}px)`;
                }
            }
        });
    }
});