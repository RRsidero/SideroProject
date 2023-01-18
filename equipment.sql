DROP SCHEMA IF EXISTS equipmentDB;
CREATE SCHEMA equipmentDB;
DROP TABLE IF EXISTS equipment;
CREATE TABLE equipment (
	item_id SERIAL PRIMARY KEY,
	category VARCHAR (255),
	make VARCHAR (25),
	model VARCHAR (255),
	serial_number  VARCHAR (255),
	status VARCHAR (255),
	staff VARCHAR (10)
);
INSERT INTO equipment (category, make, model, serial_number, status, staff)
VALUES ( 'Docking Station', null, null, null, 'Unavailable', 'Staff1');
INSERT INTO equipment (category, make, model, serial_number, status, staff)
VALUES ( 'Laptop', null, null, null, 'Available', null);
INSERT INTO equipment (category, make, model, serial_number, status, staff)
VALUES ( 'Monitor', null, null, null, 'Unavailable', 'Staff2');
INSERT INTO equipment (category, make, model, serial_number, status, staff)
VALUES ( 'Keyboard', null, null, null, 'Unavailable', 'Staff3');
INSERT INTO equipment (category, make, model, serial_number, status, staff)
VALUES ( 'Mouse', null, null, null, 'Available', null);
INSERT INTO equipment (category, make, model, serial_number, status, staff)
VALUES ( 'Charger', null, null, null, 'Unavailable', 'Staff4');
SELECT * FROM equipment;