//You might have some game state so you can keep track of
//what is happening:
let score;
let alive;
let action;
let heroHealth = 100;
let zombieHealth = 100;

//You might have some constants that you use
const speed = 100;  //In pixels per second
const gunBulletSpeed = 300;
const zombieSpeed = 0;

//This is a helper function to compute the distance
//between two sprites
function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

//This setup function is called once when the game starts
function setup(sprites) {
    score = 0;      //set score to zero
    alive = true;   //Set player to alive


    sprites[0].image = "🚶"; //Hero
    sprites[0].x = 120;
    sprites[0].y = -5;
    
    sprites[1].image = "🔫"; //Handgun: How do I resize? ❗❗
    sprites[1].color = "#000000"
    sprites[1].x = sprites[0].x;
    sprites[1].y = sprites[0].y;

    sprites[2].image = "."; //Bullet; How do I resize? Change color?
    sprites[2].x = sprites[1].x + 5;
    sprites[2].y = sprites[1].y + 17;

    sprites[3].image = "🧟"; //Zombie. How do I make many? ❗❗
    sprites[3].x = 700;
    sprites[3].y = -5;



}

/**
 * This function is called every frame
 * @param sprites   Array of sprite objects
 * @param t         Seconds since start of game
 * @param dt        Seconds since last frame (A very small number)
 * @param up        Is up arrow pressed?
 * @param down      "
 * @param left      "
 * @param right     "
 * @param space     Is spacebar pressed?
 * @returns The current score
 */
function frame(sprites, t, dt, up, down, left, right, space) {

    const hero = sprites[0];
    const gun = sprites[1];
    const gunBullet = sprites[2];
    const zombie = sprites[3];

    //sprites[1].x = sprites[0].x + 5; //Set gun next to hero at all times
    //sprites[2].x = sprites[1].x + 3; //Set bullet next to gun at all times

    //gun.x = hero.x - 28;
    //gun.y = hero.y + 5;
    
    //Movement mechanisms
    if (up) {
        //Speed is in pixels per second, and
        //dt is the number of seconds that have
        //passed since the last frame.

        //Multiply them together so that the
        //truck moves at the same speed if the
        //computer is fast or slow
       // hero.y += speed * dt;
    }
    if (down) {
        action = true;
    }
    if (right) {
        hero.x += speed * dt;
        hero.flipH = true;
        gun.flipH = true;
        gun.x += 56;
    }
    if (left) {
        hero.x -= speed * dt;
        hero.flipH = false;
        gun.flipH = false;
    }

    //Shooting mechanisms
    if (space && gunBullet.x == gun.x + 5) {
        gunBullet.x += gunBulletSpeed * dt;
        //Rotate gun a bit and make it go back to simulate recoil; ❗❗
        gun.x -= 2;
        gun.x += 2;
        //Add a little fire effect on the barrel? ❗❗
    }

    if (gunBullet.x == zombie.x) {
        zombieHealth -= 25;
        gunBullet.x = gun.x + 5;
    }

    //Zombie mechanisms
    if (hero.x < zombie.x) {
        zombie.x -= zombieSpeed * dt;
    }
    if (hero.x > zombie.x) {
        zombie.x += zombieSpeed * dt;
    }
    if (hero.x == zombie.x) {
        heroHealth -= 30;
    }
    


    return score;
};

if (zombieHealth <= 0) { //❗❗
    zombie.image = "🪦";
    setTimeout(() => { zombie.image = ""; }, 3000);
}

if(heroHealth <= 0){ //❗❗
    alive = false;
}

export default {
    name: "Zombie Frenzy",
    instructions: "Arrows to move, Spacebar to shoot, Down arrow to pick up loot.",
    icon: "🧟", //Choose an emoji icon
    background: {
        "background-color": "white",
        "background-image": "linear-gradient(#424299, skyblue)",
        "border-bottom": "120px solid green"
    },
    frame,
    setup,
};