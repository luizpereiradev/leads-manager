import sinon from "sinon";
import { expect } from "chai";
import { leads } from "../../controllers";
import { leads as leadsService } from "../../services";
import { newValidLead, completeLead } from "../mocks/leads";

describe("Leads Service", () => {
  afterEach(() => {
    sinon.restore();
  });
  describe("insert", () => {
    it("should return ", async () => {
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
  });
});
