function PlayerMoveEvent(player, from, to) {
    var cancelled = false;

    this.setCancelled = function(cancel) {
        if (cancel == undefined) cancelled = true;
        else {
            cancelled = !!cancel;
        }
    }
    
    this.isCancelled = function() {
        return cancelled;
    }

    this.getPlayer = function() {
        return player;
    }

    this.getFrom = function() {
        return from;
    }

    this.setFrom = function(f) {
        from = f;
    }

    this.getTo = function() {
        return to;
    }

    this.setTo = function(t) {
        to = t;
    }
    
    this.getName = function() {
        return "PlayerMoveEvent";
    }
}

module.exports = PlayerMoveEvent;