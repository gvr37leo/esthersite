//made by paul boon: gvr37.p.l.boon@gmail.com
var canvas = document.querySelector('.background')
var ctxt = canvas.getContext('2d')
var dt = 0;
var time = 0;
var speed = 50;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var twopi = 2*Math.PI
var mousePos = new Vector2(0,0)
document.onmousemove = (e) =>{
    mousePos = getMousePos(canvas, e)
}

class Particle{
    constructor(pos, speed){
        this.colorOffset = random(0, 360);
        this.pos = pos;
        this.speed = speed;
        this.size = 10;
        this.minsize = 10;
        this.maxsize = 30;
        this.growspeed = 30;
    }

    update(){
        this.pos.add(this.speed.c().scale(dt))
        this.wrap();
        if(this.isTouching(mousePos)){
            this.size += this.growspeed * dt
        }else{
            this.size -= this.growspeed * dt
        }
        this.size = clamp(this.size, this.minsize, this.maxsize)
    }

    draw(){
        ctxt.fillStyle = `hsl(${mod(this.colorOffset + time * 50, 360)}, 100%, 50%)`
        
        ctxt.beginPath();
        ctxt.arc(this.pos.x,this.pos.y,this.size,0,twopi);
        ctxt.fill();
    }

    wrap(){
        var margin = 40;
        this.pos.x = wrap(this.pos.x,canvas.width,margin)
        this.pos.y = wrap(this.pos.y,canvas.height,margin)
    }

    isTouching(v){
        return this.pos.dist(v) - 50 < this.size
    }
}

var particles = []
for(var i = 0; i < 50; i++){
    particles.push(new Particle(
        new Vector2(random(0,canvas.width),random(0,canvas.height)),
        new Vector2(randomSpread(0,speed),randomSpread(0,speed))))
}

function wrap(val,max,margin){
    return mod(val + margin, max + margin * 2) - margin
}

loop((_dt) => {
    dt = max(_dt/1000, 0.023)
    time += dt;
    ctxt.fillStyle = '#e3e3e3'
    ctxt.fillRect(0,0,canvas.width,canvas.height)
    for(var particle of particles){
        particle.update()
        particle.draw()
    }
})

