describe("Resource Documentation Page — Alpha (full data)", () => {

  beforeEach(() => {
    cy.visit("/rp-documentation/test-resource-alpha");
  });

  it("renders the page title and status badges", () => {
    cy.contains("Test Resource Alpha");
    cy.contains("2FA/MFA");
    cy.contains("RP account needed");
  });

  it("renders login text above the login boxes", () => {
    cy.get(".rp-login .prose").should("exist");
    cy.get(".rp-login .prose").should("contain", "getting started guide");
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

  it("renders login help links outside the SSH box", () => {
    // Login help links should be in the login section but not inside the SSH box
    cy.get(".rp-login").contains("Watch video: INTRODUCTION TO SSH KEYS");
  });

  it("renders account setup link", () => {
    cy.get(".rp-login").contains("Set up your Alpha account")
      .should("have.attr", "href")
      .and("include", "alpha.test.example.edu/account");
  });

  it("renders the file transfer table without Globus boilerplate", () => {
    cy.contains("h2", "File Transfer");
    cy.get(".rp-file-transfer table tbody tr").should("have.length", 3);
    cy.contains("GLOBUS");
    cy.get(".rp-file-transfer").contains("RECOMMENDED");
    // The global "Use Globus for large transfers" text should NOT appear
    cy.get(".rp-file-transfer").should("not.contain", "Use Globus for large transfers");
  });

  it("renders the storage table with plain text paths (no code tags)", () => {
    cy.contains("h2", "Storage");
    cy.get(".rp-storage table tbody tr").should("have.length", 4);
    cy.contains("td", "Home");
    cy.contains("td", "Scratch");
    // Path column should not be wrapped in <code> tags
    cy.get(".rp-storage table td").contains("/home/<username>").then(($td) => {
      expect($td.find("code").length).to.equal(0);
    });
  });

  it("renders external storage section", () => {
    cy.contains("External Storage");
    cy.contains("GETTING MORE STORAGE");
  });

  it("renders jobs info text above queue specs", () => {
    cy.contains("Alpha uses Slurm for job scheduling");
    cy.contains("sbatch");
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
    cy.contains("td", "python");
    cy.contains("td", "gromacs");
    cy.get(".rp-top-software").contains("XDMoD");
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

  it("renders sidebar software list link", () => {
    cy.get(".rp-sidebar").contains("View all available software")
      .should("have.attr", "href")
      .and("include", "alpha.test.example.edu/software");
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

  it("uses 'Software Documentation Service' label for SDS", () => {
    cy.contains("Software Documentation Service");
  });

  it("QA bot has resource group context", () => {
    // Alpha is in "Test Resource Group" — bot should get the group name
    cy.get(".embedded-qa-bot")
      .should("have.attr", "data-resource-context", "test-resource-group");
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

  it("renders login section with help links but no SSH or OnDemand", () => {
    // Gamma has login_help_links and account_setup_url but no SSH logins or OnDemand
    cy.get(".rp-login").should("exist");
    cy.get("#rp-ssh-login-select").should("not.exist");
    cy.contains("ACCESS OnDemand Login").should("not.exist");
    cy.get(".rp-login").contains("Gamma SSH Guide");
    cy.get(".rp-login").contains("Set up your Gamma account");
  });

  it("renders support sidebar with office hours", () => {
    cy.get(".rp-sidebar").within(() => {
      cy.contains("Support Portal");
      cy.contains("Tue/Thu 10 AM - 12 PM CST");
    });
  });

  it("QA bot falls back to resource title when not in a group", () => {
    // Gamma is not in a resource group — bot gets its own title
    cy.get(".embedded-qa-bot")
      .should("have.attr", "data-resource-context", "test-resource-gamma");
  });

});
