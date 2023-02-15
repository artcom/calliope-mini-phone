enum RadioMessage {
    message1 = 49434
}
/**
 * Pulse Input on P0
 */
/**
 * Dialing input on P1
 */
/**
 * Telephone hook on P3
 */
pins.onPulsed(DigitalPin.P0, PulseValue.Low, function () {
    if (control.millis() - lastPulse > 60) {
        send("phone/onPulse " + pulses, 5)
        led.plot(0, 0)
        if (pulses < 9) {
            pulses += 1
        } else {
            pulses = 0
        }
        lastPulse = control.millis()
    }
})
pins.onPulsed(DigitalPin.P1, PulseValue.High, function () {
    if (control.millis() - lastDialstart > 300) {
        send("phone/onStartDial", 5)
        basic.clearScreen()
        pulses = 0
        led.plot(4, 0)
        lastDialstart = control.millis()
    }
})
pins.onPulsed(DigitalPin.P3, PulseValue.Low, function () {
    send("phone/onHang false ", 10)
})
function send (message: string, repeat: number) {
    serial.writeLine(message)
    for (let index = 0; index < repeat; index++) {
        radio.sendString(message)
    }
}
pins.onPulsed(DigitalPin.P1, PulseValue.Low, function () {
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        send("phone/onDialed " + pulses, 40)
        led.unplot(4, 0)
        basic.showNumber(pulses)
    }
})
pins.onPulsed(DigitalPin.P0, PulseValue.High, function () {
    led.unplot(0, 0)
})
pins.onPulsed(DigitalPin.P3, PulseValue.High, function () {
    send("phone/onHang true", 10)
})
let lastPulse = 0
let lastDialstart = 0
let pulses = 0
radio.setTransmitPower(7)
radio.setGroup(1)
radio.setFrequencyBand(70)
pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setPull(DigitalPin.P3, PinPullMode.PullUp)
basic.showNumber(pulses)
lastDialstart = 0
loops.everyInterval(1200000, function () {
    send("phone/vcc " + pins.analogReadPinInternalRef(), 1)
})
