var Logger = new (require("../Logger.js"))();
var Player = require("../Player.js");
var Location = require("../Location.js");

var PlayerLoginEvent = require("../event/player/PlayerLoginEvent.js");
var PlayerJoinEvent = require("../event/player/PlayerJoinEvent.js");

function LoginManager() {
    this.getListener = function (socket) {
        return function (data) {
            var player = new Player(data.name, new Location(Vokkit.getServer().getWorlds()[0], 0, 0, 0, 0, 0), new THREE.Vector3(0, 0, 0), socket);
            var playerLoginEvent = new PlayerLoginEvent(player);
            Vokkit.getServer().getPluginManager().makeEvent(playerLoginEvent);
            if (playerLoginEvent.isCancelled()) {
                socket.emit("loginResult", {
                    succeed: false,
                    reason: playerLoginEvent.getReason()
                });
                return;
            }
            var playerList = Vokkit.getServer().getOnlinePlayers();
            for (var i in playerList) {
                if (playerList[i].getName() == data.name) {
                    socket.emit("loginResult", {
                        succeed: false,
                        reason: "이름이 중복됩니다."
                    });
                    return;
                }
            }
            var sendPlayers = [];
            for (var i in playerList) {
                sendPlayers.push(playerList[i].toObject());
            }
            socket.emit("loginResult", {
                succeed: true,
                players: sendPlayers,
                worlds: Vokkit.getServer().getWorldManager().getWorldArray()
            });
            Vokkit.getServer().addPlayer(player);
            var address = socket.request.connection._peername;
            Logger.info(player.getName() + "[" + address.address + ":" + address.port + "] 이가 로그인 했습니다.");
            var playerJoinEvent = new PlayerJoinEvent(player);
            Vokkit.getServer().getPluginManager().makeEvent(playerJoinEvent);
            Vokkit.getServer().getSocketServer().emit("playerJoin", {
                name: player.getName(),
                x: 0,
                y: 0,
                z: 0,
                velocity: [0, 0, 0],
                yaw: 0,
                pitch: 0,
                id: player.getId(),
                worldName: Vokkit.getServer().getWorlds()[0].getWorldName()
            });
        }
    }
}

module.exports = LoginManager;