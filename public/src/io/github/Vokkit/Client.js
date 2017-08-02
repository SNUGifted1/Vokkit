var LoginManager = require("./manager/LoginManager.js");
var MoveManager = require("./manager/MoveManager.js");
var WorldManager = require("./manager/WorldManager.js");
var PlayerManager = require("./manager/PlayerManager.js");
var SceneManager = require("./manager/SceneManager.js");
var InputManager = require("./manager/InputManager.js");
var BlockTextureManager = require("./manager/BlockTextureManager.js");
var WebVRManager = require("./manager/WebVRManager.js");

/**@type {SocketIO.Server} */
var socket = io();
var loginManager;
var moveManager;
var worldManager;
var playerManager;
var sceneManager;
var inputManager;
var playerBodyManager;
var blockTextureManager;
var webvrmanager;

function Client(){
    var worldList = [];
    var playerList = [];
    var client = this;
    var logined = false;
    this.loginInit = function(){
        loginManager = new LoginManager();
        blockTextureManager = new BlockTextureManager();
        moveManager = new MoveManager();
        worldManager = new WorldManager();
        playerManager = new PlayerManager();
        playerManager.init();
        sceneManager = new SceneManager();
        sceneManager.loginInit();
        inputManager = new InputManager();
        webvrmanager = new WebVRManager();
        loginManager.onLogin = function(){
            logined = true;
            client.init();
            document.getElementById("login").style.display = 'none';
            document.getElementById("cross").style.display = 'block';
        }
        loginManager.init();
    }
    this.init = function(){
        moveManager.init();
        blockTextureManager.init();
        webvrmanager.init();
        sceneManager.init();
        worldManager.init();
        sceneManager.drawWorld(worldList[0]);
        inputManager.init();
        sceneManager.start();
    }
    this.getLoginManager = function(){
        return loginManager;
    }
    this.getMoveManager = function(){
        return moveManager;
    }
    this.getWorldManager = function(){
        return worldManager;
    }
    this.getPlayerManager = function(){
        return playerManager;
    }
    this.getSceneManager = function(){
        return sceneManager;
    }
    this.getInputManager = function(){
        return inputManager;
    }
    this.getBlockTextureManager = function(){
        return blockTextureManager;
    }
    this.getSocket = function(){
        return socket;
    }
    this.getWebVRManager = function() {
        return webvrmanager;
    }
    this.getWorld = function(worldName) {
        for (var i in worldList) {
            if (worldList[i].getWorldName() == worldName) {
                return worldList[i];
            }
        }
        return null;
    }
    this.getWorlds = function(){
        return worldList.slice();
    }
    this.addWorld = function(world) {
        worldList.push(world);
    }
    this.getPlayer = function(name){
        for (var i in playerList) {
            if (playerList[i].getName() == name) {
                return playerList[i];
            }
        }
    }
    this.getOnlinePlayers = function(name){
        return playerList.slice();
    }
    this.addPlayer = function(player){
        for (var i in playerList) {
            if (playerList[i].getId() == player.getId()) {
                return;
            }
        }
        playerList.push(player);
    }
    this.removePlayer = function(id) {
        for (var i in playerList) {
            if (playerList[i].getId() == id) {
                playerList.splice(i, 1);
                return;
            }
        }
    }
    this.getLocalPlayer = function(){
        for (var i in playerList) {
            if (playerList[i].isLocalPlayer) {
                return playerList[i];
            }
        }
    }
}

module.exports = Client;