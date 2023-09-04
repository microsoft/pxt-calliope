#include "pxt.h"

/**
 * Provides access to persistent storage functionality.
 */
namespace storage {
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
        uBit.storage.put(managedKey, (uint8_t *)&value, sizeof(int));     
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