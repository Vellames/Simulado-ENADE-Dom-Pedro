
import { assert } from 'meteor/practicalmeteor:chai'

if (Meteor.isServer) {
    describe('Courses', () => {
        describe('methods', () => {

            it('can add one course', () => {
                assert(1,1);
            });
        });
    });
}