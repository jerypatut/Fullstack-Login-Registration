import express from 'express'; // ini menggunakan esmodules 
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

const salt = 10;
const app = express();
dotenv.config ();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(cookieParser());

// Koneksi ke database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    telephone:"",
    database: 'signup'
});
app.use(cors({
    origin: "http://localhost:5173", // Ubah sesuai dengan alamat frontend Anda
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/auth/google', (req, res) => {
    const redirectUri = "http://localhost:8082/auth/google/callback";
    const url = client.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],
        redirect_uri: redirectUri
    });
    res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    
    const jwtToken = jwt.sign({ email: payload.email }, "jwt-secret-key", { expiresIn: '1d' });
    res.cookie('token', jwtToken);
    
    // Redirect atau berikan respons sesuai kebutuhan
    res.json({ user: payload });
});

// Middleware untuk verifikasi user
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not authenticated" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token is not okey" });
            } else {
                req.name = decoded.name;
                next();
            }
        });
    }
};

// Rute untuk mendapatkan data user
app.get('/',verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name });
});

// Rute untuk registrasi
app.post('/register', (req, res) => {
    const sql = "INSERT INTO login (`name`,`email`,`telephone`,`password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error hashing password" });
        const values = [
            req.body.name,
            req.body.email,
            req.body.telephone,
            hash
        ];
        db.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: "Inserting data error in server" });
            return res.json({ Status: "Success" });
        });
    });
});

// Rute untuk login
app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Login error in server" });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password compare error" });
                if (response) {
                    const name = data[0].name;
                    const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({ Status: "Success" });
                } else {w
                    return res.json({ Error: "Password does not match" });
                }
            });
        } else {
            return res.json({ Error: "No email in database" });
        }
    });
});

app.post('/resetpassword', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM login WHERE email = ?";
    
    db.query(sql, [email], (err, result) => {
        if (err) return res.json({ Error: "Database error" });
        if (result.length === 0) return res.json({ Error: "Email not found" });

        const hashedPassword = bcrypt.hashSync(password, salt); // Hash the new password
        const sqlUpdate = "UPDATE login SET password = ? WHERE email = ?";
        
        db.query(sqlUpdate, [hashedPassword, email], (err) => {
            if (err) return res.json({ Error: "Error updating password" });
            return res.json({ Status: "Success" });
        });
    });
});
  


// Rute untuk logout
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
});
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ status: "Logged out" });
});

// Menjalankan server

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});