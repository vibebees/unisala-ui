#renaming files from .js to .tsx
 find . -type f -name "*.js" -exec bash -c 'mv "$0" "${0%.js}.tsx"' {} \;