# silicio-sudo · Portfolio

Web personal con diseño **dark + neón**, 100 % en español, que muestra tus
repositorios de GitHub y se **sincroniza automáticamente**: si subes un repo
nuevo, aparece solo en la web.

## Verla localmente

- **Opción rápida**: haz doble clic en `index.html` (funciona incluso abriendo el
  archivo directamente, porque la API de GitHub permite el acceso desde cualquier origen).
- **Opción con servidor** (por si prefieres `http://localhost`):

  ```powershell
  powershell -ExecutionPolicy Bypass -File .\serve.ps1
  ```

  Y abre `http://localhost:8765`.

## Estructura

```
silicio-portfolio/
├── index.html          # estructura de la página
├── css/style.css       # estilos (tema oscuro + neón, animaciones)
├── js/projects.js      # datos curados + usuario de GitHub
├── js/main.js          # carga de la API, render y animaciones
└── serve.ps1           # mini-servidor local opcional
```

## Cómo funciona

`js/main.js` pide a la API de GitHub `users/silicio-sudo/repos` y pinta una
tarjeta por repositorio con su descripción, lenguajes, topics y estrellas en vivo.

- Los repos que están en `CURATED` (en `js/projects.js`) salen con **descripción,
  funcionalidades y color personalizados**.
- Cualquier repo nuevo que **no** esté en `CURATED` aparece igualmente, de forma
  automática, con los datos públicos de GitHub.

## Personalizar / añadir proyectos

Edita `js/projects.js`:

1. **Cambiar el usuario**: `const GITHUB_USER = "silicio-sudo";`
2. **Añadir un proyecto con estilo propio** (dentro de `CURATED`):

   ```js
   "nombre-del-repo": {
     order: 7,                     // posición en la parrilla
     emoji: "🎮",
     color: "#e879f9",             // color de acento
     description: "Qué hace la app…",
     features: ["Función 1", "Función 2"],
     tech: ["Android", "Kotlin"]
   }
   ```

3. Si no lo añades, el repo saldrá igualmente de forma automática (con color y
   emoji asignados por defecto).

## Publicar en GitHub Pages (gratis)

1. Crea un repositorio llamado **`silicio-sudo.github.io`** en tu cuenta.
2. Sube el contenido de esta carpeta:

   ```powershell
   git init
   git add .
   git commit -m "portfolio"
   git branch -M main
   git remote add origin https://github.com/silicio-sudo/silicio-sudo.github.io.git
   git push -u origin main
   ```

3. En **Settings → Pages**, elige rama `main` y carpeta `/ (root)`.
4. Tu web quedará en **https://silicio-sudo.github.io**.
