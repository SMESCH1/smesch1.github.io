"""Genera galeria.html desde notas.md (markdown-first: se edita notas.md y se vuelve a correr esto).
Uso: python generar_galeria.py"""
from pathlib import Path

import markdown

AQUI = Path(__file__).parent
cuerpo = markdown.markdown((AQUI / "notas.md").read_text(encoding="utf-8"), extensions=["tables"])
html = f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Portada con proyectos y cerebro</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Piazzolla:wght@600&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
<style>
  :root {{ --placa:#EDEDEB; --tinta:#111214; --tinta-suave:#4C4F55; --linea:#D2D3D5; --cobalto:#3C6DE4; }}
  body {{ margin:0; background:var(--placa); color:var(--tinta); font:400 18px/1.55 "Source Sans 3", "Segoe UI", sans-serif; }}
  main {{ max-width:1100px; margin:0 auto; padding:48px 24px 96px; }}
  h1, h2 {{ font-family:"Piazzolla", Georgia, serif; font-weight:600; line-height:1.1; }}
  h1 {{ font-size:44px; margin:0 0 24px; }}
  h2 {{ font-size:32px; margin:56px 0 16px; }}
  a {{ color:inherit; text-decoration-color:var(--cobalto); text-decoration-thickness:2px; text-underline-offset:4px; }}
  table {{ border-collapse:collapse; width:100%; font-size:16px; margin:16px 0; }}
  th, td {{ text-align:left; vertical-align:top; padding:8px 10px; border-bottom:1px solid var(--linea); }}
  th {{ font-weight:600; color:var(--tinta-suave); }}
  img, video {{ display:block; max-width:100%; margin:16px 0; border:1px solid var(--linea); border-radius:6px; }}
  p img {{ display:inline-block; vertical-align:top; max-width:calc(50% - 8px); margin:8px 8px 8px 0; }}
  video {{ width:100%; background:#000; }}
  code {{ font-size:.9em; }}
</style>
</head>
<body><main>
{cuerpo}
</main></body>
</html>
"""
(AQUI / "galeria.html").write_text(html, encoding="utf-8")
print("galeria.html generada")
