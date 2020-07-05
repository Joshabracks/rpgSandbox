module.exports = {
    model: {
        group: "map",
        name: {
            type: "string",
            min: 0,
            max: 40,
        },
        descrption: {
            type: "string",
        },
        author: {
            type: "ManyToOne",
            group: "user",
            required: true,
        },
        body: {
            type: "object"
        },
        form: {
            type: "string",
        }
    }
}