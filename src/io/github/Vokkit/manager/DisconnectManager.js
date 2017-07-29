var Logger = new (require("../Logger.js"))();

var PlayerQuitEvent = require("../event/player/PlayerQuitEvent.js");

function DisconnectManager() {
    this.getListener = function (socket) {
        return function (data) {
            var player = Vokkit.getServer().getPlayerById(socket.id);
            var playerList = Vokkit.getServer().getOnlinePlayers();
            if (player !== undefined) {
                for (var i in playerList) {
                    if (playerList[i].equals(player)) {
                        var playerQuitEvent = new PlayerQuitEvent(player, "%s님이 게임을 떠났습니다.");
                        Vokkit.getServer().getPluginManager().makeEvent(playerQuitEvent);
                        Vokkit.getServer().removePlayer(player);
                        var address = socket.request.connection._peername;
                        Logger.info(player.getName() + "[" + address.address + ":" + address.port + "] 이가 로그아웃 했습니다.");
                        Vokkit.getServer().getSocketServer().emit("playerQuit", {
                            id: player.getId()
                        });
                        return;
                    }
                }
            }
        }
    }
}

module.exports = DisconnectManager;