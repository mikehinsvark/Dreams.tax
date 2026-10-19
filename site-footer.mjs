// Shared across every product destination and the resource reader.
const external = 'target="_blank" rel="noopener noreferrer"';
const arrow = '<span aria-hidden="true">↗</span>';
const paths = {
  genie: '<path d="m12 2 2.7 6.7L21 11l-6.3 2.3L12 20l-2.7-6.7L3 11l6.3-2.3L12 2Z"/><path d="m20 2 .7 1.7L22 4l-1.3.5L20 6l-.7-1.5L18 4l1.3-.3L20 2Z"/>',
  lifestyle: '<path d="M3 18h18M5 21h14M4 14a8 8 0 0 1 16 0M12 2v3M3 5l2 2M21 5l-2 2M1 12h3M20 12h3"/>',
  renewals: '<path d="M12 12c-2-4-3-5-5.5-5a5 5 0 0 0 0 10C9 17 10 16 12 12Zm0 0c2-4 3-5 5.5-5a5 5 0 0 1 0 10C15 17 14 16 12 12Z"/>',
  money: '<path d="M4 20V10m5 10V6m5 14v-6m5 6V3M2 20h20M3 6l5-4 6 6 6-6"/>',
  vantage: '<path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Z"/><path d="m8 12 3 3 5-6"/>'
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
const links = items => items.map(([label, href]) => `<li><a href="${href}" ${external}>${label}${arrow}</a></li>`).join('');
const featured = [
  ['genie','AI & PRODUCTIVITY','AI Genie Gold','Put your AI team to work.','https://aigeniedatabase.com/gold'],
  ['lifestyle','LIFESTYLE & POSSIBILITY','Renewals for Lifestyle','Picture your next chapter.','https://renewalsforlifestyle.com/'],
  ['renewals','RELATIONSHIPS & RENEWALS','Renewals for Life','Explore the renewal model.','https://renewalsforlife.info/'],
  ['money','THE BUSINESS CONVERSATION','Show Me the Money','See the opportunity.','https://showmethemoney.pro/dreams/'],
  ['vantage','HEALTH & BENEFITS','Trumark.Health','Explore our health benefits hub.','https://trumark.health/']
];

export function renderFooter(active, tabs) {
  return `<footer class="ecosystem-footer" id="contact" aria-labelledby="ecosystem-heading">
  <div class="eco-horizon" aria-hidden="true"></div>
  <div class="wrap eco-inner">
    <div class="eco-intro">
      <div><p class="eco-kicker"><span aria-hidden="true"></span>THE DREAMS ECOSYSTEM</p><h2 id="ecosystem-heading">One connection.<br><em>More possibilities.</em></h2></div>
      <blockquote>“You are in business for yourself,<br>but not by yourself.”<span>PEOPLE. PURPOSE. A BRIGHTER TOMORROW.</span></blockquote>
    </div>
    <div class="eco-brands sister-footer-brands" aria-label="The Dreams family of brands">
<a href="index.html" aria-label="Dreams Business Resources"><img src="assets/logos/dreams-business.png" width="2172" height="724" loading="lazy" alt="Dreams Business Resources"></a>
<a href="tax-prep.html" aria-label="Tax Prep Advocates"><img src="assets/logos/tax-prep.png" width="2172" height="724" loading="lazy" alt="Tax Prep Advocates"></a>
<a href="technology.html" aria-label="Dreams Technology Solutions"><img src="assets/logos/dreams-technology.png" width="2172" height="724" loading="lazy" alt="Dreams Technology Solutions"></a>
</div>
    <nav class="eco-featured" aria-label="Featured Dreams destinations">${featured.map(([key,kicker,title,copy,href])=>`<a class="eco-destination eco-${key}" href="${href}" ${external}><div class="eco-card-top"><span class="eco-icon">${icon(key)}</span>${arrow}</div><span class="eco-card-kicker">${kicker}</span><strong>${title}</strong><small>${copy}</small></a>`).join('')}</nav>
    <div class="eco-directory">
      <div class="eco-contact"><p class="eco-label">YOUR DREAMS CONNECTION</p><h3>Let’s build what’s next.</h3><p>One relationship. Multiple solutions.<br>A real person to help you connect the dots.</p><a class="eco-contact-button" href="mailto:mikeceo@gmail.com">Connect with Mike${arrow}</a><div class="eco-person"><strong>Mike Hinsvark</strong><a href="tel:+16199870113">619-987-0113</a><a href="mailto:mikeceo@gmail.com">mikeceo@gmail.com</a><a class="eco-save-contact" href="https://lcardapp.com/lcard/mikeceo-82581" ${external}>Save my contact ${arrow}</a></div></div>
      <nav class="eco-link-column" aria-label="Ecosystem exploration"><h3>Explore</h3><ul>${links([
        ['Ecosystem Map','https://dreamsfaststart.com/ecosystem.html'],
        ['Business Portfolio','https://dreamsfaststart.com/portfolio.html'],
        ['Live Training Hub','https://dreamsfaststart.com/livetrainings/'],
        ['Show Me the Money','https://showmethemoney.pro/dreams/']
      ])}</ul></nav>
      <nav class="eco-link-column" aria-label="Learning and AI resources"><h3>Build momentum</h3><ul>${links([
        ['DBR Fast Start','https://dreamsfaststart.com/'],
        ['AI Leverage Lab','https://aileveragelab.pro/'],
        ['AI Genie Gold','https://aigeniedatabase.com/gold'],
        ['Voice 2.0','https://voice-20-sales-agent.mikeceo1840.chatgpt.site/#top']
      ])}</ul></nav>
      <nav class="eco-link-column" aria-label="Business opportunity ecosystem"><h3>Business ecosystem</h3><ul>${links([
        ['Renewals for Life','https://renewalsforlife.info/'],
        ['Renewals for Lifestyle','https://renewalsforlifestyle.com/'],
        ['Dreams & Vantage','https://dreamsvantage.com/'],
        ['Dreams Score','https://dreamsscores.com/?refid=AA0233'],
        ['Partner Program','https://strategicpartners.pro/']
      ])}</ul></nav>
    </div>
    <nav class="eco-products" aria-label="Explore all products"><span>EXPLORE OUR SOLUTIONS</span>${tabs.map(([id,name,url])=>`<a href="${url}" ${id===active?'aria-current="page"':''}>${name}</a>`).join('')}</nav>
    <div class="eco-bottom"><span>© 2026 Dreams Business Resources · Dreams.tax</span><span class="eco-signoff">RELATIONSHIPS. RENEWALS. POSSIBILITIES.</span><a href="${active==='care'?'#home':'#main'}">Back to top <span aria-hidden="true">↑</span></a></div>
    <p class="eco-note">For education and introductions. Tax credits, funding, refunds, services, and compensation depend on business-specific review, current provider terms, and applicable agreements. Income and results are not guaranteed. This site does not collect tax, payroll, banking, health, or customs records.</p>
  </div>
</footer>`;
}
