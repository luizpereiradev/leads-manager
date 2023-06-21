import sinon from "sinon";
import { expect } from "chai";
import { leads } from "../../controllers";
import { leads as leadsService } from "../../services";
import { newValidLead, completeLead, newInvalidLead } from "../mocks/leads";

describe("Leads Controller", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("insert", () => {
    it("should return lead if insert", async () => {
      sinon
        .stub(leadsService, "insert")
        .resolves({ type: null, message: completeLead });
      const req: any = {
        body: newValidLead,
      };
      const res: any = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      await leads.insert(req, res);
      expect(res.status.calledWith(201)).to.be.true;
    });

    it("should return error if lead is invalid", async () => {
      sinon.stub(leadsService, "insert").resolves({
        type: "VALIDATION_ERROR",
        message: {
          message: "Invalid lead",
          errors: [
            {
              path: ["name"],
              message: "Name is required",
            },
          ],
        },
      });
      const req: any = {
        body: newInvalidLead,
      };
      const res: any = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      await leads.insert(req, res);
      expect(res.status.calledWith(400)).to.be.true;
    });
  });

  describe("getId", () => {
    it("should return lead if lead is found", async () => {
      sinon
        .stub(leadsService, "getId")
        .resolves({ type: null, message: completeLead });
      const req: any = {
        params: {
          id: 1,
        },
      };
      const res: any = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      await leads.getId(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it("should return error if lead is not found", async () => {
      sinon
        .stub(leadsService, "getId")
        .resolves({ type: "ID_NOT_FOUND", message: "Lead not found" });
      const req: any = {
        params: {
          id: 1,
        },
      };
      const res: any = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      await leads.getId(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });
  });
  describe("getAll", () => {
    it("should return leads if leads are found", async () => {
        sinon
            .stub(leadsService, "getAll")
            .resolves({ type: null, message: [completeLead] });
        const req: any = {};
        const res: any = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis(),
        };
        await leads.getAll(req, res);
        expect(res.status.calledWith(200)).to.be.true;
    });
  });
});
