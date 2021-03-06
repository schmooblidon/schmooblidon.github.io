var chars = {
  fox : {},
  falco : {},
  marth : {},
  sheik : {},
  puff : {},
  peach : {},
  ics : {},
  falcon : {},
  doc : {},
  pika : {},
  samus : {},
  mario : {},
  luigi : {},
  ganon : {}
};

chars.fox.listofattacks = ["Shine","Grab","Bair","Nair","Dair","Upsmash","Fair","Upair"];
chars.fox.attdetails = ["<br>+3 Frames Jumpsquat<br>Hits: 1<br>Invulnerable: 1<br>Jump cancelable: 4+","<br>Total: 30<br>Grab: 7-8","<br>+3 Frames Jumpsquat<br>Total: 39<br>Hit: 4-19<br>IASA: 38<br>Auto cancel: <3 24><br>Landlag: 20<br>Lcanceled: 10","<br>+3 Frames Jumpsquat<br>Total: 49<br>Hit: 4-31<br>IASA: 42<br>Auto cancel: <3 37><br>Landlag: 15<br>Lcanceled: 7","<br>+3 Frames Jumpsquat<br>Total: 49<br>Hit: 5-6, 8-9, 11-12, 14-15, 17-18, 20-21, 23-24<br>Auto cancel: <4 31><br>Landlag: 18<br>Lcanceled: 9","<br>+1 Frame Jumpsquat<br>Total: 41<br>Hit: 7-17<br>Head invincible (but not snout): 1-9<br>Charge frame: 2","<br>+3 Frames Jumpsquat<br>Total: 59<br>Hit: 6-8, 16-18, 24-26, 33-35, 43-45<br>IASA: 53<br>Auto cancel: <5 49><br>Landlag: 22<br>Lcanceled: 11","<br>+3 Frames Jumpsquat<br>Total: 39<br>Hit: 8-9, 11-14<br>IASA: 36<br>Auto cancel: <7 26><br>Landlag: 18<br>Lcanceled: 9"];
chars.fox.specials = [["a1f4","Intangible","intangible"],["a6","Head Intangible","intangible",2,10]];


chars.falco.listofattacks = ["Shine","Grab","Upsmash","Bair","Nair","Dair","Fair","Upair"];
chars.falco.attdetails = ["<br>+5 Frames Jumpsquat<br>Hits: 1<br>Invincible: 1<br>Jump cancelable: 4+","<br>Total: 30<br>Grab: 7-8​","<br>+1 Frame Jumpsquat<br>Total: 43<br>Hit: 7-15<br>Head invincible (but not beak): 1-10<br>Charge frame: 2​","<br>+5 Frames Jumpsquat<br>Total: 39<br>Hit: 4-19<br>IASA: 38<br>Auto cancel: <3 23><br>Landlag: 20<br>Lcanceled: 10​","<br>+5 Frames Jumpsquat<br>Total: 49<br>Hit: 4-31<br>IASA: 42<br>Auto cancel: <3 37><br>Landlag: 15<br>L-Canceled: 7​","<br>+5 Frames Jumpsquat<br>Total: 49<br>Hit: 5-24<br>Auto cancel: <4 30><br>Landlag: 18<br>Lcanceled: 9​","<br>+5 Frames Jumpsquat<br>Total: 59<br>Hit: 6-8, 16-18, 24-26, 33-35, 43-45<br>IASA: 53<br>Auto cancel: <5 49><br>Landlag: 22<br>Lcanceled: 11​","<br>+5 Frames Jumpsquat<br>Total: 39<br>Hit: 8-9, 11-14<br>IASA: 36<br>Auto cancel: <7 26><br>Landlag: 18<br>Lcanceled: 9​"];
chars.falco.specials = [["a1f6","Intangible","intangible"],["a3","Head Intangible","intangible",2,11]];


chars["marth"]["listofattacks"] = ["Upb","Grab","Fair","Dair","Upair","Nair","Bair","Sideb","Upsmash","Downb"];
chars.marth.attdetails = ["<br>+1 Frame Jumpsquat<br>Total: 39<br>Hit: 5-10<br>Invulnerable: 5<br>Landfallspeciallag: 34","<br>Total: 30<br>Grab: 7-8","<br>+4 Frames Jumpsquat<br>Total: 33<br>Hit: 4-7<br>IASA: 30<br>Auto cancel: 27><br>Landlag: 15<br>Lcanceled: 7","<br>+4 Frames Jumpsquat<br>Total: 59<br>Hit: 6-9<br>Auto cancel: <5 48><br>Landlag: 32<br>Lcanceled: 16","<br>+4 Frames Jumpsquat<br>Total: 45<br>Hit: 5-8<br>Auto cancel: <4 27><br>Landlag: 15<br>Lcanceled: 7","<br>+4 Frames Jumpsquat<br>Total: 49<br>Hit: 6-7, 15-21<br>Auto cancel: <5 25><br>Landlag: 15<br>Lcanceled: 7","<br>+4 Frames Jumpsquat<br>Total: 39<br>Hit: 7-11<br>IASA: 35<br>Auto cancel: 32><br>Landlag: 24<br>Lcanceled: 12","<br>+4 Frames Jumpsquat<br>Total: 29<br>Hit: 6-8<br>Window for attack 2: 9-26","<br>1 Frame Jumpsquat<br>Total: 54<br>Hit: 13-16<br>Charge frame: 7<br>IASA: 46","<br>+4 Frames Jumpsquat<br>Total: 59<br>Counters: 5-29"];
chars.marth.specials = [["a1f6","Intangible","intangible"],["a10f9","Counterattack Area","counterattack"]];


chars.sheik.listofattacks = ["Nair","Grab","Bair","Fair","Upair","Upsmash","Dair"];
chars.sheik.attdetails = ["<br>+3 Frames Jumpsquat<br>Total: 48<br>Hit: 3-30<br>IASA: 42<br>Auto cancel: <2, >31<br>Landlag: 16<br>L canceled: 8","<br>Total: 30<br>Grab: 7-8","<br>+3 Frames Jumpsquat<br>Total: 37<br>Hit: 4-19<br>Auto cancel: <3, >25<br>Landlag: 16<br>L canceled: 8","<br>+3 Frames Jumpsquat<br>Total: 33<br>Hit: 5-7<br>Auto cancel: <4, >11<br>Landlag: 16<br>L canceled: 8","<br>+3 Frames Jumpsquat<br>Total: 39<br>Hit: 5-20<br>IASA: 37<br>Auto cancel: <4, >30<br>Landlag: 24<br>L canceled: 12","<br>+1 Frame Jumpsquat<br>Total: 47<br>Hit: 12, 14-16<br>Charge frame: 10<br>Head and forearms invincible: 12-16<br>IASA: 40","<br>+3 Frames Jumpsquat<br>Total: 48<br>Hit: 15-33<br>Auto cancel: <2<br>Landlag: 20<br>L canceled: 10"];
chars.sheik.specials = [["a6","Head and forearms Intangible","intangible",13,17]];


chars.puff.listofattacks = ["Rest","Grab","Upsmash","Dair","Nair","Fair","Bair","Upair","SideB"];
chars.puff.attdetails = ["<br>+5 Frames Jumpsquat<br>Total: 249<br>Hit: 1<br>Invincible: 1-26","<br>Total: 30<br>Grab: 7-8","<br>+1 Frame Jumpsquat<br>Total: 54<br>Hit: 7-10<br>Charge Frame: 5<br>IASA: 45","<br>+5 Frames Jumpsquat<br>Total: 49<br>Hit: 5-6, 8-9, 11-12, 14-15, 17-18,<br>20-21, 23-24, 26-27<br>Auto cancel: <4, >39<br>Landlag: 30<br>Lcanceled: 15","<br>+5 Frames Jumpsquat<br>Total: 49<br>Hit: 6-28<br>Auto cancel: <5, >29<br>Landlag: 20<br>Lcanceled: 10","<br>+5 Frames Jumpsquat<br>Total: 39<br>Hit: 7-22<br>IASA: 35<br>Auto cancel: <6, >34<br>Landlag: 20<br>Lcanceled: 10","<br>+5 Frames Jumpsquat<br>Total: 39<br>Hit: 9-12<br>IASA: 31<br>Auto cancel: <8, >25<br>Landlag: 20<br>Lcanceled: 10","<br>+5 Frames Jumpsquat<br>Total: 39<br>Hit: 9-12<br>IASA: 38<br>Auto cancel: <8, >37<br>Landlag: 20<br>Lcanceled: 10","<br>+5 Frames Jumpsquat<br>Total: 45<br>Hit: 12-27<br>When to aim: 12<br>Earliest FF: 42"];
chars.puff.specials = [["a1f6","Intangible","intangible"]];


chars.peach.listofattacks = ["Grab","Nair","Bair","Turnip","Dsmash","Upsmash","Upb","Upair","Dair"];
chars.peach.attdetails = ["<br>Total: 30<br>Grab: 7-8","<br>+5 Frames Jumpsquat<br>Total: 49<br>Hit: 3-23<br>IASA: 42<br>Auto cancel: <2 36><br>Landlag: 17<br>Lcanceled: 8","<br>+5 Frames Jumpsquat<br>Total: 44<br>Hit: 6-22<br>IASA: 38<br>Auto cancel: <4 23><br>Landlag: 15<br>Lcanceled: 7","<br>+5 Frames Jumpsquat<br>","<br>+5 Frames Jumpsquat<br>+2 Frames DJLanding<br>Total: 39<br>Hit: 5-6, 9-10, 13-14, 17-18, 21-22<br>Charge frame: 3<br>Legs invincible: 3-24","<br>+1 Frame Jumpsquat<br>Total: 44<br>Hit: 13-22<br>Charge frame: 10<br>Head and arms invulnerable: 13-22","<br>+1 Frame Jumpsquat<br>Uplift Total: 40<br>Invincible: 3<br>Hit: 6-9, 10-11, 12-13, 14-15, 16-17,18-19, 20-21, 22-23, 24-25, 26-27,28-29<br>Soonest FF: 56<br>Start floating: 55 (fall speed decreases instantly)<br>Parasol Hit: 65><br>Landlag: 30<br>Landfallspeciallag: 4","<br>+5 Frames Jumpsquat<br>Total: 35<br>Hit: 7-11<br>IASA: 34<br>Auto cancel: <6 22><br>Landlag: 15<br>Lcanceled: 7","<br>+5 Frames Jumpsquat<br>Total: 39<br>Hit: 12-13, 18-19, 24-25, 30-31<br>IASA: 36<br>Auto cancel: <11 36><br>Landlag: 15<br>Lcanceled: 7"];
chars.peach.specials = [["a4f6","Z-Drop","zdrop"],["a4","Air Throw","airthrow",14,20],["a4","Total: 23<br>Release: 10 (down)<br>Release: 11 (up)<br>Release: 10 (forward)<br>Release: 9 (backward)","attdetails",14,16],["a5","DoubleJumpLand","djl"],["a5","Legs Intangible","intangible"],["a6","Head and arms intangible","intangible",14,20]];


chars.ics.listofattacks = ["Dair","Grab","Nair","Upair","Bair","Upsmash"];
chars.ics.attdetails = ["<br>+3 Frames Jumpsquat<br>Total: 65<br>Hit: 3-52<br>Auto cancel: <2 58><br>Landlag: 25<br>Lcanceled: 12","<br>Total: 30<br>Grab: 7-8","<br>+3 Frames Jumpsquat<br>Total: 49<br>Hit: 6-23<br>IASA: 46<br>Auto cancel: <5 30><br>Landlag: 20<br>Lcanceled: 10","<br>+3 Frames Jumpsquat<br>Total: 39<br>Hit: 6-23<br>IASA: 30<br>Auto cancel: <5 27><br>Landlag: 32<br>Lcanceled: 16","<br>+3 Frames Jumpsquat<br>Total: 39<br>Hit: 8-11<br>IASA: 36<br>Auto cancel: <7 19><br>Landlag: 20<br>Lcanceled: 10","<br>+3 Frames Jumpsquat<br>Total: 49<br>Hit: 14-18<br>IASA: 44<br>Charge frame: 8"];
chars.ics.specials = [];


chars.falcon.listofattacks = ["Grab","Upair","Nair","Bair","Up-b","Knee","Dair"];
chars.falcon.attdetails = ["<br>Total: 30<br>Grab: 7-8","<br>+4 Frames Jumpsquat<br>Total: 33<br>Hit: 6-13<br>IASA: 30<br>Auto cancel: 22><br>Landlag: 15<br>Lcanceled: 7","<br>+4 Frames Jumpsquat<br>Total: 44<br>Hit: 7-12, 20-29<br>Auto cancel: <3 34><br>Landlag: 15<br>Lcanceled: 7","<br>+4 Frames Jumpsquat<br>Total: 35<br>Hit: 10-17<br>IASA: 29<br>Auto cancel: <6 21><br>Landlag: 18<br>Lcanceled: 9","<br>+1 Frame Jumpsquat<br>Total: 64<br>Grab: 13-33<br>Landlag: 30","<br>+4 Frames Jumpsquat<br>Total: 39<br>Hit: 14-30<br>IASA: 36<br>Auto cancel: <6 35><br>Landlag: 19<br>Lcanceled: 9","<br>+4 Frames Jumpsquat<br>Total: 44<br>Hit: 16-20<br>IASA: 38<br>Auto cancel: <3 36><br>Landlag: 24<br>Lcanceled: 12"];
chars.falcon.specials = [];

chars.doc.listofattacks = ["Upb","Nair","Grab","Upair","Upsmash","Bair","Dair"];
chars.doc.attdetails = ["<br>+1 Frame Jumpsquat<br>Total: 37 (Upb-Cancel: 3)<br>Hit: 3-21 (Upb-C: 3)<br>Invincible: 3<br>Time to decide angle: 3<br>Time to decide direction: 4<br>Landlag: 30","<br>+4 Frames Jumpsquat<br>Total: 45<br>Hit: 3-31<br>Auto cancel: <2 36><br>Landlag: 18<br>Lcanceled: 9","<br>Total: 30<br>Grab: 7-8","<br>+4 Frames Jumpsquat<br>Total: 33<br>Hit: 4-9<br>Auto cancel: 16><br>Landlag: 18<br>Lcanceled: 9","<br>+1 Frame Jumpsquat<br>Total: 39<br>Hit: 9-11<br>Head invulnerable: 9-11<br>Charge frame: 7", "<br>+4 Frames Jumpsquat<br>Total: 28<br>Hit: 6-16<br>Auto cancel: <5 19><br>Landlag: 18<br>Lcanceled: 9", "<br>+4 Frames Jumpsquat<br>Total: 38<br>Hit: 10-11, 13-14, 16-17, 19-20, 22-23, 25-26, 28-29<br>IASA: 38<br>Auto cancel: <5 33><br>Landlag: 24<br>Lcanceled: 12"];
chars.doc.specials = [["a1f4","Intangible","intangible"],["a5","Head Intangible","intangible",10,12]];


chars.pika.listofattacks = ["Nair","Upair","Grab","Bair","Upsmash","Fair","Dair"];
chars.pika.attdetails = ["<br>+3 Frames Jumpsquat<br>Total: 39<br>Hit: 3-28<br>Auto cancel: <2 35><br>Landlag: 15<br>Lcanceled: 7","<br>+3 Frames Jumpsquat<br>Total: 27<br>Hit: 3-8<br>Auto cancel: <2 18><br>Landlag: 26<br>Lcanceled: 13","<br>Total: 30<br>Grab: 7-8","<br>+3 Frames Jumpsquat<br>Total: 59<br>Hit: 4-37<br>Auto cancel: <3 50><br>Landing hit: 1<br>Landlag: 30<br>Lcanceled: 15","<br>+1 Frame Jumpsquat<br>Total: 43<br>Charge frame: 5<br>Hit: 8-17<br>IASA: 41","<br>+3 Frames Jumpsquat<br>Total: 39<br>Hit: 10-12, 14-16, 18-20, 22-24<br>Auto cancel: <9 34><br>Landlag: 20<br>Lcanceled: 10","<br>+3 Frames Jumpsquat<br>Total: 57<br>Hit: 14-26<br>IASA: 48<br>Auto cancel: 39><br>Landing hit: 2<br>Landlag: 40<br>Lcanceled: 20"];
chars.pika.specials = [];


chars.samus.listofattacks = ["Upb","Fair","Nair","Upair","Bair","Upsmash","Grab"];
chars.samus.attdetails = ["<br>+1 Frame Jumpsquat<br>Total: 49<br>Invincible: 1-5<br>Hit: 4-7, 8-9, 10-11, 12-13, 14-15, 16-17, 18-19, 20-21, 22-23, 24-25, 26-27, 28-29","<br>+3 Frames Jumpsquat<br>Total: 55<br>Hit: 4-5, 11-12, 18-19, 25-26, 30-31<br>IASA: 50<br>Auto cancel: 47><br>Landlag: 15<br>Lcanceled: 7","<br>+3 Frames Jumpsquat<br>Total: 49<br>Hit: 5-29<br>IASA: 40<br>Auto cancel: <4 35><br>Landlag: 15<br>Lcanceled: 7","<br>+3 Frames Jumpsquat<br>Total: 39<br>Hit: 5-6, 8-9, 11-12, 14-15, 17-18, 20-21<br>IASA: 39<br>Auto cancel: <4 34><br>Landlag: 15<br>Lcanceled: 7","<br>+3 Frames Jumpsquat<br>Total: 39<br>Hit: 9-12<br>IASA: 37<br>Auto cancel: <8 31><br>Landlag: 15<br>Lcanceled: 7","<br>+1 Frame Jumpsquat<br>Total: 59<br>Hit: 12-14, 16-18, 20-22, 24-26, 28-29<br>Charge Frame: 8<br>IASA: 58","<br>Total: 94<br>Grab: 18-20, 22-37"];
chars.samus.specials = [["a1","Intangible","intangible",2,6]];

chars.mario.listofattacks = ["Upb","Nair","Grab","Upair","Upsmash","Bair","Dair"];
chars.mario.attdetails = ["<br>+1 Frame Jumpsquat<br>Total: 37<br>Hit: 3-24<br>Invincible: 3-6<br>landfallspeciallag: 30","<br>+4 Frames Jumpsquat<br>Total: 45<br>Hit: 3-32<br>Auto cancel: <2 36><br>Landlag: 16<br>Lcanceled: 8","<br>Total: 30<br>Grab: 7-8","<br>+4 Frames Jumpsquat<br>Total: 33<br>Hit: 4-9<br>IASA: 30<br>Auto cancel: 16><br>Landlag: 15<br>Lcanceled: 7","<br>+1 Frame Jumpsquat<br>Total: 39<br>Hit: 9-11<br>Head invulnerable: 9-11<br>Charge frame: 7","<br>+4 Frames Jumpsquat<br>Total: 28<br>Hit: 6-17<br>Auto cancel: <5 19><br>Landlag: 15<br>Lcanceled: 7","<br>+4 Frames Jumpsquat<br>Total: 38<br>Hit: 10-11, 13-14, 16-17, 19-20, 22-23, 25-26<br>IASA: 38<br>Auto cancel: <5 33>"];
chars.mario.specials = [["a1","Intangible","intangible",4,7],["a5","Head Intangible","intangible",10,12]];

chars.luigi.listofattacks = ["Upb","Nair","Grab","Upair","Upsmash","Bair","Fair","Dair"];
chars.luigi.attdetails = ["<br>+1 Frame Jumpsquat<br>Total: 39<br>Hit: 5-23<br>Invincible: 5-8<br>Landfallspeciallag: 40","<br>+4 Frames Jumpsquat<br>Total: 45<br>Hit: 3-31<br>Auto cancel: <2 36><br>Landlag: 15<br>Lcanceled: 7","<br>Total: 30<br>Grab: 7-8","<br>+4 Frames Jumpsquat<br>Total: 33<br>Hit: 5-7<br>IASA: 30<br>Auto cancel: <2 16><br>Landlag: 15<br>Lcanceled: 7","<br>+1 Frame Jumpsquat<br>Total: 39<br>Hit: 9-11<br>Head invincible: 9-11<br>Charge Frame: 7","<br>+4 Frames Jumpsquat<br>Total: 28<br>Hit: 6-17<br>Auto cancel: <5 19><br>Landlag: 15<br>Lcanceled: 7","<br>+4 Frames Jumpsquat<br>Total: 34<br>Hit: 7-10<br>IASA: 33<br>Auto Cancel: 20><br>Landlag: 25<br>Lcanceled: 12","<br>+4 Frames Jumpsquat<br>Total: 32<br>Hit: 10-14<br>IASA: 29<br>Auto cancel: <5 24><br>Landlag: 18<br>Lcanceled: 9"];
chars.luigi.specials = [["a1","Intangible","intangible",6,9],["a5","Head Intangible","intangible",10,12]];

chars.ganon.listofattacks = ["Grab","Upair","Nair","Upb","Bair","Fair"];
chars.ganon.attdetails = ["<br>Total: 30<br>Grab: 7-8","<br>+6 Frames Jumpsquat<br>Total: 33<br>Hit: 6-16<br>IASA: 30<br>Auto cancel: 22><br>Landlag: 25<br>L canceled: 12","<br>+6 Frames Jumpsquat<br>Total: 44<br>Hit: 7-8, 16-17 (v1.0) or 20-21 (later versions)<br>Auto cancel: <3 22><br>Landlag: 25<br>L canceled: 12","<br>+1 Frame Jumpsquat<br>Total: 64<br>Grab: 13-33<br>Direction choosing: 13<br>Landlag: 30<br>Landfallspeciallag: 30","<br>+6 Frames Jumpsquat<br>Total: 35<br>Hit: 10-15<br>IASA: 29<br>Auto cancel: <6 19><br>Landlag: 25<br>L canceled: 12","<br>+6 Frames Jumpsquat<br>Total: 44<br>Hit: 14-19<br>IASA: 35<br>Auto cancel: <6 34><br>Landlag: 25<br>L canceled: 12"];
chars.ganon.specials = [];
