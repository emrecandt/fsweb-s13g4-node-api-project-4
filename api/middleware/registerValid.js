const registerValidation = (req, res, next) => {
    const { kullaniciadi, sifre } = req.body;
    if (!kullaniciadi || !sifre) {
        return res.status(400).json({ message: "Eksik bilgi" })
    }
    next();
}

module.exports = { registerValidation };