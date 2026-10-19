export function initializePageNavigation() {
  const nav = document.querySelector('#page-scroll-nav');
  if (!nav) return;
  const sections = [...document.querySelectorAll('main > section, #contact')];
  const dots = nav.querySelector('.page-scroll-dots');
  const up = nav.querySelector('[data-scroll="up"]');
  const down = nav.querySelector('[data-scroll="down"]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const clean = text => text.replace(/\s+/g, ' ').trim();
  const labels = sections.map((section, index) => {
    if (!section.id) section.id = `page-section-${index + 1}`;
    if (index === 0) return 'Back to the top';
    if (section.id === 'contact') return 'Dreams ecosystem & contact';
    return section.dataset.navLabel || clean(
      section.querySelector('.eyebrow')?.textContent ||
      section.querySelector('h2')?.textContent ||
      section.querySelector('img')?.alt || `Section ${index + 1}`
    );
  });
  const links = sections.map((section, index) => {
    const link = document.createElement('a');
    link.href = `#${section.id}`;
    link.className = 'page-scroll-dot';
    link.setAttribute('aria-label', labels[index]);
    const label = document.createElement('span');
    label.className = 'page-scroll-label';
    label.setAttribute('aria-hidden', 'true');
    label.textContent = labels[index];
    link.append(label);
    link.addEventListener('click', event => {
      event.preventDefault();
      goTo(positions()[index]);
    });
    dots.append(link);
    return link;
  });
  function maximum() {
    return Math.max(0, document.documentElement.scrollHeight - innerHeight);
  }
  function positions() {
    const offset = document.querySelector('.site-header').offsetHeight +
      document.querySelector('.product-nav').offsetHeight + 20;
    const max = maximum();
    return sections.map((section, index) => index === 0 ? 0 :
      Math.min(max, Math.max(0, section.getBoundingClientRect().top + scrollY - offset)));
  }
  function goTo(top) {
    window.scrollTo({top, behavior: reducedMotion.matches ? 'auto' : 'smooth'});
  }
  up.addEventListener('click', () => {
    const previous = positions().filter(top => top < scrollY - 24).at(-1);
    goTo(previous ?? 0);
  });
  down.addEventListener('click', () => {
    const next = positions().find(top => top > scrollY + 24);
    goTo(next ?? maximum());
  });
  let queued = false;
  function update() {
    queued = false;
    const atBottom = scrollY >= maximum() - 8;
    let active = 0;
    positions().forEach((top, index) => { if (top <= scrollY + 24) active = index; });
    if (atBottom) active = sections.length - 1;
    links.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    up.disabled = scrollY < 8;
    down.disabled = atBottom;
  }
  function queueUpdate() {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }
  nav.hidden = false;
  window.addEventListener('scroll', queueUpdate, {passive: true});
  window.addEventListener('resize', queueUpdate);
  new ResizeObserver(queueUpdate).observe(document.body);
  update();
}
