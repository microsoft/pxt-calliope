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

let storagesStr = ['s1', 's2', 's3', 's4', 's5', 's6', 's7'];
let storagesInt = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7'];

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
    //% block="Save into string %key a value of %value"
    //% blockId=storage_put_string
    //% value.shadowOptions.toString=true
    //% group="Put"
    export function putString(key: StorageSlots, value: string) : void {
       putValue(storagesStr[key], value);
    }


      /**
     * Saves a key value pair in the non volatile storage
     * @param key the key for accesing the value
     * @param value value to store
     */
    //% weight=100 blockGap=16
    //% block="Save into number %key a value of %value"
    //% blockId=storage_put_number
    //% group="Put"
    export function putNumber(key: StorageSlots, value: number) : void {
      let managedValue = Math.floor(value * 100);
       putValueInt(storagesInt[key], managedValue);
    }

    /**
     * Reads a key value pair from the non volatile storage as a number
     * @param key the key for accesing the value
     */
    //% weight=100 blockGap=16
    //% block="read from number %key"
    //% blockId=storage_get_number
    //% group="Get"
    export function getNumber(key: StorageSlots) : number {
       let value = getValueInt(storagesInt[key]);
      return value / 100;
    }

    /**
     * Reads a key value pair from the non volatile storage as a string
     * @param key the key for accesing the value
     */
    //% weight=100 blockGap=16
    //% block="read from string %key"
    //% blockId=storage_get_string
    //% group="Get"
    export function getString(key: StorageSlots) : string {
      return getValue(storagesStr[key]);
   }

    /**
     * Deletes the key from the non volatile storage
     * @param key the key for accesing the value
     */
    //% weight=100 blockGap=16
    //% block="Clear string %key"
    //% blockId=storage_remove_key_string
    //% group="Remove"
    export function removeKeyStr(key: StorageSlots) : void {
      remove(storagesStr[key]);
    }

    /**
     * Deletes the key from the non volatile storage
     * @param key the key for accesing the value
     */
    //% weight=100 blockGap=16
    //% block="Clear number %key"
    //% blockId=storage_remove_key_int
    //% group="Remove"
    export function removeKeyInt(key: StorageSlots) : void {
      remove(storagesInt[key]);
    }


}