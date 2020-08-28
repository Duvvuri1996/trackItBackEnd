<script>
var today = new Date()
var tomorrow = new Date("August 27, 2020 21:50:00")
alert(today);
alert(tomorrow);
function d (d1, d2) {
return Math.round((d2-d1)/(1000*60*60*24))
}
if(today.getDate() < tomorrow.getDate()) {
var diff = d(today, tomorrow)
var diff1 = diff+1
alert(diff1+" date is called")
} else if(today.getDate() == tomorrow.getDate()) {
var time1 = today.getHours()
var time2 = tomorrow.getHours()
if(time2 > time1) {
var h = time2 - time1
var hours = h+1
alert(hours+" hours is called")

} else if(time1 == time2) {
var minute1 = today.getMinutes()
var minute2 = tomorrow.getMinutes()
var minutes = minute2 - minute1
alert(minutes+" minutes is called")
}
} else {
alert("0 hours")
}
</script>
