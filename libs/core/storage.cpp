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
    //% block="Put into %key a value of %value as number"
    //% blockId=storage_put_value
    //% value.defl=0
    //% group="Put"
    //% blockHidden=true
    void putValue(String key, String value) {
            uBit.storage.put(MSTR(key), (uint8_t *)&value, sizeof(int));      
    }

    /**
     * Reads a key value pair from the non volatile storage
     * @param key the key for accesing the value
     */
    //% weight=100 blockGap=16
    //% block="get number from %key"
    //% blockId=storage_get_value
    //% group="Get"
    //% blockHidden=true
    String getValue(String key) {
       KeyValuePair* data = uBit.storage.get(MSTR(key));
       String stored;
       if(data == NULL) {
         return mkString("", -1);
        } else {
          memcpy(&stored, data->value, sizeof(int));
          delete data;
          return stored;
        }
    }

    /**
     * Reads a key value pair from the non volatile storage
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