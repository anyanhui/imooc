$(function(){$(".comment").click(function(a){var b=$(this),c=b.data("tid"),d=b.data("cid");$("#toId").length>0?$("#toId").val(c):$("<input>").attr({type:"hidden",id:"toId",name:"comment[tid]",value:c}).appendTo("#commentForm"),$("#commentId").length>0?$("#commentId").val(d):$("<input>").attr({type:"hidden",id:"commentId",name:"comment[cid]",value:d}).appendTo("#commentForm")})});