import request from '../utils/request';

//Create User
export function checkLogin(options) {
  return request({
    url: 'v1/login',
    method: 'POST',
    ...options
  });
}

// Get Chat Node
export function getNode(data, options) {
  return request({
    url: 'v1/chatbot/navigateNode',
    method: 'POST',
    data,
    ...options
  });
}

export function getNodeStart(options) {
  return request({
    url: 'v1/chatbot/start',
    method: 'GET',
    ...options
  });
}

export function storeChatLog(data, options) {
  return request({
    url: 'v1/chatbot/history',
    method: 'POST',
    data,
    ...options
  });
}
export function getChatLog(options) {
  return request({
    url: 'v1/chatbot/history',
    method: 'GET',
    ...options
  });
}

export function getNodeText(data, options) {
  return request({
    url: 'v1/chatbot/command',
    method: 'POST',
    data,
    ...options
  });
}
