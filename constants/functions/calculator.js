const Discord = require("discord.js");

const rows = [new Discord.MessageActionRow(), new Discord.MessageActionRow(), new Discord.MessageActionRow(), new Discord.MessageActionRow(), new Discord.MessageActionRow()];
let j = 0
let arr = ['ans', '(', ')', 'AC', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+']
for(const row of rows) {
  for(let i = 0; i < 4; i++) {
    row.components.push(new Discord.MessageButton().setStyle(getStyle(arr[j])).setLabel(arr[j]).setCustomId(arr[j]))
    j++
  }
}

function getStyle(input) {
  if(['ans', '(', ')', 'AC', '/', '*', '-', '+'].includes(input)) {
    return "PRIMARY"
  } else if(input === '=') {
    return "SUCCESS"
  } else {
    return "SECONDARY"
  }
}

function calculate(id, str, ans) {
  str = str ? str : "";
  ans = ans ? ans : "";

  if (id === "AC") {
    return { str: null, ans: null };
  } else if (id === "=") {
    try {
      ans = parse(str)
      str = parse(str)
    } catch (e) {
      return { str: null, ans: null }
    }
    return { str: `${str}`, ans: `${ans}` };
  } else if (id === "ans") {
    return { str: `${(str += ans)}`, ans: `${ans}` };
  } else {
    return { str: `${(str += id)}`, ans: `${ans}` };
  }
}

function parse(str) {
  return Function(`'use strict'; return (${str})`)();
}

function checkRows(rows, ans) {
  if(ans === null || ans === '') {
    rows[0].components[0].disabled = true
  } else {
    rows[0].components[0].disabled = false
  }
  return rows
}

module.exports = { rows, calculate, checkRows };
