
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Turn On My LED' });
};