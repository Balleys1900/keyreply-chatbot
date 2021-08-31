const storage = require('node-sessionstorage');

function setUserStatus(req, res, next) {
  const userPrevStatus = storage.getItem(req.user.id);

  if (req.body.currentNode.event === 'capture') {
    storage.setItem(req.user.id, {
      ...userPrevStatus,
      next: req.body.currentNode.data.next,
      [req.body.currentNode.data.key]: req.body.currentNode.data.value,
    });
  } else {
    storage.setItem(req.user.id, {
      ...userPrevStatus,
      next: req.body.currentNode.data,
    });
  }

  next();
}

exports.setUserStatus = setUserStatus;
