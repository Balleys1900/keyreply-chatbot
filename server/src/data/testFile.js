const data = require('./chatbot.json').content;
let nodeConditionArr = {};

let matchNode;

/**
 * lang = vi
 * item
 *
 */
// const userStatus = sessionStorage.getItem(user.id);
const userStatus = {
  language_select: 'vi',
  item_select: '3',
};

for (const node in data) {
  let temp = true;
  if (data[node].id === 'show_item') {
    const condition = data[node].condition;
    condition.forEach(cond => {
      if (userStatus[cond.property] !== cond.value) {
        temp = false; //false
      }
    });
    if (temp) matchNode = data[node];
  }
}

// nodeConditionArr.forEach(node => console.log(node));
console.log({ matchNode });
