module.exports = url => {
  describe(url, () => {
    it("mobile", () => {
      cy.captureMobile(url);
    });
    // it("tablet", () => cy.captureTablet(url));
    // it("desktop", () => cy.captureDesktop(url));
  });
};
