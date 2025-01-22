check what is taking big space


     du -sh Unisala-Message-Service Unisala-University-Service Unisala-User-Service test.log unisala-web

cd inside each services

     du -h --exclude='node_modules'

to check node_modules only
     find . -name 'node_modules' -type d -prune -exec du -sh {} +


     pm2 serve build --name unisala-web -p 3000