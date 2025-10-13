# Germano Martins CNC Specialists Site

This repository contains a static marketing site for **Germano Martins CNC Specialists**.

## Project Structure

```
public/
├── assets/          # Local SVG illustrations used across the site
├── index.html       # Main page markup
├── script.js        # Client-side interactions (navigation + login gate)
└── styles.css       # Futuristic BMW-inspired visual theme
render.yaml          # Render static site configuration
```

## Local Development

Serve the `public` directory with any static file server. For example:

```bash
npx serve public
```

## Deployment to Render

1. Create a new **Static Site** on [Render](https://render.com/).
2. Connect this repository.
3. Render automatically detects the `render.yaml` file and publishes the `public` folder.

No build command is required because the site is fully static.
