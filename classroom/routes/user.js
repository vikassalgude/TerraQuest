const express=require('express');
const router=express.Router();

//Index route
router.get("/",(req,res)=>{
  res.send("GET for user");
});

//Show user
router.get('/:id',(req,res)=>{
  res.send("GET for user id")
});

//POST-user
router.post('/',(req,res)=>{
  res.send("POST for user");
})

//DELETE-user
router.delete('/:id',(req,res)=>{
  res.send('DELETE for user id');
});

module.exports=router;
