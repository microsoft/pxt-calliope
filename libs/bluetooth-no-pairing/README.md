# Bluetooth settings for Android and Calliope mini 1 and 2

This extension set the BLE settings to make sure they work for iOS and Calliope mini 1 and 2:

```
"bluetooth": {
    "open": 0,
    "security_level": "SECURITY_MODE_ENCRYPTION_NO_MITM",
    "whitelist": 1
}
```

These settings are the default for Calliope mini 1 and 2, so this extension is only required to be included for Calliope mini 1 and 2 Projects where "bluetooth-pairing" was loaded before.