import {describe, expect, it} from '@jest/globals';
import TYPE from './type.const.js';


const compare = ([a], [b]) => (
    a < b
        ? -1// eslint-disable-line no-magic-numbers
        : (
            a > b
                ? 1
                : 0
        )
);


describe('enum TYPE', () => {

    it(
        'has the correct entries',
        () => expect(
            Object.entries(TYPE).sort(compare),
        ).toEqual(
            [
                ['none', 'none'],
                ['date', 'date'],
                ['dob', 'dob'],
                ['string', 'string'],
                ['number', 'number'],
            ].sort(compare),
        ),
    );
});
