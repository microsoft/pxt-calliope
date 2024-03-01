# Bluetooth services disabled

This extensions disables the BLE in the program.

If this extension is included into the Project it will stop loading the BLE stack.

Pressing A+B+Reset or Tripple-Reset is then required to restart into DFU-Mode for flashing the Calliope mini via Bluetooth.

```
"bluetooth": {
    "enabled": 0
}
```