import sinon from 'sinon';
import { expect } from 'chai';
import { leads } from '../../models';
import { leads as leadsService } from '../../services';
import { newValidLead, completeLead, newInvalidLead } from '../mocks/leads';

describe('Leads Service', () => {
    afterEach(() => {
        sinon.restore();
    });
    describe('insert', () => {
        it('should return error if lead is invalid', async () => {
            const result = await leadsService.insert(newInvalidLead);
            expect(result.type).to.equal('VALIDATION_ERROR');
        });

        it('do not return error if lead is valid, return new lead', async () => {
            sinon.stub(leads, 'insert').resolves(completeLead);
            const result = await leadsService.insert(newValidLead);
            expect(result.type).to.equal(null);
            expect(result.message).to.equal(completeLead);
        });
    });
});