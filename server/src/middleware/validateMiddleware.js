const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error) {
        if (error.issues) { // Zod error
            const errorMessage = error.issues.map((issue) => issue.message).join(', ');
            res.status(400);
            next(new Error(errorMessage));
        } else {
            next(error);
        }
    }
};

module.exports = validate;
