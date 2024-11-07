
@echo on

start cmd /k "npm run build &&  cd ./dist && git add . && git commit -m 'update' && git push origin main"

