#renaming files from .js to .tsx
 find . -type f -name "*.js" -exec bash -c 'mv "$0" "${0%.js}.tsx"' {} \;


 #build
 ionic build

 #deployment
 cd build/dist
 http-server -p 3000 -P http://localhost:3000?
