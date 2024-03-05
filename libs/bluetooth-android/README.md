# Bluetooth settings for Android and Calliope mini 1 and 2

This extensiion set the BLE settings to make sure they work with the Android App:

```
"bluetooth": {
    "open": 0,
    "security_level": "SECURITY_MODE_ENCRYPTION_NO_MITM",
    "whitelist": 1
}
```

These settings are the default for Calliope mini 3, so this extension is only required to be included for Projects using the Calliope mini 1 or Calliope mini 2.