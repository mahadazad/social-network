FROM ubuntu:17.10
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && \
    apt-get -y install build-essential curl git ffmpeg php php-fpm php-mysql php-mcrypt php-gd php-mbstring \
                       php-dom php-zip

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

RUN export NVM_DIR="$HOME/.nvm" && \
     [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

RUN sed -i 's/;daemonize = yes/daemonize = no/' /etc/php/7.1/fpm/php-fpm.conf

RUN sed -i '/^listen /c listen = 0.0.0.0:9000' /etc/php/7.1/fpm/pool.d/www.conf

RUN sed -i 's/^listen.allowed_clients/;listen.allowed_clients/' /etc/php/7.1/fpm/pool.d/www.conf

RUN curl https://www.imagemagick.org/download/ImageMagick.tar.gz -o ImageMagick.tar.gz && \
    tar xvzf ImageMagick.tar.gz && \
    cd ImageMagick-* && \
    ./configure && \
    make && \
    make install && \
    ldconfig /usr/local/lib

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');" && \
    mv composer.phar /usr/bin/composer

RUN mkdir /run/php

WORKDIR /var/www

EXPOSE 9000

ENTRYPOINT ["php-fpm7.1"]