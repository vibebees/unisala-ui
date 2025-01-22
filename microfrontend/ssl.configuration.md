    copy certificate to server

    scp -i test.script.07.pem /Users/prashantbasnet/Downloads/unisala.com/* ec2-user@18.188.134.32:/home/ec2-user/

cat SSL_DV_IntermediateCA_2.crt SSL_DV_IntermediateCA_3.crt SSL_DV_CertificateAuthorityRoot.crt > /etc/nginx/ssl/unisala_com_chain.crt

cat UNISALA.COM.crt > /etc/nginx/ssl/UNISALA.COM.crt


   listen 443 ssl;
    server_name test.unisala.com;

    ssl_certificate /etc/ssl/unisala/UNISALA.COM.crt;
    ssl_certificate_key /etc/ssl/unisala/UNISALA.COM.key;  # Ensure you have the private key file
    ssl_trusted_certificate /etc/ssl/unisala/SSL_DV_CertificateAuthorityRoot.crt;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";
    ssl_ecdh_curve secp384r1;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;