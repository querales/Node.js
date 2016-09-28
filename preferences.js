/**
 * Created by gabriella.querales on 12/30/15.
 */

exports.favActors = function (subscriber)
{
    console.log ("favActors...... 4 - long query")
    dummy = [];
    var now = Date.now(), then = now;
    while (then - now < 5000) {
        then = Date.now();
        dummy.push(0);
        if (dummy.length > 100) {
            dummy.splice(0, 10);
        }
    }
    console.log('terminated');
}
