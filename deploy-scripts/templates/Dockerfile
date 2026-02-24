FROM nginx:1.27.4-alpine

# Copy the Rails Appplication leaving out the .dockerignored files
ADD dist /usr/share/nginx/html
ADD package.json /usr/share/nginx/html
