const path = require('path');

const config = {
    image: {
        path: (path.join(__dirname, 'category-image.jpeg')),
        filename: "category-image.jpeg"
    },
    icon: {
        path: (path.join(__dirname, 'category-icon.jpeg')),
        filename: "category-icon.jpeg"
    }
};

module.exports = config;