create table student
(
   id NUMBER not null,
   name varchar(255) not null,
   passport_number varchar(255) not null,
   primary key(id)
);

create table usuario
(
   id NUMBER not null,
   username varchar(255) not null,
   password varchar(255) not null,
   primary key(id)
);

create table USERS
(
   id NUMBER not null,
   username varchar(255) not null,
   password varchar(255) not null,
   first_name varchar(255) not null,
   last_name varchar(255) not null,
   email varchar(255) not null,
   phone_number varchar(255) not null,
   enabled BOOLEAN not null,
   last_password_reset_date DATE,
   primary key(id)
);

create table AUTHORITY (
   id NUMBER not null,
   name varchar(255) not null,
   primary key(id)
);

create table USER_AUTHORITY (
   user_id NUMBER not null,
   authority_id NUMBER not null,
   PRIMARY key(user_id,authority_id)
);

