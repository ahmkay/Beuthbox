const channelController = require('./../controllers/channel.controller');

module.exports = function (app) {
    app.get("/channel", channelController.getIndex);

    app.get("/channel/:id", channelController.getById);

    app.get("/channel/:id/live", channelController.getLive);

    app.post("/channel/:id/livepassword", channelController.checkLivePassword);
    app.get("/channel/:id/livepassword", function (req, res, next) {
        res.redirect(`/channel/${req.params.id}/live`)
    })
};
