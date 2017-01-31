import Bookshelf from '../models/bookshelf';


export function isAdmin(req, res, next){
  if(!req.user){
   res.status(401).json({message: 'unauthorized'});
 }
 return req.user['roles'].some((v) => v === 'admin') ? next() : res.status(401).json({});
};

export function isBookshelfOwner(req, res, next){
  if (!req.params.id){
    return res.status(400).json({message:'you need an id'});
  }
  if (!req.user){
    return res.status(401).json({message:'unauthorized'});
  }
  Bookshelf.findOne({_id: req.params.id}).then((bookshelf)=>{
    if(bookshelf.username !== req.user.username){
      return res.status(401).json({message: 'unauthorized'});
    } else {
      return next();
    }
  }).catch((e)=>{
    return res.status(500).json({message:'error looking for bookshelf'});
  })
};

export function isAuthenticated(req, res, next){
  return req.isAuthenticated() ? next() : res.status(401).json({message:'unauthenticated or unauthorized'});
}
