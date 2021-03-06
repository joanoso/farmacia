
-- 123 es la clave
INSERT INTO USUARIO (id, username, password, first_name, last_name, email, phone_number, enabled, last_password_reset_date, id_sucursal) VALUES (1, 'central', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Usuario', 'Central', 'user@example.com', '+1234567890', true, null, 1);
INSERT INTO USUARIO (id, username, password, first_name, last_name, email, phone_number, enabled, last_password_reset_date, id_sucursal) VALUES (2, 'user2', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Usuario', 'Sucursal 2', 'user@example.com', '+1234567890', true, null, 2);
INSERT INTO USUARIO (id, username, password, first_name, last_name, email, phone_number, enabled, last_password_reset_date, id_sucursal) VALUES (3, 'admin', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Jing', 'Xiao', 'admin@example.com', '+0987654321', true, null, null);

INSERT INTO AUTHORITY (id, name) VALUES (1, 'ROLE_ADMIN');
INSERT INTO AUTHORITY (id, name) VALUES (2, 'ROLE_DIRECTOR_TECNICO');
INSERT INTO AUTHORITY (id, name) VALUES (3, 'ROLE_AUXILIAR_FARMACEUTICO');
INSERT INTO AUTHORITY (id, name) VALUES (4, 'ROLE_AUXILIAR');
INSERT INTO AUTHORITY (id, name) VALUES (5, 'JEFATURA_COMPRAS');

INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (1, 2);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (2, 2);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (3, 1);

INSERT INTO SUCURSAL (id, direccion, numero,nombre,localidad) VALUES (1,'Avenida los Alpes 2568',1,'Casa Central', 'Capital Federal');
INSERT INTO SUCURSAL (id, direccion, numero,nombre,localidad) VALUES (2,'Montes de Oca 2179',5,'Las Flores', 'Castelar');
INSERT INTO SUCURSAL (id, direccion, numero,nombre,localidad) VALUES (3,'Campichuelo 2446',7,'Los Remedios Locos', 'Merlo');

-- INSERT INTO Usuario (id,username, pas/sword) VALUES (1,'admin', '$2a$10$XURPShQNCsLjp1ESc2laoObo9QZDhxz73hJPaEv7/cBha4pk0AgP.');

INSERT INTO TIPO_REMITO (ID, DESCRIPCION) VALUES (1,'SIMPLE');
INSERT INTO TIPO_REMITO (ID, DESCRIPCION) VALUES (2,'COMPLEJO');

INSERT INTO ESTADO_REMITO (ID, DESCRIPCION) VALUES (1,'BORRADOR');
INSERT INTO ESTADO_REMITO (ID, DESCRIPCION) VALUES (2,'PENDIENTE');

INSERT INTO PRODUCTO (ID, DESCRIPCION, MARCA, MONODROGA) VALUES (1, 'Caja Verde', 'Duracel', 'xanax');
INSERT INTO PRODUCTO (ID, DESCRIPCION, MARCA, MONODROGA) VALUES (2, 'Caja Roja', 'Palo Santo', 'paracetamol');
