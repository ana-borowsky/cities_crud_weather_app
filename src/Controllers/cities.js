import { db } from "../db.js";

export const getCities = (_, res) => {
  const q = "SELECT * FROM cities";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const addCity = (req, res) => {
  const q = "INSERT INTO cities (`name`, `country`, `coord_lon`, `coord_lat`, `timezone_seconds`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.country,
    req.body.coord_lon,
    req.body.coord_lat,
    req.body.timezone_seconds,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("City created succesfully.");
  });
};

export const updateCity = (req, res) => {
  const q =
    "UPDATE cities SET `name` = ?, `country` = ?, `coord_lon` = ?, `coord_lat` = ?, `timezone_seconds` = ? WHERE `id` = ?";

  const values = [
    req.body.name,
    req.body.country,
    req.body.coord_lon,
    req.body.coord_lat,
    req.body.timezone_seconds,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("City updated successfuly.");
  });
};

export const deleteCity = (req, res) => {
  const q = "DELETE FROM cities WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("City deleted successfully.");
  });
};
