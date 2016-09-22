server {
  listen 80;
  server_name www.awesome-conferences.com;
  access_log /var/log/nginx/awesome_conferences_app.log;
  charset utf-8;
  error_page 404 /404.html;
  error_page 500 502 503 504 /50x.html;

  location /404.html {
    root /home/web/app/error;
    internal;
  }

  location /50x.html {
    root /home/web/app/error;
    internal;
  }

  location /public/ {
    root /home/web/app;
    index index.html index.htm;
  }

  location / {
    include 'common-config/base_web';
  }
}

server {
  listen 80;
  server_name api.awesome-conferences.com;

  location / {
    include 'common-config/base_api';

  add_header 'Access-Control-Allow-Origin' 'http://www.awesome-conferences.com';
  add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, DELETE, PUT';
  add_header 'Access-Control-Allow-Credentials' 'true';
  add_header 'Access-Control-Allow-Headers' 'User-Agent,Keep-Alive,Content-Type';

    if ($request_method = OPTIONS) {
      return 204;
    }
 }
}

server {
  listen 80;
  server_name awesome-conferences.com;
  return 301 http://www.awesome-conferences.com$request_uri;
}

server {
  listen 80;
  server_name *.awesome-conferences.com;
  error_page 404 /404.html;

  location /404.html {
    root /home/web/app/error;
    internal;
  }

  return 301 http://www.awesome-conferences.com/404.html;
}
