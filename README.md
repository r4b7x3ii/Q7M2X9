# Q7M2X9

Q7M2X9 is a small Node.js library and CLI for generating mock payment cards for UI work, demos, screenshots, and automated tests. It supports common card networks and card types, produces JSON or SVG directly, and uses [makeables](https://www.npmjs.com/package/makeables) for PNG card rendering.

Generated cards are synthetic, visibly marked as test data, and are not intended for payment use.

```bash
npm install
node src/cli.js --network visa --kind virtual --output card.png
```

MIT licensed. `makeables` is a separate dependency and follows its own license.
