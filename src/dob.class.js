import typeOf from './type-of.util.js';
import T from './type.const.js';
import zonedIso from './zoned-iso.util.js';


const isLocal = $ => !($.endsWith('Z') || ($).match(/[+-]\d+:?\d+$/u));

class Dob {

    #val;

    #typ;

    #loc;

    #bad;

    #dat;

    #iso;

    #num;

    // eslint-disable-next-line max-lines-per-function
    constructor($) {

        const t = typeOf($);

        if (T.dob === t) {
            this.#val = $.#val;
            this.#typ = $.#typ;
            this.#dat = $.#dat;
            this.#iso = $.#iso;
            this.#num = $.#num;
            this.#bad = $.#bad;
            this.#loc = $.#loc;
            return;
        }

        this.#val = $;
        this.#typ = t;

        if (T.none === this.#typ) {
            this.#num = NaN;
            this.#dat = new Date(NaN);
            this.#bad = true;
            this.#loc = false;
            this.#iso = '';
        }

        if (T.date === this.#typ) {
            this.#num = this.#val.getTime();
            this.#dat = this.#val;
            this.#bad = Number.isNaN(this.#num);
            this.#loc = !this.#val.getTimezoneOffset();
            this.#iso = this.#bad ? '' : this.#val.toISOString();
        }

        if (T.string === this.#typ) {
            this.#num = Date.parse(this.#val);
            this.#dat = new Date(this.#num);
            this.#bad = Number.isNaN(this.#dat.getTime());
            this.#loc = this.#bad ? false : isLocal(this.#val);
            this.#iso = this.#bad ? '' : this.#loc ? zonedIso(this.#dat) : this.#dat.toISOString();
        }

        if (T.number === this.#typ) {
            this.#num = this.#val;
            this.#dat = new Date(this.#num);
            this.#bad = Number.isNaN(this.#dat.getTime());
            this.#loc = false;
            this.#iso = this.#bad ? '' : this.#dat.toISOString();
        }

    }

    static from(...$$) {
        return Object.freeze(new Dob(...$$));
    }

    // noinspection JSUnusedGlobalSymbols
    asUtced = () => {

        if (!this.#loc) {
            return this;
        }

        const iso = this.#dat.toISOString();

        const dob = new Dob(this);
        dob.#loc = false;
        dob.#iso = iso;
        dob.#val = iso;
        return Object.freeze(dob);
    };

    // noinspection JSUnusedGlobalSymbols
    asZoned = $ => {

        if (!Number.isSafeInteger($)) {
            return Object.freeze(new Dob(NaN));
        }

        const abs = Math.abs($);
        const num = this.#num + $ * 60_000; // eslint-disable-line no-magic-numbers
        const str = Number.isNaN(num) ? '' : new Date(num).toISOString();


        const s = 0 <= $ ? '+' : '-';
        const h = Math.floor(abs / 60); // eslint-disable-line no-magic-numbers
        const m = abs % 60; // eslint-disable-line no-magic-numbers


        // eslint-disable-next-line no-magic-numbers
        const r = str.replace('Z', `${s}${10 > h ? '0' : ''}${h}:${10 > m ? 0 : ''}${m}`);
        const dob = new Dob(r);
        return Object.freeze(dob);
    };

    // noinspection JSUnusedGlobalSymbols
    toPlain = () => ({
        val: this.#val,
        typ: this.#typ,
        loc: this.#loc,
        bad: this.#bad,
        dat: this.#dat,
        iso: this.#iso,
        num: this.#num,
    });

}


export default Dob;
