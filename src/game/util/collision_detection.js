import * as PIXI from 'pixi.js';

function getBox(sp){
  const dx = sp.anchor.x * sp.width;
  const dy = sp.anchor.y * sp.height;
  return {
    x1: -dx,
    x2: sp.width - dx,
    y1: -dy,
    y2: sp.height - dy
  };
}

function getMaxRadius(sp){
  if (sp.maxRadius ===undefined){
    const b = getBox(sp);
    const r1 = Math.sqrt(b.x1*b.x1 + b.y1*b.y1);
    const r2 = Math.sqrt(b.x2*b.x2 + b.y1*b.y1);
    const r3 = Math.sqrt(b.x1*b.x1 + b.y2*b.y2);
    const r4 = Math.sqrt(b.x2*b.x2 + b.y2*b.y2);
    sp.maxRadius = Math.max(r1, r2, r3, r4);
  }
  return sp.maxRadius;
}

function checkCircle(sp1, sp2){
  const d = getMaxRadius(sp1) + getMaxRadius(sp2);
  const d2 = d*d;
  const dx = sp1.x-sp2.x;
  const dy = sp1.y-sp2.y;
  return (dx*dx + dy*dy) <= d2;
}

function checkPoint(p, sp){
  const b = getBox(sp);
  const lp = sp.toLocal(p);
  
  return lp.x<=b.x2&&lp.x>=b.x1&&lp.y<=b.y2&&lp.y>=b.y1;
}

function check4Point(sp1, sp2){
  if (!checkCircle(sp1, sp2)){
    return false;
  }
  const b = getBox(sp1);
  const p1 = sp1.toGlobal(new PIXI.Point(b.x1, b.y1));
  if(checkPoint(p1, sp2)){
    return true;
  }
  const p2 = sp1.toGlobal(new PIXI.Point(b.x2, b.y1));
  if(checkPoint(p2, sp2)){
    return true;
  }
  const p3 = sp1.toGlobal(new PIXI.Point(b.x1, b.y2));
  if(checkPoint(p3, sp2)){
    return true;
  }
  const p4 = sp1.toGlobal(new PIXI.Point(b.x2, b.y2));
  if(checkPoint(p4, sp2)){
    return true;
  }
  return false;
}

function check4PointWithMany(sp1, sps){
  const b = getBox(sp1);
  const p1 = sp1.toGlobal(new PIXI.Point(b.x1, b.y1));
  const p2 = sp1.toGlobal(new PIXI.Point(b.x2, b.y1));
  const p3 = sp1.toGlobal(new PIXI.Point(b.x1, b.y2));
  const p4 = sp1.toGlobal(new PIXI.Point(b.x2, b.y2));

  for(let i in sps){
    const sp2 = sps[i];
    if (!checkCircle(sp1, sp2)){
      continue;
    }
    if(checkPoint(p1, sp2)){
      return sp2;
    }
    if(checkPoint(p2, sp2)){
      return sp2;
    }
    if(checkPoint(p3, sp2)){
      return sp2;
    }
    if(checkPoint(p4, sp2)){
      return sp2;
    }
  }
  return null;
}

export {checkPoint, check4Point, check4PointWithMany};