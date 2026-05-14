@echo off
echo.
echo ===== LIMPIANDO SESION DEL BOT =====
echo.
echo Eliminando carpeta bot_sessions...
rmdir /s /q bot_sessions
echo ✅ Sesion limpiada
echo.
echo Iniciando bot...
npm start
