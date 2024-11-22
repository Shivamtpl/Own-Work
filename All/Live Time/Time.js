function ShowTime()
{
    document.getElementById('currentTime').innerHTML = new Date().toUTCString();
}
ShowTime();
setInterval (function ()
{
    ShowTime();
}, 1000)