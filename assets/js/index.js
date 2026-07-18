document.addEventListener('DOMContentLoaded', () => {

    const navbarCollapse = document.getElementById('navbarResponsiveSystem');
    if (navbarCollapse) {
        navbarCollapse.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }
      
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 700, easing: 'ease-out', once: true });
    }

    const typedTarget = document.querySelector('.typed');
    if (typedTarget && typeof Typed !== 'undefined') {
        const itemsStr = typedTarget.getAttribute('data-typed-items');
        if (itemsStr) {
            new Typed('.typed', {
                strings: itemsStr.split(','),
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2500,
                loop: true
            });
        }
    }

    const isoGrid = document.querySelector('.portfolio-isotope-container');
    if (isoGrid && typeof Isotope !== 'undefined') {
        let archiveIsotope = new Isotope(isoGrid, {
            itemSelector: '.portfolio-item-node',
            layoutMode: 'fitRows',
            transitionDuration: '0.4s' // Matches animation timing smoothly
        });

        // Dynamic height adjustment fix for overlapping containers
        archiveIsotope.on('arrangeComplete', () => {
            archiveIsotope.layout();
        });

        const filterTabs = document.querySelectorAll('.portfolio-filter-nav li');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                filterTabs.forEach(el => el.classList.remove('filter-active'));
                this.classList.add('filter-active');
                
                archiveIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });

                // Fail-safe timeout to force height synchronization if layout transition lags
                setTimeout(() => {
                    archiveIsotope.layout();
                }, 450);
            });
        });
    }

    /* --- EXPERT MOUSE TRAILING CURSOR ENGINE --- */
    const cursorCanvas = document.getElementById('expert-canvas-cursor');
    if (cursorCanvas && window.innerWidth >= 992) {
        const ctx = cursorCanvas.getContext('2d');
        let points = [];
        const maxPoints = 22;
        
        let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };
        let currentTarget = { x: mouse.x, y: mouse.y };

        function resizeCursorCanvas() {
            cursorCanvas.width = window.innerWidth;
            cursorCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCursorCanvas);
        resizeCursorCanvas();

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        });

        window.addEventListener('mouseleave', () => { mouse.active = false; });

        class DataNode {
            constructor() {
                this.x = mouse.x;
                this.y = mouse.y;
                this.vx = (Math.random() - 0.5) * 3;
                this.vy = (Math.random() - 0.5) * 3;
                this.radius = Math.random() * 2 + 1.5;
                this.alpha = 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vx *= 0.94;
                this.vy *= 0.94;
                this.alpha -= 0.016;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 1, 79, ${this.alpha * 0.8})`;
                ctx.fill();
            }
        }

        function renderEcosystemTrack() {
            ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
            
            currentTarget.x += (mouse.x - currentTarget.x) * 0.12;
            currentTarget.y += (mouse.y - currentTarget.y) * 0.12;

            if (mouse.active) {
                let radialGradient = ctx.createRadialGradient(currentTarget.x, currentTarget.y, 0, currentTarget.x, currentTarget.y, 45);
                radialGradient.addColorStop(0, 'rgba(255, 1, 79, 0.06)');
                radialGradient.addColorStop(1, 'rgba(255, 1, 79, 0)');
                ctx.beginPath();
                ctx.arc(currentTarget.x, currentTarget.y, 45, 0, Math.PI * 2);
                ctx.fillStyle = radialGradient;
                ctx.fill();

                if (Math.abs(mouse.x - currentTarget.x) > 0.5 || Math.abs(mouse.y - currentTarget.y) > 0.5) {
                    if (points.length < maxPoints) {
                        points.push(new DataNode());
                    }
                }
            }

            for (let i = points.length - 1; i >= 0; i--) {
                points[i].update();
                if (points[i].alpha <= 0) {
                    points.splice(i, 1);
                    continue;
                }
                points[i].draw();

                for (let j = i - 1; j >= 0; j--) {
                    let dx = points[i].x - points[j].x;
                    let dy = points[i].y - points[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 75) {
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        let sharedAlpha = Math.min(points[i].alpha, points[j].alpha) * (1 - distance / 75) * 0.25;
                        ctx.strokeStyle = `rgba(255, 1, 79, ${sharedAlpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            if (mouse.active) {
                ctx.beginPath();
                ctx.arc(currentTarget.x, currentTarget.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = '#ff014f';
                ctx.fill();
            }

            requestAnimationFrame(renderEcosystemTrack);
        }
        renderEcosystemTrack();
    }

    /* --- HIGH-PERFORMANCE IMMERSIVE INTERACTIVE 3D PARTICLE MATRIX ENGINE --- */
    const heroSection = document.getElementById('hero');
    const bannerCanvas = document.getElementById('hero-matrix-banner');
    
    if (bannerCanvas && heroSection) {
        const bCtx = bannerCanvas.getContext('2d');
        let points3D = [];
        const numParticles = 90;
        const focalLength = 320; 
        
        let angleY = 0.002; 
        let angleX = 0.001;
        
        let targetMouseX = 0;
        let targetMouseY = 0;
        let currentMouseX = 0;
        let currentMouseY = 0;

        function resizeBannerCanvas() {
            bannerCanvas.width = heroSection.offsetWidth;
            bannerCanvas.height = heroSection.offsetHeight;
        }
        window.addEventListener('resize', resizeBannerCanvas);
        resizeBannerCanvas();

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            targetMouseX = (e.clientX - rect.left - bannerCanvas.width / 2) * 0.0005;
            targetMouseY = (e.clientY - rect.top - bannerCanvas.height / 2) * 0.0005;
        });

        heroSection.addEventListener('mouseleave', () => {
            targetMouseX = 0;
            targetMouseY = 0;
        });

        function init3DMatrix() {
            points3D = [];
            for (let i = 0; i < numParticles; i++) {
                points3D.push({
                    x: (Math.random() - 0.5) * bannerCanvas.width * 0.8,
                    y: (Math.random() - 0.5) * bannerCanvas.height * 0.8,
                    z: (Math.random() - 0.5) * 400
                });
            }
        }
        init3DMatrix();

        function rotateY(point, angle) {
            let cos = Math.cos(angle);
            let sin = Math.sin(angle);
            let x1 = point.x * cos - point.z * sin;
            let z1 = point.z * cos + point.x * sin;
            point.x = x1;
            point.z = z1;
        }

        function rotateX(point, angle) {
            let cos = Math.cos(angle);
            let sin = Math.sin(angle);
            let y1 = point.y * cos - point.z * sin;
            let z1 = point.z * cos + point.y * sin;
            point.y = y1;
            point.z = z1;
        }

        function animate3DMatrix() {
            bCtx.clearRect(0, 0, bannerCanvas.width, bannerCanvas.height);
            
            currentMouseX += (targetMouseX - currentMouseX) * 0.05;
            currentMouseY += (targetMouseY - currentMouseY) * 0.05;

            let projectedPoints = [];

            for (let i = 0; i < points3D.length; i++) {
                let p = points3D[i];
                
                rotateY(p, angleY + currentMouseX * 0.02);
                rotateX(p, angleX + currentMouseY * 0.02);

                let perspective = focalLength / (focalLength + p.z);
                let screenX = p.x * perspective + bannerCanvas.width / 2;
                let screenY = p.y * perspective + bannerCanvas.height / 2;

                projectedPoints.push({ x: screenX, y: screenY, scale: perspective, z: p.z });
            }

            for (let i = 0; i < projectedPoints.length; i++) {
                let p1 = projectedPoints[i];
                if (p1.x < 0 || p1.x > bannerCanvas.width || p1.y < 0 || p1.y > bannerCanvas.height) continue;

                for (let j = i + 1; j < projectedPoints.length; j++) {
                    let p2 = projectedPoints[j];
                    let dx = p1.x - p2.x;
                    let dy = p1.y - p2.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        bCtx.beginPath();
                        bCtx.moveTo(p1.x, p1.y);
                        bCtx.lineTo(p2.x, p2.y);
                        let linkAlpha = (1 - (dist / 120)) * 0.14 * Math.min(p1.scale, p2.scale);
                        bCtx.strokeStyle = `rgba(255, 1, 79, ${linkAlpha})`;
                        bCtx.lineWidth = 0.5 * Math.min(p1.scale, p2.scale);
                        bCtx.stroke();
                    }
                }

                bCtx.beginPath();
                bCtx.arc(p1.x, p1.y, Math.max(0.5, 1.8 * p1.scale), 0, Math.PI * 2);
                bCtx.fillStyle = `rgba(255, 1, 79, ${0.1 + p1.scale * 0.4})`;
                bCtx.fill();
            }

            requestAnimationFrame(animate3DMatrix);
        }
        animate3DMatrix();
    }
});