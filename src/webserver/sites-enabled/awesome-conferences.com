#server {
  #listen 80;
  #server_name www.awesome-conferences.com;
  #access_log /var/log/nginx/awesome_conferences_production.log;
  #charset utf-8;
  #error_page 404 /404.html;
  #error_page 500 502 503 504 /50x.html;

  #location /404.html {
    #root /var/www/web/error;
    #internal;
  #}

  #location /50x.html {
    #root /var/www/web/error;
    #internal;
  #}
#}

server {
  listen 80;
  server_name editor.awesome-conferences.com;
  access_log /var/log/nginx/awesome_conferences_production.log;
  charset utf-8;
  error_page 404 /404.html;
  error_page 500 502 503 504 /50x.html;

  location /404.html {
    root /var/www/web/error;
    internal;
  }

  location /50x.html {
    root /var/www/web/error;
    internal;
  }

  location / {
    auth_basic "Restricted";
    auth_basic_user_file /etc/nginx/sites-enabled/.htpasswd;
    root /var/www/editor/build/;
    index index.htm index.html;
  }
}

server {
  listen 80;
  server_name api.awesome-conferences.com;

  location / {
    include 'common-config/base_api';

    add_header 'Access-Control-Allow-Origin' 'http://www.awesome-conferences.com';

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
    root /var/www/web/error;
    internal;
  }

  return 301 http://www.awesome-conferences.com/404.html;
}
