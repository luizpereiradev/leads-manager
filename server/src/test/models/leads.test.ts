import sinon from "sinon";
import { expect } from "chai";
import prisma from "../../libs/prisma";
import { leads } from "../../models";
import { newValidLead, completeLead } from "../mocks/leads";

describe("Leads Model", () => {
  afterEach(() => {
    sinon.restore();
  });
  describe("insert", () => {
    it("return new lead", async () => {
      prisma.lead.create = sinon.stub().resolves(completeLead);
      const result = await leads.insert(newValidLead);
      expect(result).to.equal(completeLead);
    });
  });
  describe("getId", () => {
    it("return lead by id", async () => {
      prisma.lead.findUnique = sinon.stub().resolves(completeLead);
      const result = await leads.getId(1);
      expect(result).to.equal(completeLead);
    });
  });
});
