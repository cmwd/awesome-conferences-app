server {
  listen 80;
  server_name www.awesome-conferences.com;
  access_log /var/log/nginx/awesome_conferences_app.log;
  charset utf-8;
  error_page 404 /404.html;
  error_page 500 502 503 504 /50x.html;

  location /404.html {
    root /usr/src/web/error;
    internal;
  }

  location /50x.html {
    root /usr/src/web/error;
    internal;
  }

  location /public/ {
    root /usr/src/web;
    index index.html index.htm;
  }

  location / {
    include 'common_config/base_web';
  }
}

server {
  listen 80;
  server_name api.awesome-conferences.com;

  if ($http_origin ~* (.*\.awesome-conferences.com)) {
    set $cors "true";
  }

  location / {
    include 'common_config/base_api';

    if ($cors = "true") {
      add_header 'Access-Control-Allow-Origin' '$http_origin';
      add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, DELETE, PUT';
      add_header 'Access-Control-Allow-Credentials' 'true';
      add_header 'Access-Control-Allow-Headers' 'User-Agent,Keep-Alive,Content-Type';
    }

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
    root /usr/src/web/error;
    internal;
  }

  return 301 http://www.awesome-conferences.com/404.html;
}
