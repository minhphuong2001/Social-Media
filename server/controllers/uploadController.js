exports.upload = (req, res, next) => {
    try {
        res.send("Upload successfully");
    } catch (error) {
        res.send("Error", error.message);
    }
}