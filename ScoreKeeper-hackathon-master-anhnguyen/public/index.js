$(document).ready(function () {
    $('#addRoundBtn').on("click", function () {
        console.log("addRoundBtn clicked");
        let isEmptyName = false;
        let i = 0;
        let playerNameArr = [];
        $('.playername').each(function () {
            if ($(this).val()) {
                playerNameArr.push($(this).val())
                console.log('player name [' + i + ']: ' + $(this).val());
            } else {
                console.log('player name [' + i + ']: empty!!!');
                isEmptyName = true;
                return false;
            }
            i++;
        })
        if (isEmptyName) {
            alert('Missing players\' name');
        } else {
            console.log(playerNameArr)
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/game",
                data: {
                    "playerName": JSON.stringify(playerNameArr)
                },
                success: function (data, msg) {
                    window.location = './game.html'
                    console.log(msg + ' ' + JSON.stringify(data))
                },
                error: function (msg) {
                    console.log('error')
                },
            })
        }
    })
});