
pm2 flush

to check what taking space

df -h
 sudo du -h --max-depth=1 / | sort -h
 sudo du -h / --max-depth=1 | sort -hr | head -n 20
 sudo du -sh /home/* | sort -hr | head -n 20

 sudo du -sh /home/ec2-user/.* | sort -hr -> to reveal the hidden dir
  pm2 flush if pm2 logs are toking too much.