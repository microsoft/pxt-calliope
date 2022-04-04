
namespace pxsim.storage {

    export function putValueInt(key: string, value: number) : void {
        sessionStorage.setItem('simulatorValue_'+key, value+"");
    }

    export function getValueInt(key: string) : number {
        if(sessionStorage.getItem('simulatorValue_'+key)) {
            return parseFloat(sessionStorage.getItem('simulatorValue_'+key));
        } else {
            return 0;
        }
    }

    export function remove(key: string) : void {
        sessionStorage.removeItem('simulatorValue_'+key);
    }

}