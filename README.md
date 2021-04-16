# Backend 

Mongo/Express/POSTMAN

# Instalaciones extras

Instalamos la libreria para el hash ** npm i bcryptjs **
Se instala para facilitar configuracion de BD ** npm i mongoose **
Se instala moment para manejar fechas/horas ** npm i moment **
Se instala para manejar Token's  ** npm i jsonwebtoken **


# Para ver en consola despues de haber subido a heroku

heroku logs -n 1000 --tail

# si se hace alguna modificacion para subirlo a heroku

git status - para ver que archivos estan modificados
git add .
git commit -m "actualizando auth.js" - hacemos el commit
git push heroku master - Para subirlo a heroku
