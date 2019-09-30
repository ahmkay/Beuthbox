const path = require('path');

const config = {
    image: {
        path: (path.join(__dirname, 'default-image.png')),
        filename: "default-image.png",
        originalname: "default-image.png"
    },
    icon: {
        path: (path.join(__dirname, 'default-icon.png')),
        filename: "default-icon.png",
        originalname: "default-icon.png"
    }
};

module.exports = config;