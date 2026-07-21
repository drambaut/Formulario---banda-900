import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from . import settings

bearer_scheme = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
) -> dict:
    """
    Verifica el JWT emitido por Supabase Auth (lo genera el frontend al hacer
    supabase.auth.signInWithPassword en /admin). No hace llamada de red: valida
    la firma localmente contra SUPABASE_JWT_SECRET.
    """
    if not settings.SUPABASE_JWT_SECRET:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="El backend no tiene configurado SUPABASE_JWT_SECRET",
        )
    token = credentials.credentials
    try:
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated",
        )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token invalido o expirado, vuelve a iniciar sesion",
        )
    return payload  # incluye "sub" (uuid del usuario) y "email"
