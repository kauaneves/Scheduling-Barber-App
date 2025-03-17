const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3000;
const pool = require("./db");

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
const SECRET_KEY =
  "6fd9ab28c6b7d90b251cc58e88acdf957062bc2c2f2f45bde0b46ec745f6ef91";

async function getUsers(email, password) {
  try {
    const res = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (res.rows.length === 0) {
      return false;
    }
    if (password.length === 0) {
      return false;
    }

    const isMatch = await new Promise((resolve, reject) => {
      bcrypt.compare(password, res.rows[0].password_hash, (err, isMatch) => {
        if (err) {
          reject(err);
        } else {
          resolve(isMatch);
        }
      });
    });

    if (isMatch) {
      return res.rows[0];
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function getEmployee() {
  try {
    const res = await pool.query("SELECT * FROM employees");
    return res.rows;
  } catch (err) {
    console.error(err);
  }
}

async function getServices() {
  try {
    const res = await pool.query("SELECT * FROM services");
    return res.rows;
  } catch (err) {
    console.error(err);
  }
}

async function getServicesSpecify(id) {
  try {
    const res = await pool.query(`
      SELECT s.id, s.name, s.description, s.price, s.duration
      FROM employee_services es
      JOIN services s ON es.service_id = s.id
      WHERE es.employee_id = ${id};
`);
    return res.rows;
  } catch (err) {
    console.error(err);
  }
}

async function getAppointments() {
  try {
    const res = await pool.query("SELECT * FROM appointments");
    return res.rows;
  } catch (err) {
    console.error(err);
  }
}

async function registerUser(name, email, password, phone) {
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  try {
    await pool.query(
      `INSERT INTO users (name, email, password_hash, phone) VALUES ($1, $2, $3, $4)`,
      [name, email, password_hash, phone]
    );
  } catch (err) {
    console.error(err);
  }
}

async function registerEmployee(name, phone) {
  try {
    await pool.query(`INSERT INTO employee ("name", "phone") VALUES ($1, $2)`, [
      name,
      phone,
    ]);
  } catch (err) {
    console.error(err);
  }
}

async function registerService(name, description, price) {
  try {
    await pool.query(
      `INSERT INTO services ("name", "description", "price") VALUES ($1, $2, $3)`,
      [name, description, price]
    );
  } catch (err) {
    console.error(err);
  }
}

async function registerAppointments(
  user_id,
  service_id,
  employee_id,
  appointment_time
) {
  try {
    await pool.query(
      `INSERT INTO appointments (user_id, service_id, employee_id, appointment_time) 
       VALUES ($1, $2, $3, $4)`,
      [user_id, service_id, employee_id, appointment_time]
    );
  } catch (err) {
    console.error(err);
  }
}

app.get("/", async (req, res) => {
  res.json("API desenvolvida por Kauã Neves");
});

app.post("/getUser", async (req, res) => {
  const { email, password } = req.body;
  const user = await getUsers(email, password);
  console.log(user.id);
  if (user) {
    const token = jwt.sign(
      {
        phone: user.phone,
        email: user.email,
        name: user.name,
        user_id: user.id,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000, // 1 hora
    });

    res.status(200).json({ status: true, message: "Login Bem Sucedido" });
  } else {
    res
      .status(400)
      .json({ status: false, message: "Usuário ou senha inválidos" });
  }
});

app.get("/getEmployees", async (req, res) => {
  const employee = await getEmployee();
  res.json(employee);
});

app.get("/getServices", async (req, res) => {
  const services = await getServices();
  res.json(services);
});

app.post("/getServicesSpecify", async (req, res) => {
  const { id } = req.body;
  const services = await getServicesSpecify(id);
  res.json(services);
});

app.get("/getAppointments", async (req, res) => {
  const services = await getAppointments();
  res.json(services);
});

app.post("/registerUser", async (req, res) => {
  const { name, email, password, phone } = req.body;
  await registerUser(name, email, password, phone);
  res
    .status(201)
    .send(
      `User is register on the system, ${name} número de telefone é ${phone}`
    );
});

app.post("/registerEmployee", async (req, res) => {
  const { name, phone } = req.body;
  await registerService(name, phone);
  res
    .status(201)
    .send(`Employee is register on the system, ${name} com o número ${phone}`);
});

app.post("/registerService", async (req, res) => {
  const { name, description, price } = req.body;
  await registerService(name, description, price);
  res
    .status(201)
    .send(
      `Service is register on the system, ${name} com a descrição ${description} com o preço de R$${price}`
    );
});

app.post("/registerAppointment", async (req, res) => {
  const { user_id, service_id, employee_id, appointment_time } = req.body;
  await registerAppointments(
    user_id,
    service_id,
    employee_id,
    appointment_time
  );
  res.status(201).send(`Agendamento Realizado.`);
});

app.get("/verifyToken", (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1]; // Cookie ou header Authorization
  if (!token) {
    return res
      .status(401)
      .json({ loggedIn: false, message: "Token necessário." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ loggedIn: false, message: err });
    }
    req.user = decoded;
    res.status(200).json({ loggedIn: true, user: req.user });
    next();
  });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logout realizado com sucesso" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
