src/theme/tailwind is used to output src/index.css

npx tailwindcss -i ./src/theme/tailwind.css -o ./src/tailwindOutput.css --watchnpx tailwindcss -i ./src/theme/tailwind.css -o ./src/tailwindOutput.css --watch

tailwindOutput is imported on app main.tsx
