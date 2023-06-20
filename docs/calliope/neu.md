# Choosing the Right Template for Calliope mini

Are you unsure which project template is the best fit for your Calliope mini device? Don't worry, we've got you covered! With our simplified approach, you can now start programming your Calliope mini without worrying about compatibility issues. Simply select the `New Project` option, and you're ready to go. However, if you're using the Calliope mini mobile app, you may still find value in using the iOS project templates. Let's explore the options:

|                      | New Project           | V2 Template                                  | V1 Template                                  |
|----------------------|-----------------------|----------------------------------------------|----------------------------------------------|
| Description          | Compatible with all Calliope mini versions | Designed for Calliope mini 2.x               | Designed for Calliope mini 1.x with easy BLE integration |
| RAM Size             | 16KB                  | 32KB                                         | 16KB                                         |
| BLE Configuration    | Requires A+B & Reset to enable Bluetooth    | Bluetooth always enabled                     | Bluetooth always enabled                     |
| Memory Constraints   | None                  | None                                         | Potential memory limitations due to BLE stack |

## Additional Notes for iOS Users:

If you have previously recorded your Calliope mini with another editor or programmed it with the Calliope mini 2.x template, you cannot transfer the normal project template directly to mobile. The Bluetooth settings have changed in this template, so one of the following steps is necessary so that you can transfer your program to mobile devices without any problems:

### Option A: Load Program 25 (Calliope mini 2.x):

To load Program with the number '25' onto your Calliope mini, follow these steps:

1. Press and hold the reset button on your Calliope mini for approximately 5 seconds until all LEDs briefly light up and then turn off.
2. Press the 'A' button to go back one step. This will illuminate the 25th LED on the display.
3. Press the 'A' and 'B' buttons simultaneously to confirm your selection and load Program 25. This process also resolves any other transfer issues. Once completed, your Calliope mini will be restored to its default state.

### Option B: Load the Demo Program:

In the Calliope mini app, navigate to the 'Editors and Programs' section and locate the 'Start Program' option. Load this program onto your Calliope mini, and you'll be able to use the standard project template without any concerns.
