import {describe, expect, it} from '@jest/globals';
import Dob from './dob.class.js';


describe('class dob', () => {

    it('is a constructor function', () => {
        expect(Dob).toBeInstanceOf(Function);
        expect(typeof Dob).toBe('function');

        // noinspection JSValidateTypes
        expect(() => Dob()).toThrow(); // eslint-disable-line new-cap

    });

    it('returns a Dob object', () => {
        expect(new Dob()).toBeInstanceOf(Dob);
    });

});
