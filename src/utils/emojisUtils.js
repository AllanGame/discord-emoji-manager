const regex = new RegExp(/[^<]{0,1}:(\w{2,32}):(?!\d{18}>)/g)

function stringHasEmoji(str) {
  return regex.test(str)
}

function getEmojis(str) {
  let i = 0;
  let emojis = new Map();

  for (let x of str.matchAll(regex)) {
    console.log(x)
    emojis.set(i, x)
    i++
  }
  return emojis
}

exports.stringHasEmoji = stringHasEmoji;
exports.getEmojis = getEmojis;