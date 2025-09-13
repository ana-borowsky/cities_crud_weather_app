CREATE DATABASE cities;

USE cities;

CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(255),
    coord_lon NUMERIC,
    coord_lat NUMERIC,
    timezone_seconds INTEGER
);

INSERT INTO cities (name, country, coord_lon, coord_lat, timezone_seconds) VALUES
('New York', 'US', -74.0060, 40.7143, -14400),
('London', 'GB', -0.1257, 51.5085, 3600),
('Tokyo', 'JP', 139.6917, 35.6895, 32400),
('Paris', 'FR', 2.3488, 48.8534, 7200),
('Sydney', 'AU', 151.2071, -33.8679, 36000),
('Dubai', 'AE', 55.2708, 25.2694, 14400),
('Moscow', 'RU', 37.6156, 55.7522, 10800),
('Beijing', 'CN', 116.3972, 39.9075, 28800),
('Rome', 'IT', 12.4829, 41.8947, 7200),
('Brasília', 'BR', -47.8825, -15.7797, -10800),
('São Paulo', 'BR', -46.6333, -23.5505, -10800),
('Rio de Janeiro', 'BR', -43.1729, -22.9068, -10800),
('Salvador', 'BR', -38.5108, -12.9711, -10800),
('Belo Horizonte', 'BR', -43.9352, -19.9208, -10800),
('Fortaleza', 'BR', -38.5247, -3.7172, -10800),
('Manaus', 'BR', -60.0217, -3.1071, -14400),
('Curitiba', 'BR', -49.273, -25.429, -10800),
('Recife', 'BR', -34.8809, -8.0539, -10800),
('Porto Alegre', 'BR', -51.23, -30.033, -10800),
('Belém', 'BR', -48.4907, -1.4558, -10800),
('Goiânia', 'BR', -49.2644, -16.6786, -10800),
('Campinas', 'BR', -47.0608, -22.9056, -10800),
('Santos', 'BR', -46.3311, -23.9608, -10800),
('Vitória', 'BR', -40.3344, -20.3197, -10800),
('Florianópolis', 'BR', -48.548, -27.5935, -10800),
('Maceió', 'BR', -35.7353, -9.6658, -10800),
('Cuiabá', 'BR', -56.0967, -15.5961, -14400),
('Teresina', 'BR', -42.8028, -5.0919, -10800),
('João Pessoa', 'BR', -34.8809, -7.1192, -10800),
('Campo Grande', 'BR', -54.6206, -20.4428, -14400),
('Natal', 'BR', -35.2094, -5.7947, -10800),
('Aracaju', 'BR', -37.0497, -10.9472, -10800),
('Palmas', 'BR', -48.3323, -10.2125, -10800),
('Porto Velho', 'BR', -63.9039, -8.7619, -14400),
('Macapá', 'BR', -51.0594, 0.0389, -10800),
('Rio Branco', 'BR', -67.8037, -9.974, -18000),
('Boa Vista', 'BR', -60.6733, 2.8197, -14400),
('São Luís', 'BR', -44.3013, -2.532, -10800);
