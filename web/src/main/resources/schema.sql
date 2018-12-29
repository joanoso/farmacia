create table student
(
   id NUMBER not null,
   name varchar(255) not null,
   passport_number varchar(255) not null,
   primary key(id)
);

--create table usuario
--(
--   id NUMBER not null,
--   username varchar(255) not null,
--   password varchar(255) not null,
--   primary key(id)
--);

create table USUARIO
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

create table SUCURSAL (
   id NUMBER not null,
   numero NUMBER not null,
   nombre varchar(255) not null,
   direccion varchar(255) not null,
   localidad varchar(255) not null,
   primary key(id)
);

create table PRODUCTO (
   id NUMBER not null,
   descripcion varchar(255) not null,
   marca varchar(255) not null,
   monodroga varchar(255) not null,
   primary key(id)
);


create table STOCK_SUCURSAL (
   idSucursal NUMBER not null,
   idProducto NUMBER not null,
   cantidad NUMBER not null,
   primary key(idSucursal,idProducto)
);

create table REMITO (
   id NUMBER not null,
   estado NUMBER not null,
   tipo NUMBER not null,
   sucursal_destino NUMBER not null,
   primary key(id)
);

create table DETALLE_REMITO (
   id NUMBER,
   producto_id NUMBER NOT NULL,
   cantidad NUMBER not null,
   primary key(id),
   CONSTRAINT detalle_producto FOREIGN KEY (producto_id) REFERENCES PRODUCTO (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE TIPO_REMITO (
  ID NUMBER,
  DESCRIPCION varchar(255) not null,
  primary key(ID)
);

CREATE TABLE ESTADO_REMITO (
  ID NUMBER,
  DESCRIPCION varchar(255) not null,
  primary key(ID)
);


