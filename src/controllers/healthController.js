class Health {
    async healthCheck(req, res) {
        return res.status(200).json({ message: "Health check ok" })
    };
}

module.exports = Health;