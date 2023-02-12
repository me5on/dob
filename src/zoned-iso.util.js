const n = $ => Number.isNaN($);

// pad 2
const p = $ => {
    if (1 > $) {
        return '00';
    }
    if (10 > $) { // eslint-disable-line no-magic-numbers
        return `0${$}`;
    }
    return `${$}`;
};

// pad 3
const q = $ => {
    if (1 > $) {
        return '000';
    }
    if (10 > $) { // eslint-disable-line no-magic-numbers
        return `00${$}`;
    }
    if (100 > $) { // eslint-disable-line no-magic-numbers
        return `0${$}`;
    }
    return `${$}`;
};


// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString

// eslint-disable-next-line max-lines-per-function
const zonedIso = $ => {
    //
    if (!($ instanceof Date)) {
        return '';
    }

    // first part
    const Y = $.getFullYear();
    const M = $.getMonth() + 1;
    const D = $.getDate();

    if (n(Y) || n(M) || n(D)) {
        return '';
    }

    // T part
    const h = $.getHours();
    const m = $.getMinutes();
    const s = $.getSeconds();

    // . part
    const k = $.getMilliseconds();

    if (n(h) || n(m) || n(s) || n(k)) {
        return '';
    }

    // Z part
    const tzo = -$.getTimezoneOffset();
    const abs = Math.abs(tzo);

    if (n(tzo)) {
        return '';
    }

    const zs = 0 <= tzo ? '+' : '-';
    const zh = Math.floor(abs / 60); // eslint-disable-line no-magic-numbers
    const zm = abs % 60; // eslint-disable-line no-magic-numbers

    return `${p(Y)}-${p(M)}-${p(D)}T${p(h)}:${p(m)}:${p(s)}.${q(k)}${zs}${p(zh)}:${p(zm)}`;
};

// noinspection JSUnusedGlobalSymbols
export default zonedIso;
