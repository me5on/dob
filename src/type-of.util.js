import Dob from './dob.class.js';
import T from './type.const.js';


const typeOf = $ => {
    if ($ instanceof Dob) {
        return T.dob;
    }

    if ($ instanceof Date) {
        return T.date;
    }

    if ('number'===typeof $){
        return T.number;
    }

    if ('string' === typeof $) {
        return T.string;
    }

    return T.none;
};

// noinspection JSUnusedGlobalSymbols
export default typeOf;
