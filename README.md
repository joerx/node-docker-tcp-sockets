# Node TCP Sockets & Linked Docker Containers

How to connect two node apps in a docker container via a TCP socket.

Build and start the server:

```sh 
$ docker build -t net/server server/
$ docker run -d -P net/server 
```

Connect via telnet should work. Using `192.168.99.100` as example when using Docker Machine (use
`docker-machine ip default` to get IP)

```sh
$ docker port net-server
4000/tcp -> 0.0.0.0:32771

$ telnet 192.168.99.100 32771
Trying 192.168.99.100...
Connected to 192.168.99.100.
Escape character is '^]'.
```

Type 'hello' into the command prompt and see the server reply. Use `Ctrl+]` and then `q` to 
terminate the telnet session. 

Build and run the client:

```sh
$ docker build -t net/client client/
$ docker run -it --link net-server --name net-client -v `pwd`/client:/src --rm net/client
connecting ...
Client connected to tcp://172.17.0.12:4000
Echo {"message":"hello!"}
```

Use `Ctrl+C` to disconnect from the client.
