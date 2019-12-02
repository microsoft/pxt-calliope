# WebUSB

WebUSB is an emerging web standard that allows to access @boardname@ from web pages. 
It allows for a **one-click download** without installing any additional app or software! It also allows to receive data from the @boardname@.

## Support

* Chrome 65+ browser for Android, Chrome OS, Linux, macOS and Windows 10.

## Prepare your @boardname@

Make sure that your @boardname@ is running version **0249** or above of the firmware. Upgrading is as easy as dragging a file and it takes a few seconds to get it done.

* [Check out the instructions to check and upgrade your @boardname@.](/device/usb/webusb/troubleshoot)

## Pair your @boardname@

Here are the steps on the supported browsers:

* connect your @boardname@ to your computer with the microUSB cable
* open a project.
* open the gearwheel menu and select **Pair device**
* click on the **Pair device** button and select **BBC micro:bit CMSIS-DAP** or **DAPLink CMSIS-DAP** from the list.

If you don't see any devices in the list and @boardname@ has the right firmware (**0249** or above), you can create a [support ticket](https://support.microbit.org/support/tickets/new) to notify the Micro:bit Foundation of the problem. Skip the rest of these steps.

## One-click Download

Once your @boardname@ is paired, MakeCode will use WebUSB to transfer the code without having to drag and drop. Happy coding!

## Console output

MakeCode will be able to "listen" to your @boardname@ and display the console output.
