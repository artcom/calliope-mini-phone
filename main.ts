enum RadioMessage {
    message1 = 49434
}
input.onButtonEvent(Button.A, ButtonEvent.Click, function () {
	
})
pins.onPulsed(DigitalPin.P1, PulseValue.Low, function () {
    send("phone/onDialed " + counter)
    led.unplot(4, 0)
    basic.showNumber(counter)
})
pins.onPulsed(DigitalPin.P1, PulseValue.High, function () {
    send("phone/onStartDial")
    basic.clearScreen()
    counter = 0
    led.plot(4, 0)
    control.waitMicros(2000)
})
pins.onPulsed(DigitalPin.P0, PulseValue.High, function () {
    led.unplot(0, 0)
})
function send (message: string) {
    for (let index = 0; index < repeats; index++) {
        radio.sendString(message)
    }
}
pins.onPulsed(DigitalPin.P0, PulseValue.Low, function () {
    if (control.millis() - lastPulse > 70) {
        send("phone/onPulse")
        led.plot(0, 0)
        if (counter < 9) {
            counter += 1
        } else {
            counter = 0
        }
        lastPulse = control.millis()
    }
})
let lastPulse = 0
let repeats = 0
let counter = 0
radio.setTransmitPower(7)
radio.setGroup(1)
radio.setFrequencyBand(42)
pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
basic.showNumber(counter)
repeats = 0
basic.forever(function () {
	
})
