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
      expect(result).to.deep.equal(completeLead);
    });
  });

  describe("getId", () => {
    it("return lead by id", async () => {
      prisma.lead.findUnique = sinon.stub().resolves(completeLead);
      const result = await leads.getId(1);
      expect(result).to.deep.equal(completeLead);
    });
  });

  describe("getAll", () => {
    it("should return leads if leads are found", async () => {
      prisma.lead.findMany = sinon.stub().resolves([completeLead]);
      const result = await leads.getAll();
      expect(result).to.deep.equal([completeLead]);
    });
  });

  describe("updateLead", () => {
    it("return updated lead", async () => {
      prisma.lead.update = sinon.stub().resolves(completeLead);
      const result = await leads.updateLead(1, newValidLead);
      expect(result).to.deep.equal(completeLead);
    });

    it("return null if lead is not found", async () => {
      prisma.lead.update = sinon.stub().resolves(null);
      const result = await leads.updateLead(1, newValidLead);
      expect(result).to.equal(null);
    });
  });

  describe("getByName", () => {
    it("return lead by name", async () => {
      prisma.lead.findUnique = sinon.stub().resolves(completeLead);
      const result = await leads.getByName("name");
      expect(result).to.deep.equal([completeLead]);
    });
  });
});
