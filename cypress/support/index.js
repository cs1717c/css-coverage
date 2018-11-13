const slugify = require("slugify");

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

const viewPorts = {
  mobile: {
    width: 450,
    height: 600,
    deviceCharacteristics: {
      is_mobile: "true",
      is_tablet: "false"
    }
  },
  tablet: {
    width: 750,
    height: 800,
    deviceCharacteristics: {
      is_mobile: "true",
      is_tablet: "true"
    }
  },
  desktop: {
    width: 1024,
    height: 800
  }
};

const capture = (url, viewPortName) => {
  const viewPortConfig = viewPorts[viewPortName];
  cy.setCookie(
    "x-dev-device-characteristics",
    viewPortConfig.deviceCharacteristics
      ? JSON.stringify(viewPortConfig.deviceCharacteristics)
      : ""
  );
  cy.viewport(viewPortConfig.width, viewPortConfig.height);
  cy.visit(url);
  cy.get("#main-content").scrollIntoView();
  cy.get("#client_app").scrollIntoView({
    duration: 30000
  });
  cy.window().then(window =>
    cy.writeFile(
      `html/${viewPortName}/${slugify(url)}.html`,
      `<html>${window.document.body.outerHTML}</html>`,
      "utf8"
    )
  );
};

Cypress.Commands.add("captureMobile", url => {
  capture(url, "mobile");
});

Cypress.Commands.add("captureTablet", url => {
  capture(url, "tablet");
});

Cypress.Commands.add("captureDesktop", url => {
  capture(url, "desktop");
});
