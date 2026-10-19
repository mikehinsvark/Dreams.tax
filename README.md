# Dreams.tax — Business Solutions Hub

The five-page sister site to Trumark.Health, with the shared navy/gold design, orbit carousel, three-brand header, and Dreams ecosystem footer.

## Pages

- `index.html`: Dreams Business Resources, partner overview, large destination links, Dreams Score, and supplied graphics.
- `tax-prep.html`: R&D-first Tax Prep Advocates page, 25-slide browser PDF, original PowerPoint, and separate FICA tip-credit section.
- `technology.html`: Dreams Technology, Sandler video, and Dreams AIO.
- `bank-breezy.html`: business-owner funding destinations and separately labeled partner documents.
- `tariff-recovery.html`: importer, partner, training, and call-script destinations with Word guides.

## Build and publish

Requires Node.js 22 or later; there are no package dependencies.

```text
node build-site.mjs
node verify.mjs
```

GitHub Actions publishes `dist/` to GitHub Pages on changes to `main`. Custom domain: `dreams.tax`. Enable HTTPS when GitHub finishes issuing its certificate.

Edit content in `build-site.mjs`, shared footer in `site-footer.mjs`, additional styles in `site.css`, and interactions in `app.js`. The `dist` assets are self-contained and preserved; there is no dependency on the Trumark repository.

## Supplied resources

Original program graphics, brochures, PowerPoint, Word documents, and Sandler video were supplied by the site owner. The browser R&D PDF is a faithful conversion of the 25-slide original. Source examples and collateral are labeled as such. Business-specific eligibility, funding, refunds, and compensation require current provider review.

The original DAC broker overview contains Wade Cordell's details and is explicitly labeled as a third-party source handout. Prominent referral links retain the owner's supplied `AA0233` destination parameters.

This static site has no forms, analytics, client-file uploads, or database. It does not collect tax, payroll, banking, health, or customs records.
