// document.querySelector('p').innerHTML = document.queryCommandSupported('copy') ? '支持' : '不支持';


// let db = openDatabase('db_logs', '1.0', 'test db', 1024 * 1024 * 2, () => {console.log('db_logs created !')});
// db.transaction(tx => {
//     tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
//     tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "msg1")');
//     tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "msg2")');
//     tx.executeSql('INSERT INTO LOGS (id, log) VALUES (?, ?)', [3, 'msg3']);
// });
//
// db.transaction(tx => {
//     tx.executeSql('SELECT * FROM LOGS', [], (tx, results) => {
//         console.log(results)
//     })
// })


// let arr1 = ['a', 'b', 'c'];
// let arr2 = [1, 2, 3];
// for1:
// for(let i of arr1){
//     for(let j of arr2){
//         console.log(`${i} - ${j}`)
//         if(j === 2){
//             break for1
//         }
//     }
// }

document.querySelector('.show-msg').textContent = navigator.userAgent

// just unicode
console.log('\u54e6')
// emoji unicode  \u1F601 => \uD83D\uDE01
// console.log('\u1F601')
console.log('\uD83D\uDE01')

//emoji 0 ~ 9
console.log('\u0030\u20E3')
console.log('\u0031\u20E3')
console.log('\u0032\u20E3')
console.log('\u0033\u20E3')
console.log('\u0034\u20E3')
console.log('\u0035\u20E3')
console.log('\u0036\u20E3')
console.log('\u0037\u20E3')
console.log('\u0038\u20E3')
console.log('\u0039\u20E3')

console.log('==============================')
let str = '4⃣'
console.log(str.charCodeAt(0).toString(16))
console.log(str.charCodeAt(1).toString(16))

