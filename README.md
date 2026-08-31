# Ricardo Fundora Portfolio

Portfolio orientado a producto y captación de clientes para Ricardo Fundora. Presenta cuatro
casos principales, capacidades de desarrollo, proyectos en construcción, proceso de trabajo y
contacto en español e inglés.

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
- `content/portfolio.ts`: narrativa bilingüe, casos, soluciones y proceso de trabajo.
- `public/projects/`: activos originales de Kontado, Nerd Vault y Numb3rs.
- `public/ricardo-fundora.webp`: retrato optimizado utilizado en la presentación principal.
- `public/fonts/`: tipografía local, sin dependencias remotas.
