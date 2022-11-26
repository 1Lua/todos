Настройка.

- Установка СУБД MongoDB

`bash docker-compose up -d`

- Создание папки assets

`bash mkdir assets`
`bash cd assets`
`bash ssh-keygen -t rsa -b 4096 -m PEM -f private.key`
`bash openssl rsa -in private.key -pubout -outform PEM -out public.key`

- Запуск

`bash npm run start:dev`