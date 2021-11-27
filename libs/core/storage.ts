enum StorageSlots {
  //% block="Slot 1"
  s1 = 0,
  //% block="Slot 2"
  s2 = 1,
  //% block="Slot 3"
  s3 = 2,
  //% block="Slot 4"
  s4 = 3,
  //% block="Slot 5"
  s5 = 4,
  //% block="Slot 6"
  s6 = 5,
  //% block="Slot 7"
  s7 = 6,
}

let storages = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12'];

/**
 * Provides access to persistent storage functionality.
 */
//% color=#FFBB00 weight=10 icon="\uf187"
//% advanced=true
namespace storage {

    /**
     * Saves a key value pair in the non volatile storage
     * @param key the key for accesing the value
     * @param value value to store
     */
    //% weight=100 blockGap=16
    //% block="Save into %key a value of %value"
    //% blockId=storage_put_string
    //% value.shadowOptions.toString=true
    //% group="Put"
    export function putString(key: StorageSlots, value: string) : void {
       putValue(storages[key], value);
    }

    /**
     * Reads a key value pair from the non volatile storage as a number
     * @param key the key for accesing the value
     */
    //% weight=100 blockGap=16
    //% block="read from %key as number"
    //% blockId=storage_get_number
    //% group="Get"
    export function getNumber(key: StorageSlots) : number {
       let value = getValue(storages[key]);
        if(value === '') {
          return 0;
        } else {
          return parseFloat(value);
        }
    }

    /**
     * Reads a key value pair from the non volatile storage as a string
     * @param key the key for accesing the value
     */
    //% weight=100 blockGap=16
    //% block="read from %key"
    //% blockId=storage_get_string
    //% group="Get"
    export function getString(key: StorageSlots) : string {
      return getValue(storages[key]);
   }

    /**
     * Deletes the key from the non volatile storage
     * @param key the key for accesing the value
     */
    //% weight=100 blockGap=16
    //% block="Clear %key"
    //% blockId=storage_remove_key
    //% group="Remove"
    export function removeKey(key: StorageSlots) : void {
      remove(storages[key]);
    }


}