# Uploading from Chrome for Windows

## ~ hint

Starting with Chrome 65 on Windows 10, 
you can use **WebUSB** to download with one-click.
[Learn more about WebUSB...](/device/usb/webusb).

## ~

While you're writing and testing your programs, you'll mostly be [running them
in the simulator](/device/simulator), but once you've finished your program you
can **compile** it and run it on your Calliope mini.

The basic steps are:

1. Connect your Calliope mini to your computer via USB
2. Click **Download** and download the `.hex` file
3. Copy the `.hex` file from your computer onto the Calliope mini drive

## Requirements

You need the following things to transfer and run a script on your Calliope mini:

* A-Male to Micro USB cable to connect your computer to your Calliope mini. This is
    the same cable that is commonly used to connect a smart phone to a computer.
* A PC running Windows 7 or later, or a Mac running OS X 10.6 or later

## Step 1: Connect your Calliope mini to your computer

First, connect the Calliope mini:

1. Connect the small end of the USB cable to the micro USB port on your Calliope mini.

2. Connect the other end of the USB cable to a USB port on your computer.

Your computer should recognise your Calliope mini as a new drive. On computers
running Windows, `MINI` appears as a drive under Devices and drives. On a Mac
it appears as a new drive under Devices.

![](/static/mb/device/usb-windows-device.jpg)

## Step 2 (optional): Configure Chrome to ask where to save the file

You only need to do this once.

1. Open the **Settings** for Chrome.
2. Click **Advanced** at the bottom of the page.
3. Find the **Downloads** settings.
4. Enable the setting **Ask where to save each file before downloading**.

## Step 3: Download your program

1. Open your project on @homeurl@
2. Click **Download**
3. If you did Step 2 above, Chrome will ask where to save the `.hex` file,
    so save it into the `MINI` drive.
    Otherwise, continue with one of the options in Step 4 below.

## Step 4: Transfer the file to your Calliope mini

If the file was saved onto your computer, you will need to transfer it to the Calliope mini.

## Manual transfer

Your `.hex` file (created in Step 3 above) appears as a download at the bottom of the browser.
Click on the arrow next to the name of the file and then click **Show in folder**.

![](/static/mb/device/usb-windows-chrome.png)

In File Explorer, drag and drop the `.hex` file from the download folder onto the `MINI` drive.

Alternatively, right-click on the hex file, choose **Send to**, and then **MINI**.

![](/static/mb/device/usb-windows-sendto.jpg)

## Step 5: After transferring the file

* The LED on the back of your Calliope mini flashes during the transfer (which 
    should only take a few seconds).
* Once transferred, the code will run automatically on your Calliope mini. To rerun
   your program, press the reset button on the back of your Calliope mini. The reset 
   button automatically runs the newest file on the Calliope mini.
* By copying the script onto the `MINI` drive, you have programmed it into the
   flash memory on the Calliope mini, which means even after you unplug the Calliope mini,
   your program will still run if the Calliope mini is powered by battery.

## ~hint

Transfer not working? See some [troubleshooting tips](/device/usb/troubleshoot).

## ~
