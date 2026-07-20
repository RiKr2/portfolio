# Ricardo Fundora Portfolio

Portfolio editorial e independiente para Ricardo Fundora. Presenta tres productos principales,
un laboratorio de proyectos, experiencia profesional y contacto en español e inglés.

## Desarrollo

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:3000` por defecto.

## Verificación

```bash
npm run lint
npm run build
```

El build es estático y se genera en `out/`, listo para desplegar en Vercel o cualquier hosting
de archivos estáticos.

## Estructura

- `app/`: layout, metadatos, estilos y rutas de Next.js.
- `components/portfolio.tsx`: experiencia interactiva principal.
- `content/portfolio.ts`: contenido bilingüe y datos de los proyectos.
- `public/projects/`: activos originales de Kontado, Nerd Vault y Numb3rs.
- `public/fonts/`: tipografía local, sin dependencias remotas.
