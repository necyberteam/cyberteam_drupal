describe("Resource Documentation Page — Alpha (full data)", () => {

  beforeEach(() => {
    cy.visit("/rp-documentation/test-resource-alpha");
  });

  it("renders the page title and status badges", () => {
    cy.contains("Test Resource Alpha");
    cy.contains("2FA/MFA");
    cy.contains("RP account needed");
  });

  it("renders the SSH login section with dropdown", () => {
    cy.get("#rp-ssh-login-select").should("exist");
    cy.get("#rp-ssh-login-select option").should("have.length", 3);
    cy.contains("RECOMMENDED");
    cy.get("#rp-ssh-hostname").should("contain", "login01.alpha.test.example.edu");
  });

  it("SSH dropdown updates the displayed hostname", () => {
    cy.get("#rp-ssh-login-select").select("login02.alpha.test.example.edu");
    cy.get("#rp-ssh-hostname").should("contain", "login02.alpha.test.example.edu");
  });

  it("renders the OnDemand login button", () => {
    cy.contains("ACCESS OnDemand Login");
    cy.contains("LOGIN").should("have.attr", "href").and("include", "ondemand.alpha.test.example.edu");
  });

  it("renders the file transfer table", () => {
    cy.contains("h2", "File Transfer");
    cy.get(".rp-file-transfer table tbody tr").should("have.length", 3);
    cy.contains("GLOBUS");
    cy.get(".rp-file-transfer").contains("RECOMMENDED");
  });

  it("renders the storage table", () => {
    cy.contains("h2", "Storage");
    cy.get(".rp-storage table tbody tr").should("have.length", 4);
    cy.contains("td", "Home");
    cy.contains("td", "Scratch");
  });

  it("renders external storage section", () => {
    cy.contains("External Storage");
    cy.contains("GETTING MORE STORAGE");
  });

  it("renders queue specs table", () => {
    cy.contains("h2", "Jobs");
    cy.get(".rp-queue-specs table tbody tr").should("have.length", 3);
    cy.contains("td", "gpu-standard");
    cy.contains("td", "gpu-large");
    cy.contains("td", "cpu-shared");
  });

  it("renders top software table", () => {
    cy.contains("h2", "Most Frequently Used Software");
    cy.get(".rp-top-software table tbody tr").should("have.length", 5);
    cy.contains("td", "AlphaFold");
    cy.contains("td", "PyTorch");
  });

  it("renders datasets table", () => {
    cy.contains("h2", "Datasets");
    cy.get(".rp-datasets table tbody tr").should("have.length", 2);
    cy.get(".rp-datasets table").contains("td", "ImageNet-1K");
    cy.get(".rp-datasets table").contains("td", "Common Crawl (2024)");
  });

  it("renders sidebar with support links", () => {
    cy.get(".rp-sidebar").within(() => {
      cy.contains("Get Support");
      cy.contains("User Guide");
      cy.contains("Ticket System");
      cy.contains("OFFICE HOURS");
      cy.contains("Mon 2-4 PM EST");
    });
  });

  it("renders sidebar navigation links", () => {
    cy.get(".rp-sidebar").within(() => {
      cy.contains("Login Information");
      cy.contains("File Transfer");
      cy.contains("Storage");
      cy.contains("Jobs");
      cy.contains("Frequently Used Software");
      cy.contains("Datasets");
    });
  });

});

describe("Resource Documentation Page — Beta (sparse data)", () => {

  beforeEach(() => {
    cy.visit("/rp-documentation/test-resource-beta");
  });

  it("renders the title and description", () => {
    cy.contains("Test Resource Beta");
    cy.contains("CPU-only cluster");
  });

  it("does not render empty sections", () => {
    cy.get(".rp-file-transfer").should("not.exist");
    cy.get(".rp-storage").should("not.exist");
    cy.get(".rp-queue-specs").should("not.exist");
    cy.get(".rp-top-software").should("not.exist");
    cy.get(".rp-datasets").should("not.exist");
    cy.get(".rp-login").should("not.exist");
  });

  it("does not show MFA or account badges", () => {
    cy.contains("2FA/MFA").should("not.exist");
    cy.contains("RP account needed").should("not.exist");
  });

});

describe("Resource Documentation Page — Gamma (partial data)", () => {

  beforeEach(() => {
    cy.visit("/rp-documentation/test-resource-gamma");
  });

  it("renders storage but not file transfer or queues", () => {
    cy.get(".rp-storage").should("exist");
    cy.get(".rp-storage table tbody tr").should("have.length", 2);
    cy.get(".rp-file-transfer").should("not.exist");
    cy.get(".rp-queue-specs").should("not.exist");
  });

  it("shows MFA badge but not account badge", () => {
    cy.contains("2FA/MFA");
    cy.contains("RP account needed").should("not.exist");
  });

  it("renders support sidebar with office hours", () => {
    cy.get(".rp-sidebar").within(() => {
      cy.contains("Support Portal");
      cy.contains("Tue/Thu 10 AM - 12 PM CST");
    });
  });

});
