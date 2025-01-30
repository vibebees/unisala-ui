#renaming files from .js to .tsx
 find . -type f -name "*.js" -exec bash -c 'mv "$0" "${0%.js}.tsx"' {} \;


 #build
 ionic build

 #deployment
 cd build/dist
 http-server -p 3000 -P http://localhost:3000?







1. Discussion

1. Media query to figure out the responsiveness
2. Don;t use useEffect
3. make a status,message and data for cache returns
4. url update and re routing
5.
