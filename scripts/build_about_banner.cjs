const sharp = require('sharp');

async function createBanner() {
  const width = 1024;
  const headerHeight = 154;
  const modelsHeight = 339;
  const totalHeight = headerHeight + modelsHeight;

  // Read logos with balanced visual weight
  const sketchup = await sharp('public/images/brands/sketchup.png')
    .resize({ height: 40, fit: 'inside' })
    .toBuffer();

  const grabert = await sharp('public/images/brands/grabert.png')
    .resize({ height: 42, fit: 'inside' })
    .toBuffer();

  // For chaos, round the corners of the square red logo
  const chaosRaw = await sharp('public/images/brands/chaos.jpg')
    .resize({ height: 44, width: 44, fit: 'cover' })
    .toBuffer();

  const chaosMask = Buffer.from(
    '<svg width="44" height="44"><rect x="0" y="0" width="44" height="44" rx="8" ry="8" fill="#fff"/></svg>'
  );
  const chaos = await sharp(chaosRaw)
    .composite([{ input: chaosMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const models = await sharp('public/images/about/models-3d-printers.jpg').toBuffer();

  const skMeta = await sharp(sketchup).metadata();
  const grabertMeta = await sharp(grabert).metadata();
  const chaosMeta = await sharp(chaos).metadata();

  const cardW = 270;
  const cardH = 74;
  const cardY = 56;

  const gap = 26;
  const startX = Math.round((width - (cardW * 3 + gap * 2)) / 2);

  const skCardX = startX;
  const aresCardX = startX + cardW + gap;
  const chaosCardX = startX + (cardW + gap) * 2;

  const svgHeader = Buffer.from(`
    <svg width="${width}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="headerBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#f8fafc" />
        </linearGradient>
        <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#0f172a" flood-opacity="0.06" />
        </filter>
      </defs>

      <!-- Top banner background -->
      <rect x="0" y="0" width="${width}" height="${headerHeight}" fill="url(#headerBg)" />
      
      <!-- Top red accent line -->
      <rect x="0" y="0" width="${width}" height="4" fill="#dc2626" />

      <!-- Section Label Badge -->
      <g transform="translate(372, 16)">
        <rect x="0" y="0" width="280" height="26" rx="6" fill="#fef2f2" stroke="#fecaca" stroke-width="1" />
        <text x="140" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#dc2626" text-anchor="middle" letter-spacing="1.2">AUTHORIZED SOFTWARE PARTNERS</text>
      </g>

      <!-- Cards for logos -->
      <rect x="${skCardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2" filter="url(#cardShadow)" />
      <rect x="${aresCardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2" filter="url(#cardShadow)" />
      <rect x="${chaosCardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2" filter="url(#cardShadow)" />

      <!-- Label inside Graebert card for ARES CAD -->
      <text x="${aresCardX + 115}" y="${cardY + 36}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#0f172a">ARES Trinity</text>
      <text x="${aresCardX + 115}" y="${cardY + 52}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#64748b">2D/3D DWG CAD</text>

      <!-- Label inside Chaos card -->
      <text x="${chaosCardX + 80}" y="${cardY + 36}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#0f172a">CHAOS</text>
      <text x="${chaosCardX + 80}" y="${cardY + 52}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#64748b">V-Ray &amp; Enscape</text>

      <!-- Divider line above models -->
      <line x1="0" y1="${headerHeight}" x2="${width}" y2="${headerHeight}" stroke="#cbd5e1" stroke-width="1" />
    </svg>
  `);

  const skLeft = Math.round(skCardX + (cardW - skMeta.width) / 2);
  const skTop = Math.round(cardY + (cardH - skMeta.height) / 2);

  const grabertLeft = Math.round(aresCardX + 14);
  const grabertTop = Math.round(cardY + (cardH - grabertMeta.height) / 2);

  const chaosLeft = Math.round(chaosCardX + 22);
  const chaosTop = Math.round(cardY + (cardH - chaosMeta.height) / 2);

  await sharp(svgHeader)
    .composite([
      { input: sketchup, top: skTop, left: skLeft },
      { input: grabert, top: grabertTop, left: grabertLeft },
      { input: chaos, top: chaosTop, left: chaosLeft },
      { input: models, top: headerHeight, left: 0 }
    ])
    .jpeg({ quality: 96 })
    .toFile('public/images/about/about-leniva-poster.jpg');

  console.log('Saved updated banner successfully!');
}

createBanner().catch(console.error);
