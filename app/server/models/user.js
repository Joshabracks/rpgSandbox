
module.exports = {
    model: {
        group: "user",
        name: {
            type: "string",
            required: true,
            min: 2,
            minError: "User Name must be at lest 2 characters long.",
            max: 16,
            maxError: "User Name cannot be longer than 16 characters",
            unique: true,
        },
        email: {
            type: "email",
            required: true,
            unique: true,
            min: 5,
            minError: "Email must be at least 6 characters long.",
            max: 40,
            maxError: "Email cannot be longer than 40 chacters."
        },
        password: {
            type: "string",
            crypt: true,
            min: 6,
            max: 42
        },
        status: {
            type: "string",
            required: true
        },
        friend: {
            type: "ManyToMany",
            group: "user"
        }
    }
}