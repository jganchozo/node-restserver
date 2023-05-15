const { Schema, model } = require('mongoose');

const roleSchema = ({
    role: {
        type: String,
        required: [true, 'Role is required']
    }
});

module.exports = model('Role', roleSchema);