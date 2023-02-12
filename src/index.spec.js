import {describe, expect, it} from '@jest/globals';
import Dob from './dob.class.js';
import dob from './index.js';


describe('function dob', () => {

    it('is the Dob.from function', () => {
        expect(dob).toBe(Dob.from);
    });

});
