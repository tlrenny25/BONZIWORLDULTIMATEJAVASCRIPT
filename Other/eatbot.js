(() => { 
  const SERVER = location.origin; 
  const ROOM = window.room || ""; 
 
  let bot; 
  let energy = 0; 
  let buyLocked = false; 
  let legacyMode = false; 
  let fridgeSmashed = false; 
 
  const MAX_ENERGY = 25000; 
 
  const originalFoods = { 
    "aplle": 2, 
    "apple": 2, 
    "melon": 6, 
    "sushi": 14, 
    "banana": 23, 
    "small cheeseburger": 30, 
    "cheeseburger": 35, 
    "sausage": 50, 
    "bologne": 80, 
    "aplle pie": 122, 
    "apple pie": 122, 
    "date": 177, 
    "golden banana": 199 
  }; 
 
  const foods = {...originalFoods}; 
 
  function createBot(){ 
    const sock = io(SERVER,{transports:["websocket"]}); 
 
    sock.on("connect",()=>{ 
      sock.emit("login",{ 
        name:"EatBot ["+energy+"] !foods", 
        room:ROOM 
      }); 
 
      sock.emit("command",{list:["color","yellow"]}); 
 
      setTimeout(()=>say("🍔 EatBot ready! Feed me food."),700); 
      setTimeout(()=>say("Examples: eat sushi | eat a banana | apple"),1400); 
      setTimeout(()=>say("Commands: !foods , !digest , !water"),2100); 
      setTimeout(()=>say("Admins: STOPBUY / GOBUY"),2800); 
    }); 
 
    return sock; 
  } 
 
  function say(text){ 
    if(bot && bot.connected){ 
      if(legacyMode){ 
        text = "[[" + text; 
      } 
 
      bot.emit("talk",{text:text}); 
    } 
  } 
 
  function updateName(){ 
    bot.emit("command",{ 
      list:["name","EatBot ["+energy+"] !foods"] 
    }); 
  } 
 
  function rejoin(){ 
    try{bot.disconnect()}catch{} 
 
    setTimeout(()=>{ 
      bot=createBot(); 
      attach(bot); 
    },1000); 
  } 
 
  function listFoods(){ 
    const entries=Object.entries(foods); 
 
    if(entries.length===0){ 
      say("Foods: NONE. THE FRIDGE IS EMPTY."); 
      return; 
    } 
 
    let list=entries 
      .map(([f,e])=>f+"("+e+")") 
      .join(", "); 
 
    say("Foods: "+list); 
  } 
 
  function fixEnergy(){ 
    if(energy === 67) energy = 68; 
  } 
 
  function smashFridge(){ 
    if(fridgeSmashed){ 
      say("the fridge is already destroyed! use !recover to fix it."); 
      return; 
    } 
 
    fridgeSmashed=true; 
 
    for(const food in foods){ 
      delete foods[food]; 
    } 
 
    energy=0; 
    updateName(); 
 
    say("[[kabum]]! the fridge has been destroyed! the foods are gone, gone, gone, gone, gone... use !recover to reset the bot to its original self, but unfortunately. all your foods you all buyed will get removed, try at your own risk"); 
  } 
 
  function recover(){ 
    if(!fridgeSmashed){ 
      say("the fridge is already normal! nothing to recover."); 
      return; 
    } 
 
    for(const food in foods){ 
      delete foods[food]; 
    } 
 
    Object.assign(foods,originalFoods); 
 
    fridgeSmashed=false; 
    energy=0; 
 
    updateName(); 
 
    say("the fridge has been recovered! all original foods are back. your bought foods are gone."); 
  } 
 
  function attach(sock){ 
 
    sock.on("talk",data=>{ 
 
      if(!data || typeof data.text!=="string") return; 
      if(data.guid===sock.id) return; 
 
      let msg=data.text.toLowerCase().trim(); 
 
      // Mute detection: respond randomly instead of rejoining
      if(msg.includes("mute") || msg.includes("muted")){ 
 
        const muteResponses=[ 
          "are you sure?", 
          "i wouldn't do that if i were you...", 
          "please stop", 
          "do you wanna make me starve?", 
          "fuck you", 
          "why are you muting?", 
          "want a small cheeseburger for my downfall?" 
        ]; 
 
        const response=muteResponses[ 
          Math.floor(Math.random()*muteResponses.length) 
        ]; 
 
        say(response); 
        return; 
      } 
 
      if(msg==="stopbuy"){ 
        buyLocked=true; 
        say("buy command locked"); 
        return; 
      } 
 
      if(msg==="gobuy"){ 
        buyLocked=false; 
        say("buy command unlocked"); 
        return; 
      } 
 
      if(msg==="!smashfridge"){ 
        smashFridge(); 
        return; 
      } 
 
      if(msg==="!recover"){ 
        recover(); 
        return; 
      } 
 
      if(msg==="!foods"){ 
        listFoods(); 
        return; 
      } 
 
      if(msg==="!digest"){ 
        energy=0; 
        updateName(); 
        say("digested all foods | energy: 0"); 
        return; 
      } 
 
      if(msg==="!water"){ 
        let loss=Math.floor( 
          Math.random()*(56-20+1) 
        )+20; 
 
        energy-=loss; 
 
        if(energy<0) energy=0; 
 
        updateName(); 
 
        say( 
          "drank water 💧 | -"+ 
          loss+ 
          " energy | "+ 
          energy+ 
          "/"+ 
          MAX_ENERGY 
        ); 
 
        return; 
      } 
 
      if(msg==="!legacymode"){ 
        legacyMode=true; 
        say("legacy mode enabled"); 
        return; 
      } 
 
      if(msg==="!offlegacy"){ 
        legacyMode=false; 
        say("legacy mode disabled"); 
        return; 
      } 
 
      if(msg.startsWith("!buy ")){ 
 
        if(buyLocked){ 
          say("buy command is locked"); 
          return; 
        } 
 
        const parts=msg.split(" "); 
 
        if(parts.length>=3){ 
 
          const food=parts 
            .slice(1,parts.length-1) 
            .join(" "); 
 
          const val=parseInt( 
            parts[parts.length-1] 
          ); 
 
          if(!isNaN(val)){ 
            foods[food]=val; 
 
            say( 
              "added "+ 
              food+ 
              " | +"+ 
              val+ 
              " energy" 
            ); 
 
            return; 
          } 
        } 
 
        say("usage: !buy [food] [energy]"); 
        return; 
      } 
 
      if(msg.startsWith("eat")){ 
 
        let food=msg 
          .replace(/^eat an /,"") 
          .replace(/^eat a /,"") 
          .replace(/^eat /,"") 
          .trim(); 
 
        if(food===""){ 
          say("i dont have this food in de fridge"); 
          return; 
        } 
 
        if(foods[food]!==undefined){ 
 
          let gain=foods[food]; 
 
          energy+=gain; 
 
          fixEnergy(); 
 
          if(energy>MAX_ENERGY){ 
            say( 
              "looks like im actually full, use !digest to remove energy back to 0%" 
            ); 
 
            return; 
          } 
 
          updateName(); 
 
          say( 
            "ate "+ 
            food+ 
            " | +"+ 
            gain+ 
            " energy | "+ 
            energy+ 
            "/"+ 
            MAX_ENERGY 
          ); 
 
          return; 
 
        }else{ 
 
          say("i dont have this food in de fridge"); 
        } 
      } 
 
      if(foods[msg]!==undefined){ 
 
        let gain=foods[msg]; 
 
        energy+=gain; 
 
        fixEnergy(); 
 
        if(energy>MAX_ENERGY){ 
          say( 
            "looks like im actually full, use !digest to remove energy back to 0%" 
          ); 
 
          return; 
        } 
 
        updateName(); 
 
        say( 
          "ate "+ 
          msg+ 
          " | +"+ 
          gain+ 
          " energy | "+ 
          energy+ 
          "/"+ 
          MAX_ENERGY 
        ); 
      } 
 
    }); 
 
  } 
 
  bot=createBot(); 
  attach(bot); 
 
})();
