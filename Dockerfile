FROM nginx:1.27-alpine

# Remove the default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy all static assets into the Nginx web-root
COPY index.html        /usr/share/nginx/html/
COPY admin.html        /usr/share/nginx/html/
COPY style.css         /usr/share/nginx/html/
COPY admin.css         /usr/share/nginx/html/
COPY script.js         /usr/share/nginx/html/
COPY admin.js          /usr/share/nginx/html/

# (Optional) copy the resume doc if you want it downloadable
COPY 249_Raghu_R_Resume_ATS.docx /usr/share/nginx/html/

# Replace the default Nginx config with a minimal, SPA-friendly one
RUN printf 'server {\n\
    listen 80;\n\
    server_name _;\n\
\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    # Serve static files; fall back to index.html for client-side routing\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
\n\
    # Cache static assets aggressively\n\
    location ~* \\.(css|js|png|jpg|jpeg|gif|ico|woff2?|ttf|svg|docx)$ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
\n\
    # Security headers\n\
    add_header X-Frame-Options "SAMEORIGIN";\n\
    add_header X-Content-Type-Options "nosniff";\n\
    add_header Referrer-Policy "strict-origin-when-cross-origin";\n\
}\n' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Nginx runs in the foreground by default in Docker
CMD ["nginx", "-g", "daemon off;"]