FROM node:latest
RUN npm install -g pnpm
RUN apt update && apt-get install -y locales
RUN echo 'ru_RU.UTF-8 UTF-8' >> /etc/locale.gen \
      && echo 'en_US.UTF-8 UTF-8' >> /etc/locale.gen \
      && locale-gen \
