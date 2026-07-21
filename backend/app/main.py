import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .routers import carga_masiva, config, estaciones, solicitudes
from .supabase_client import ensure_bucket_cargas

app = FastAPI(title="ANE - Solicitudes banda 900 MHz")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(solicitudes.router)
app.include_router(estaciones.router)
app.include_router(carga_masiva.router)
app.include_router(config.router)


@app.on_event("startup")
def on_startup():
    ensure_bucket_cargas()


@app.get("/api/health")
def health():
    return {"status": "ok"}


# Sirve el build de React (frontend/dist copiado aqui como "static" durante el
# build de Docker). Debe ir al final para no tapar las rutas /api/*.
STATIC_DIR = os.path.join(os.path.dirname(__file__), "..", "static")
if os.path.isdir(STATIC_DIR):
    app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
