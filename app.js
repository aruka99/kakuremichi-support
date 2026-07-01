import * as THREE from './vendor/three.module.min.js';

(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const navigation = document.querySelector('.desktop-nav');
  const progress = document.querySelector('.journey-progress');
  const progressFill = progress?.querySelector('i');
  const story = document.querySelector('.story');

  const updatePageState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 30);
    progress?.classList.toggle('is-light', window.scrollY > (story?.offsetTop || window.innerHeight) - 120);
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const value = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    progressFill?.style.setProperty('--page-progress', value.toFixed(4));
  };
  updatePageState();
  window.addEventListener('scroll', updatePageState, { passive: true });
  window.addEventListener('resize', updatePageState, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  });
  navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  if (window.gsap && !reduceMotion) {
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    gsap.from('.hero-copy > *', { y: 32, opacity: 0, duration: 1.05, stagger: 0.11, ease: 'power3.out', delay: 0.25 });
    gsap.from('.site-header', { y: -24, opacity: 0, duration: .8, ease: 'power2.out' });
    gsap.from('.decor', { scale: .82, opacity: 0, rotation: '+=5', duration: 1.2, stagger: .1, ease: 'back.out(1.4)', delay: .55 });
    gsap.fromTo('.route-path', { strokeDashoffset: 580 }, { strokeDashoffset: 0, duration: 3.4, ease: 'none', delay: .5 });

    const routePath = document.querySelector('.route-path');
    const routeTraveler = document.querySelector('.route-traveler');
    if (routePath && routeTraveler) {
      const length = routePath.getTotalLength();
      const placeTraveler = (progressValue) => {
        const point = routePath.getPointAtLength(length * progressValue);
        const next = routePath.getPointAtLength(Math.min(length, length * progressValue + 2));
        const angle = Math.atan2(next.y - point.y, next.x - point.x) * 180 / Math.PI;
        routeTraveler.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`);
      };
      placeTraveler(0);
      const travelerState = { value: 0 };
      gsap.to(travelerState, {
        value: 1,
        duration: 4.2,
        delay: .65,
        ease: 'power1.inOut',
        onUpdate: () => placeTraveler(travelerState.value)
      });
      window.ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => placeTraveler(1 - self.progress * .72)
      });
    }

    gsap.to('.hero-photo', {
      scale: 1.12,
      yPercent: 8,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.hero-copy', {
      y: -64,
      opacity: .22,
      scale: .97,
      ease: 'none',
      scrollTrigger: { trigger: '.story', start: 'top 100%', end: 'top 35%', scrub: 1 }
    });
    gsap.to('.hero .decor, .hero .route-line', {
      y: -38,
      opacity: .18,
      ease: 'none',
      scrollTrigger: { trigger: '.story', start: 'top 100%', end: 'top 30%', scrub: 1 }
    });
    gsap.fromTo('.torn-paper-edge',
      { y: 72, scaleY: .9 },
      { y: 0, scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.story', start: 'top 100%', end: 'top 62%', scrub: 1 } }
    );
    document.querySelectorAll('.section-inner, .section-decor').forEach((element) => {
      gsap.from(element, {
        y: 54,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 84%', once: true }
      });
    });
    document.querySelectorAll('.story h2, .steps h2, .faq h2, .support h2').forEach((heading) => {
      gsap.from(heading, {
        yPercent: 52,
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: heading, start: 'top 86%', once: true }
      });
    });
    gsap.from('.story-copy > p', {
      y: 24,
      opacity: 0,
      stagger: .15,
      duration: .8,
      scrollTrigger: { trigger: '.story-copy', start: 'top 82%', once: true }
    });
    gsap.from('.secret-note', {
      y: 30,
      rotation: -7,
      scale: .9,
      opacity: 0,
      duration: .95,
      ease: 'back.out(1.5)',
      scrollTrigger: { trigger: '.secret-note', start: 'top 90%', once: true }
    });
    gsap.from('.step-list li', {
      x: -38,
      opacity: 0,
      stagger: .16,
      duration: .85,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.step-list', start: 'top 78%', once: true }
    });
    gsap.to('.step-list', {
      '--step-progress': 1,
      ease: 'none',
      scrollTrigger: { trigger: '.step-list', start: 'top 76%', end: 'bottom 55%', scrub: .7 }
    });
    gsap.to('.story-stamp', { rotation: 14, scrollTrigger: { trigger: '.story', scrub: 1, start: 'top bottom', end: 'bottom top' } });
    gsap.to('.story-leaf', { y: -70, rotation: -8, scrollTrigger: { trigger: '.story', scrub: 1, start: 'top bottom', end: 'bottom top' } });
    gsap.to('.step-map', { y: 80, rotation: -2, scrollTrigger: { trigger: '.steps', scrub: 1, start: 'top bottom', end: 'bottom top' } });

    const layers = [...document.querySelectorAll('.float-layer')];
    window.addEventListener('pointermove', (event) => {
      const nx = event.clientX / window.innerWidth - .5;
      const ny = event.clientY / window.innerHeight - .5;
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth || .2);
        gsap.to(layer, { x: nx * 80 * depth, y: ny * 60 * depth, duration: .8, ease: 'power2.out', overwrite: true });
      });
    }, { passive: true });

    document.querySelectorAll('.primary-action, .support-link').forEach((link) => {
      link.addEventListener('pointermove', (event) => {
        if (window.innerWidth < 781) return;
        const rect = link.getBoundingClientRect();
        gsap.to(link, { x: (event.clientX - rect.left - rect.width / 2) * .06, y: (event.clientY - rect.top - rect.height / 2) * .08, duration: .35, ease: 'power2.out' });
      });
      link.addEventListener('pointerleave', () => gsap.to(link, { x: 0, y: 0, duration: .55, ease: 'elastic.out(1, .45)' }));
    });
  }

  if (reduceMotion) return;
  const canvas = document.querySelector('#ambient-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, .1, 100);
  camera.position.z = 7;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));

  const count = window.innerWidth < 780 ? 42 : 86;
  const positions = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (Math.random() - .15) * 12;
    positions[index * 3 + 1] = (Math.random() - .5) * 8;
    positions[index * 3 + 2] = (Math.random() - .5) * 4;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color: 0xf2c469, size: .045, transparent: true, opacity: .72, blending: THREE.AdditiveBlending, depthWrite: false });
  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  let pointerX = 0;
  let pointerY = 0;
  window.addEventListener('pointermove', (event) => {
    pointerX = (event.clientX / window.innerWidth - .5) * .22;
    pointerY = (event.clientY / window.innerHeight - .5) * .16;
  }, { passive: true });

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const clock = new THREE.Clock();
  const render = () => {
    const elapsed = clock.getElapsedTime();
    particles.rotation.z = elapsed * .008;
    particles.position.y = Math.sin(elapsed * .25) * .07;
    camera.position.x += (pointerX - camera.position.x) * .025;
    camera.position.y += (-pointerY - camera.position.y) * .025;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  render();
})();
