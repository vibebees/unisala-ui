pm2 logs can grow up really quicly and can take all the space in the server.
so to prevent it we should always have


    pm2 install pm2-logrotate
    pm2 show pm2-logrotate


    pm2 set pm2-logrotate:max_size 10M
    pm2 set pm2-logrotate:retain 5
