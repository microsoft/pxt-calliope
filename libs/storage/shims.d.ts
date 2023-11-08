// Auto-generated. Do not edit.


    /**
     * Provides access to persistent storage functionality.
     */

declare namespace storage {

    /**
     * Saves a key value pair in the non volatile storage
     * @param key the key for accesing the value
     * @param value value to store
     */
    //% weight=100 blockGap=16
    //% block="Put into %key a value of %value as Int"
    //% blockId=storage_put_value_int
    //%
    //% group="Put"
    //% blockHidden=true value.defl=0 shim=storage::putValueInt
    function putValueInt(key: string, value?: int32): void;

    /**
     * Reads a key value pair from the non volatile storage
     * @param key the key for accesing the value
     */
    //% weight=100 blockGap=16
    //% block="get number from %key"
    //% blockId=storage_get_value_int
    //% group="Get"
    //% blockHidden=true shim=storage::getValueInt
    function getValueInt(key: string): int32;

    /**
     * Removes a key value pair from the non volatile storage
     * @param key the key for accesing the value
     */
    //% weight=100 blockGap=16
    //% block="remove %key"
    //% blockId=storage_remove
    //% group="Remove"
    //% blockHidden=true shim=storage::remove
    function remove(key: string): void;
}

// Auto-generated. Do not edit. Really.
