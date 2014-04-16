/* GET users listing. */
exports.list = function(req, res){
  res.send('respond with a resource');
};
exports.getUserById = function(req, res) {
	var uid =  req.params.uid;
	var result = {'code':0,'msg':'查询用户失败！'};
	req.models.user.get(uid, function(err, user){
			if (err) {
				res.json(result);
			return;
			}
			if (user) {
				var result = {'code':1,'data':user};
				res.json(result);
			} else {
				res.json(result);
			}
			});

}
