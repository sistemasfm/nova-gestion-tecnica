export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="es-AR">
  <head>
    <meta charset="utf-8" />
    <title>No pudimos cargar esta página | NOVA Gestión Técnica</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 16px/1.6 system-ui, -apple-system, sans-serif; background: #EDF1F4; color: #14304D; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.5rem; margin: 0 0 0.75rem; }
      p { color: rgba(20, 48, 77, 0.75); margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.65rem 1.25rem; border-radius: 0.375rem; font: inherit; font-weight: 600; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #C97B3D; color: #fff; }
      .secondary { background: #fff; color: #14304D; border-color: rgba(20, 48, 77, 0.25); }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>No pudimos cargar esta página</h1>
      <p>Ocurrió un inconveniente técnico. Podés intentar recargar o volver al inicio.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Reintentar</button>
        <a class="secondary" href="/">Ir al inicio</a>
      </div>
    </div>
  </body>
</html>`;
}
