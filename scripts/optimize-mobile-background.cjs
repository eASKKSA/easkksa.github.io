const path = require("node:path");

// Next.js includes sharp for image optimization; use the same installed version.
const sharp = require(
  require.resolve("sharp", { paths: [require.resolve("next")] }),
);
const publicDirectory = path.resolve(__dirname, "../public");

async function optimizeMobileBackground() {
  const { data, info } = await sharp(
    path.join(publicDirectory, "askksa-background-tiger.svg"),
    { density: 144 },
  )
    .resize({ width: 512 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // The old CSS mask coloured every non-transparent pixel black.
  for (let offset = 0; offset < data.length; offset += info.channels) {
    data[offset] = 0;
    data[offset + 1] = 0;
    data[offset + 2] = 0;
  }

  // Bake the existing ellipse fade into alpha instead of stacking browser masks.
  const fade = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${info.width}" height="${info.height}">
      <defs><radialGradient id="fade">
        <stop offset="42%" stop-color="white"/>
        <stop offset="100%" stop-color="white" stop-opacity="0"/>
      </radialGradient></defs>
      <rect width="100%" height="100%" fill="url(#fade)"/>
    </svg>
  `);

  await sharp(data, { raw: info })
    .composite([{ input: fade, blend: "dest-in" }])
    .webp({ quality: 60, alphaQuality: 80, effort: 6 })
    .toFile(
      path.join(publicDirectory, "askksa-background-tiger-mobile-art.webp"),
    );
}

optimizeMobileBackground().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
