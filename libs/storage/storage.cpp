#include "pxt.h"

/**
 * Provides access to persistent storage functionality.
 */
namespace storage {

    // Define a global variable to keep track of the time of the last write
    unsigned long lastWriteTime = 0;

    /**
     * Saves a key value pair in the non volatile storage
     * @param key the key for accesing the value
     * @param value value to store
     */
    //% weight=100 blockGap=16
    //% block="Put into %key a value of %value as Int"
    //% blockId=storage_put_value_int
    //% value.defl=0
    //% group="Put"
    //% blockHidden=true
    void putValueInt(String key, int value) {
        ManagedString managedKey = MSTR(key);

        unsigned long currentTime = uBit.systemTime(); // Get the current time

        // Check if the time elapsed since the last write is within 1 second
        if (currentTime - lastWriteTime < 5000) {
            uBit.sleep(3000); // Introduce a 1000-millisecond delay
        }

        uBit.storage.put(managedKey, (uint8_t *)&value, sizeof(int));

        // Update the time of the last write
        lastWriteTime = uBit.systemTime(); 
    }

    /**
     * Reads a key value pair from the non volatile storage
     * @param key the key for accesing the value
     */
    //% weight=100 blockGap=16
    //% block="get number from %key"
    //% blockId=storage_get_value_int
    //% group="Get"
    //% blockHidden=true
    int getValueInt(String key) {
       KeyValuePair* data = uBit.storage.get(MSTR(key));
       int stored;
       if(data == NULL) {
         return 0;
        } else {
          memcpy(&stored, data->value, sizeof(int));
          delete data;
          return stored;
        }
    }

    /**
     * Removes a key value pair from the non volatile storage
     * @param key the key for accesing the value
     */
    //% weight=100 blockGap=16
    //% block="remove %key"
    //% blockId=storage_remove
    //% group="Remove"
    //% blockHidden=true
    void remove(String key) {
       uBit.storage.remove(MSTR(key));
    }

}