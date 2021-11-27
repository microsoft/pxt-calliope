
namespace pxsim.storage {

    export function putValue(key: string, value: string) : void {
        sessionStorage.setItem('simulatorValue_'+key, value);
    }

    export function getValue(key: string) : string {
        if(sessionStorage.getItem('simulatorValue_'+key)) {
            return sessionStorage.getItem('simulatorValue_'+key);
        } else {
            return "";
        }
    }

    export function remove(key: string) : void {
        sessionStorage.removeItem('simulatorValue_'+key);
    }

}