enum RadioMessage {
    message1 = 49434
}
input.onButtonEvent(Button.A, ButtonEvent.Click, function () {
    sendR("phone/onButtonA", 5)
})
pins.onPulsed(DigitalPin.P2, PulseValue.High, function () {
    sendR("phone/onHang true", 10)
})
pins.onPulsed(DigitalPin.P1, PulseValue.Low, function () {
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        sendR("phone/onDialed " + counter, 40)
        led.unplot(4, 0)
        basic.showNumber(counter)
    }
})
function sendR (message: string, repeat: number) {
    serial.writeLine(message)
    for (let index = 0; index < repeat; index++) {
        radio.sendString(message)
    }
}
pins.onPulsed(DigitalPin.P1, PulseValue.High, function () {
    if (control.millis() - lastDialstart > 300) {
        sendR("phone/onStartDial", 5)
        pulseCount = 0
        basic.clearScreen()
        counter = 0
        led.plot(4, 0)
        control.waitMicros(100000)
        lastDialstart = control.millis()
        lastPulse = control.millis()
    }
})
pins.onPulsed(DigitalPin.P0, PulseValue.High, function () {
    led.unplot(0, 0)
})
pins.onPulsed(DigitalPin.P2, PulseValue.Low, function () {
    sendR("phone/onHang false ", 10)
})
pins.onPulsed(DigitalPin.P0, PulseValue.Low, function () {
    if (control.millis() - lastPulse > 60) {
        sendR("phone/onPulse " + pulseCount, 5)
        pulseCount += 1
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
let lastDialstart = 0
let pulseCount = 0
let counter = 0
radio.setTransmitPower(7)
radio.setGroup(1)
radio.setFrequencyBand(70)
pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
basic.showNumber(counter)
let repeats = 8
pulseCount = 0
lastDialstart = 0
basic.forever(function () {
	
})
loops.everyInterval(3600000, function () {
    sendR("phone/vcc" + pins.analogReadPinInternalRef(), 1)
})
