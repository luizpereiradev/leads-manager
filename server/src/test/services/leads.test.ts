import sinon from "sinon";
import { expect } from "chai";
import { leads } from "../../models";
import { leads as leadsService } from "../../services";
import { newValidLead, completeLead, newInvalidLead } from "../mocks/leads";

describe("Leads Service", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("insert", () => {
    it("should return error if lead is invalid", async () => {
      const result = await leadsService.insert(newInvalidLead);
      expect(result.type).to.equal("VALIDATION_ERROR");
    });

    it("do not return error if lead is valid, return new lead", async () => {
      sinon.stub(leads, "insert").resolves(completeLead);
      const result = await leadsService.insert(newValidLead);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(completeLead);
    });
  });

  describe("getId", () => {
    it("should return error if lead is not found", async () => {
      sinon.stub(leads, "getId").resolves(null);
      const result = await leadsService.getId(1);
      expect(result.type).to.equal("ID_NOT_FOUND");
    });

    it("should return lead if lead is found", async () => {
      sinon.stub(leads, "getId").resolves(completeLead);
      const result = await leadsService.getId(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(completeLead);
    });
  });

  describe("getAll", () => {
    it("should return leads if leads are found", async () => {
      sinon.stub(leads, "getAll").resolves([completeLead]);
      const result = await leadsService.getAll();
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal([completeLead]);
    });
  });

  describe("updateLead", () => {
    it("return updated lead", async () => {
      sinon.stub(leads, "updateLead").resolves(completeLead);
      const result = await leadsService.updateLead(1, newValidLead);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(completeLead);
    });

    it("return error if lead is not found", async () => {
      sinon.stub(leads, "updateLead").resolves(undefined);
      const result = await leadsService.updateLead(1, newValidLead);
      expect(result.type).to.equal("ID_NOT_FOUND");
    });
  });

  describe("getByName", () => {
    it("return lead by name", async () => {
      sinon.stub(leads, "getByName").resolves([completeLead]);
      const result = await leadsService.getByName("a");
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal([completeLead]);
    });
  });
});
