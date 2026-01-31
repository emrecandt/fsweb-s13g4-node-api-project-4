const express = require("express");
const server = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { registerValidation } = require("./middleware/registerValid");
const users = [];
server.use(cors());
server.use(express.json());

server.get("/api/kullanicilar", (req, res) => {
    res.status(200).json(users);
});
server.post("/api/kayitol", registerValidation, async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.sifre, saltRounds)
    const user = {
        kullaniciadi: req.body.kullaniciadi,
        sifre: hashedPassword
    }
    users.push(user);
    res.status(201).json(user)
});
server.post("/api/giris", async (req, res) => {
    const { kullaniciadi, sifre } = req.body;
    const user = users.find((person) => person.kullaniciadi === kullaniciadi);
    if (user) {
        const isMatch = await bcrypt.compare(sifre, user.sifre)
        if (isMatch) { res.status(200).json({ message: "Hoşgeldin" }) } else {
            res.status(401).json({ error: "şifre hatalı" })
        }


    } else {
        res.status(401).json({ error: "Kullanıcı adı hatalı" })
    }
})
module.exports = server;