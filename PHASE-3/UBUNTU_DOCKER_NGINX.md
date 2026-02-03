<!-- follow this tutu: https://www.youtube.com/watch?v=YkuhqIDUi2A -->

run and create a ubuntu env

docker run -it -p 8080:80 ubuntu

docker run → start NEW container
docker exec → enter EXISTING container

move to ubuntu directory : apt-get update // apt-get prefer for docker file

<!-- apt install ngnix -->

apt-get install nginx
ngnix -v
nginx -> optional (may be if not working.. )
see nginx is running on: : http://localhost:8080

<!-- you can see all the config file in etc/ngnix/nginx.conf -->
<!-- cd etc/nginx -->
<!-- to view this file you can use : cat nginx  -->

or install vim to edit the files

<!-- basic termology:  -->
<!-- ctrl + c  and them :wq to save and exit  -->
<!-- also nginx -t to check whether it is correct nginx.conf or not -->
<!-- nginx -s reload : to reload the nginx server -->
<!-- apt-get install vim:  -->
<!-- vim  -->

add the code :

<!-- now file name change to : nginx-1.conf -->
<!-- note nginx.conf take the configuration only thats why; -->

events {

}

http{
server{
listen 80 ;
server*name *;
location / {
return 200 "Hello from nginx"
}
}
}

<!-- ctrl + c and write :wq  -->
<!-- and take the exist  -->
<!-- don't forget to reload the nginx by : nginx -s reload   -->

and you can see your localhost:8080 : shows the result

<!-- level -2  -->
<!-- show and add the index.html file and style.css file : with nginx:  -->
<!-- create a folder website in which our page is loaded..  -->
<!-- index.html and style.css -->
<!-- add the config in the nginx.conf -->

events {

}

http{
server{
listen 80 ;
server*name *;

<!-- remvoe the location and add the root  -->
<!-- location / {
return 200 "Hello from nginx"
} -->

root /etc/nginx/websites
}
}

where in websites/index.html

<html>
    <head>
        <title> Abhay bansal </title>
    </head>
    <body>
        <div> Hello from Abhay Bansal </div>
    </body>
</html>

websites/index.html

<html>
    <head>
        <link> rel="stylesheet" href="style.css"</link>
        <title> Abhay bansal </title>
    </head>
    <body>
        <div> Hello from Abhay Bansal </div>
    </body>
</html>

websites/style.css
body{
background-color = #ff0000;
}

but when we call the index.html : shows the type of contne : text/html

<!-- but when we call to the style.css show text/plain  -->

so we have to add the type of the file and it is also have in the nginx by the name mime.types
we can add it by ? include /etc/nginx/mime.types;

<!-- now in the nginx.config  -->

<!-- nginx.conf -->

events {

}

http{
server{
include /etc/nginx/mime.types;

<!-- or we can mention by  -->

type{
text/css css;
text/html html;

}
listen 80 ;
server*name *;

root /etc/nginx/websites
}
}

type{
text/css css;
text/html html;

}

see in mime.types : we have this already in this ..


<!-- okay now move to the backend folder//  -->
<!-- install pm2 : gloabl: npm i -g pm2 -->


then: pm2 start src/index.ts

🟢 OPTION A (recommended): Use Docker (real-world way)

This is the correct fix and what companies actually do.

You run Bun like this:

Bun (single process)
↓
Docker container
↓
Nginx / Load balancer
↓
Multiple containers



<!-- 🟡 OPTION B: Use Node.js instead of Bun (for PM2 learning)

If your goal is only to learn PM2 mechanics:

node index.js
pm2 start index.js -i max
 -->


 
<!-- prefer : go with this https://www.geeksforgeeks.org/linux-unix/25-basic-ubuntu-commands/ -->

ubuntu basic command pwd : The pwd command is used to display the current working directory.
ls: list show
cd :

rm: remove files
rm [options] [file/directory]
Example:
rm new_file
cp: copy files -> cp [options] [source] [destination]
Example:
cp file.txt /home/sujal/localworkingDir/Dir1/

7. mv - Move
   The mv command is used to move files or directories. mv command is also used to rename the file.
   Syntax:
   mv [options] [source] [destination]
   Example:
   mv

cat - Concatenate and Display
The cat command is used to display the contents of a file.
Syntax:
cat [file]
Example:
cat newfile.txt

uname :
