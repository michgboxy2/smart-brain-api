BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Jessie', 'jessie@gmail.com', 5, '2019-01-01');
INSERT into login(hash, email) values ('$2a$10$Qyyt6Qj29udAvURPQucPSeoBXzoIs.t20z.jUreXFluHLzmL/FuWW', 'm2@gmail.com');

COMMIT;