function wrapAsync(fn){
  return function(req,res,next){
    fn(req,res,next).catch(next);
  }
}
// utils/wrapAsync.js
// module.exports = function wrapAsync(fn) {
//   return function (req, res, next) {
//     fn(req, res, next).catch(next);
//   };
// };


module.exports = function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};

