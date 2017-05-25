# Infection

### ~avatar avatar

There is a disease outbreak! Will you find patient zero?!?

### ~

**Infection** is a distributed game which simulates 
the propagation of an illness. **The goal is to stop the outbreak before every player dies!**

In this game, a master @boardname@ infects a "patient zero" player
with the sickness. The infected player will be contagious immediately but won't show any sign 
during the incubation time. The sickness gets transmitted when two @boardname@ get close to each other.
After the incubation period, the sad face will appear on the screen. After the sickness period, the player will eventually die and a skull will display on the screen. Dead players are out of the game.

Once the game is over, pressing **B** will display which player got infected. This can be used to trace back the infection up to patient zero. 

If any player survives the outbreak, the game is won. Otherwise try again!

### How to play

Press A+B to enter master mode (1 per game).

Wait for players to be paired. The number of paired player will display on screen.
An icon will appear on player's screen.

Press A+B to start the infection game. The master will pick a random player as patient zero.

A player will transmit the disease if close enough (RSSI) and with a certain probability (TRANSMISSIONPROB). 
During the incudation phase (INCUBATION), the player does not show any sign of illness (happy face). 
After that phase, the sad face shows up.

Player control:
* ``A`` button: show identity icon
* ``B`` button: show current infection status

```typescript
/**
 * Infection game
 * 
 * Flash all micro:bit will this script
 * 
 * Press A+B to enter master mode (1 per game)
 *
 * Wait for players to be paired. The number of paired player will display on screen.
 * An icon will appear on player's screen.
 * 
 * Press A+B to start the infection game. The master will pick a random
 * player as patient zero.
 *
 * A player will transmit the disease if close enough (RSSI)
 * and with a certain probability (TRANSMISSIONPROB). 
 * During the incudation phase (INCUBATION), the player does not show any sign 
 * of illness. After that phase, the sad face shows up.
 *
 * Player control:
 *     A button: show identity icon
 *     B button: show current infection status
 * Master control:
 *     A button: show patient zero identity + number of players
 *  Sad face = infected
 *  Happy face = not infected 
 */

const INCUBATION = 20000; // time before showing symptoms
const DEATH = 40000; // time before dying off the disease
const RSSI = -45; // db
const TRANSMISSIONPROB = 40; // %

enum GameState {
    Stopped,
    Pairing,
    Running,
    Over
}

enum HealthState {
    Healthy,
    Incubating,
    Sick,
    Dead
}

class Player {
    id: number;
    icon: number;
    health: HealthState;
}

let state = GameState.Stopped;
let master = false;
let patientZero: Player;

let paired = false;
let infectedBy = 0; // who infected (icon id)
let infectedTime = 0; // local time when infection happened
let icon = 0; // player icon and identity
let health = HealthState.Healthy;

const players: Player[] = [];
// get a player instance (creates one as needed)
function player(id: number): Player {
    for (const p of players)
        if (p.id == id) return p;

    // add player to game
    let p = new Player();
    p.id = id;
    p.icon = players.length ? players[0].icon + 1 : 2;
    p.health = HealthState.Healthy;
    // don't use sad, happy
    if (p.icon == IconNames.Happy) p.icon += 2;
    if (p.icon == IconNames.Asleep) p.icon++;
    if (p.icon == IconNames.Skull) p.icon++;
    players.push(p);
    serial.writeLine(`player ==> ${p.id}`)

    return p;
}

function allDead(): boolean {
    for (const p of players)
        if (p.health != HealthState.Dead) return false;
    return true;
}

function gameOver() {
    state = GameState.Over;
    basic.showIcon(patientZero.icon);
}

function gameFace() {
    switch (state) {
        case GameState.Stopped:
        case GameState.Pairing:
            basic.showIcon(paired ? IconNames.Happy : IconNames.Ghost);
            break;
        case GameState.Running:
            switch (health) {
                case HealthState.Dead:
                    basic.showIcon(IconNames.Skull);
                    break;
                case HealthState.Sick:
                    basic.showIcon(IconNames.Sad);
                    break;
                default:
                    //case HealthState.Healthy:
                    //case HealthState.Incubating:
                    basic.showIcon(IconNames.Happy);
                    break;
            }
            break;
        case GameState.Over:
            switch (health) {
                case HealthState.Dead:
                    basic.showIcon(IconNames.Skull);
                    break;
                case HealthState.Sick:
                    basic.showIcon(IconNames.Sad);
                    break;
                case HealthState.Incubating:
                    basic.showIcon(IconNames.Asleep);
                    break;
                default:
                    basic.showIcon(IconNames.Happy);
                    break;
            }
            break;
    }
}

// master button controller
input.onButtonPressed(Button.AB, () => {
    // register as master
    if (state == GameState.Stopped && !master) {
        master = true;
        paired = true;
        state = GameState.Pairing;
        serial.writeLine("registered as master");
        radio.setTransmitPower(7); // beef up master signal
        basic.showString("M");
    }
    // launch game
    else if (state == GameState.Pairing && master) {
        // pick 1 player and infect him
        patientZero = players[Math.random(players.length)];
        while (patientZero.health == HealthState.Healthy) {
            radio.sendValue("infect", patientZero.id);
            basic.pause(100);
        }

        // all ready
        state = GameState.Running;
        serial.writeLine(`game started ${players.length} players`);

        // show startup
        basic.showString("R");
    } // end game 
    else if (state == GameState.Running && master) {
        gameOver();
    }
})

// display your icon
input.onButtonPressed(Button.A, () => {
    led.stopAnimation()
    if (master) {
        if (patientZero)
            basic.showIcon(patientZero.icon);
        basic.showNumber(players.length);
    }
    else {
        basic.showIcon(icon);
        gameFace();
    }
})

// display who infected you
input.onButtonPressed(Button.B, () => {
    if (master) {
        let c = 0;
        for (const p of players)
            if (p.health == HealthState.Dead) c++;
        basic.showNumber(c);
    } else {
        led.stopAnimation()
        if (infectedBy)
            basic.showIcon(infectedBy);
        else
            basic.showIcon(IconNames.Happy)
        gameFace();
    }
})

radio.setGroup(42);
radio.setTransmitSerialNumber(true)
radio.onDataPacketReceived(({ time, receivedNumber, receivedString, signal, serial: id }) => {
    if (master) {
        if (receivedString == "pair") {
            // register player
            let n = players.length;
            let p = player(id);
            // show player number if changed
            if (n != players.length) {
                led.stopAnimation();
                basic.showNumber(players.length);
            }
        }
        else if (receivedString == "health") {
            let p = player(id);
            p.health = receivedNumber;
            // check if all infected
            if (allDead())
                gameOver();
        }
    } else {
        if (receivedString == "state") {
            // update game state
            let oldState = state;
            state = receivedNumber as GameState;
            if (oldState != state) {
                switch (state) {
                    case GameState.Pairing:
                        basic.showString("P");
                        break;
                }
            }
        } else if (!infectedBy &&
            receivedString == "infect"
            && receivedNumber == control.deviceSerialNumber()) {
            // infected by master
            infectedBy = 1; // infected my master
            infectedTime = input.runningTime();
            health = HealthState.Incubating;
            serial.writeLine(`infected ${control.deviceSerialNumber()}`);
        }
        switch (state) {
            case GameState.Pairing:
                // medium range in pairing mode
                if (!paired &&
                    receivedString == "paired"
                    && receivedNumber == control.deviceSerialNumber()) {
                    // paired!
                    serial.writeLine(`player paired ==> ${control.deviceSerialNumber()}`)
                    paired = true;
                    basic.showString("R");
                    return;
                }
                else if (paired && receivedString == control.deviceSerialNumber().toString()) {
                    icon = receivedNumber;
                    basic.showIcon(icon);
                }
                break;
            case GameState.Running:
                // broadcast infection status
                if (paired && health == HealthState.Healthy && receivedString == "transmit") {
                    serial.writeLine(`signal: ${signal}`);
                    if (signal > RSSI &&
                        Math.random(100) > TRANSMISSIONPROB) {
                        infectedBy = receivedNumber;
                        infectedTime = input.runningTime();
                        health = HealthState.Incubating;
                    }
                }
                break;
        }
    }
})

// main game loop
basic.forever(() => {
    if (master) {
        switch (state) {
            case GameState.Pairing:
                // tell each player they are registered
                for (const p of players) {
                    radio.sendValue("paired", p.id);
                    radio.sendValue("" + p.id, p.icon);
                }
                serial.writeLine(`pairing ${players.length} players`);
                basic.pause(500);
                break;
        }
        radio.sendValue("state", state); // keep broadcasting the game state
    } else { // player loop
        switch (state) {
            case GameState.Pairing:
                // broadcast player id
                if (!icon)
                    radio.sendValue("pair", control.deviceSerialNumber());
                else if (infectedBy)
                    radio.sendValue("health", health);
                break;
            case GameState.Running:
                // update health status
                if (health != HealthState.Healthy && input.runningTime() - infectedTime > DEATH)
                    health = HealthState.Dead;
                else if (health != HealthState.Healthy && input.runningTime() - infectedTime > INCUBATION)
                    health = HealthState.Sick;
                // transmit disease
                if (health == HealthState.Incubating || health == HealthState.Sick)
                    radio.sendValue("transmit", icon);
                radio.sendValue("health", health);
                gameFace();
                break;
            case GameState.Over:
                // show infection state
                gameFace();
                break;
        }
    }
    basic.pause(100)
})

basic.showIcon(IconNames.Ghost);
```