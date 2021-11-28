
namespace pxsim.storage {

    export function putValue(key: string, value: string) : void {
        sessionStorage.setItem('simulatorValue_'+key, value);
    }

    export function putValueInt(key: string, value: number) : void {
        sessionStorage.setItem('simulatorValue_'+key, value+"");
    }

    export function getValue(key: string) : string {
        if(sessionStorage.getItem('simulatorValue_'+key)) {
            return sessionStorage.getItem('simulatorValue_'+key);
        } else {
            return "";
        }
    }

    export function getValueInt(key: string) : number {
        if(sessionStorage.getItem('simulatorValue_'+key)) {
            return parseFloat(sessionStorage.getItem('simulatorValue_'+key));
        } else {
            return 0;
        }
    }

    export function removeStr(key: string) : void {
        sessionStorage.removeItem('simulatorValue_'+key);
    }

    export function removeInt(key: string) : void {
        sessionStorage.removeItem('simulatorValue_'+key);
    }

}