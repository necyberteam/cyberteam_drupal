describe("Resource Documentation Page — Alpha (full data)", () => {

  beforeEach(() => {
    cy.visit("/documentation/resources/test-resource-alpha");
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

  it("SSH dropdown updates the displayed hostname and placeholder", () => {
    cy.get("#rp-ssh-login-select").select("login02.alpha.test.example.edu");
    cy.get("#rp-ssh-hostname").should("contain", "login02.alpha.test.example.edu");
    // login02 has no explicit placeholder — falls back to the default.
    cy.get("#rp-ssh-placeholder").should("contain", "<your_username>");
  });

  it("SSH dropdown shows docs link when a node has one", () => {
    // login03 has a docs URL configured; switching to it should reveal the link.
    cy.get("#rp-ssh-docs").should("have.class", "hidden");
    cy.get("#rp-ssh-login-select").select("login03.alpha.test.example.edu");
    cy.get("#rp-ssh-docs").should("not.have.class", "hidden");
    cy.get("#rp-ssh-docs-link").should("have.attr", "href").and("include", "docs.example.edu/alpha/login03");
  });

  it("renders the OnDemand login button with the editor-provided label", () => {
    // Section heading is fixed; the button label comes from the link field's
    // optional title (uppercased) — falls back to "LOGIN" when blank.
    cy.contains("ACCESS OnDemand Login");
    cy.contains("ACCESS ONDEMAND").should("have.attr", "href").and("include", "ondemand.alpha.test.example.edu");
  });

  it("renders login help links outside the SSH box", () => {
    cy.get(".rp-login").contains("Watch video: INTRODUCTION TO SSH KEYS");
  });

  it("renders the Jump-to anchor nav with icons", () => {
    cy.get(".rp-jump-to").should("exist");
    cy.get(".rp-jump-to").within(() => {
      cy.contains("Login").should("have.attr", "href", "#rp-login");
      cy.contains("File Transfer").should("have.attr", "href", "#rp-file-transfer");
      cy.contains("Storage").should("have.attr", "href", "#rp-storage");
      cy.contains("Jobs").should("have.attr", "href", "#rp-jobs");
      cy.contains("Software").should("have.attr", "href", "#rp-software");
      cy.contains("Datasets").should("have.attr", "href", "#rp-datasets");
    });
  });

  it("renders the RP Account Setup CTA in the sidebar", () => {
    // Sidebar uses CIDeR short_name ("Alpha") rather than the long descriptive title.
    cy.get(".rp-sidebar").contains("GET AN ACCOUNT ON ALPHA");
    cy.get(".rp-sidebar").contains("Set up your Alpha account")
      .should("have.attr", "href")
      .and("include", "alpha.test.example.edu/account");
  });

  it("renders the file transfer table without Globus boilerplate", () => {
    cy.contains("h2", "File Transfer");
    cy.get(".rp-file-transfer table tbody tr").should("have.length", 3);
    cy.contains("GLOBUS");
    cy.get(".rp-file-transfer").contains("RECOMMENDED");
    cy.get(".rp-file-transfer").should("not.contain", "Use Globus for large transfers");
    // Editor-provided link text overrides the raw URL.
    cy.get(".rp-file-transfer").contains("a", "Globus").should("have.attr", "href").and("include", "app.globus.org");
    cy.get(".rp-file-transfer").should("not.contain", "https://app.globus.org");
  });

  it("renders the storage table with plain text paths (no code tags)", () => {
    cy.contains("h2", "Storage");
    cy.get(".rp-storage table tbody tr").should("have.length", 4);
    cy.contains("td", "Home");
    cy.contains("td", "Scratch");
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

  it("renders sidebar with support links (Alpha's own values override the Group)", () => {
    cy.get(".rp-sidebar").within(() => {
      cy.contains("Get Support");
      // Alpha sets its own support_links, so Group values must not leak through.
      cy.contains("User Guide");
      cy.contains("Ticket System");
      cy.should("not.contain.text", "Group User Guide");
      cy.should("not.contain.text", "Group Ticket System");

      cy.contains("OFFICE HOURS");
      cy.contains("Mon 2-4 PM EST");
      cy.should("not.contain.text", "Fri 3-5 PM EST");
    });
  });

  it("renders sidebar software list link (Alpha's own value, not the Group's)", () => {
    cy.get(".rp-sidebar").contains("View all available software")
      .should("have.attr", "href")
      .and("include", "alpha.test.example.edu/software");
    cy.get(".rp-sidebar").should("not.contain.text", "View all group software");
  });

  it("uses 'Software Documentation Service' label for SDS", () => {
    cy.contains("Software Documentation Service");
  });

  it("QA bot has resource group context", () => {
    cy.get(".embedded-qa-bot")
      .should("have.attr", "data-resource-context", "test-resource-group");
  });

});

describe("Resource Documentation Page — Beta (sparse data, in Test Resource Group)", () => {

  beforeEach(() => {
    cy.visit("/documentation/resources/test-resource-beta");
  });

  it("renders the title and description", () => {
    cy.contains("Test Resource Beta");
    cy.contains("CPU-only cluster");
  });

  it("does not render empty main-content sections", () => {
    cy.get(".rp-file-transfer").should("not.exist");
    cy.get(".rp-storage").should("not.exist");
    cy.get(".rp-queue-specs").should("not.exist");
    cy.get(".rp-top-software").should("not.exist");
    cy.get(".rp-datasets").should("not.exist");
    cy.get(".rp-login").should("not.exist");
  });

  it("does not render the jump-to anchor nav when every section is empty", () => {
    cy.get(".rp-jump-to").should("not.exist");
  });

  it("does not show MFA or account badges", () => {
    cy.contains("2FA/MFA").should("not.exist");
    cy.contains("RP account needed").should("not.exist");
  });

  it("inherits support_links from the Resource Group", () => {
    cy.get(".rp-sidebar").within(() => {
      cy.contains("Get Support");
      cy.contains("Group User Guide");
      cy.contains("Group Ticket System");
    });
  });

  it("inherits office_hours from the Resource Group", () => {
    cy.get(".rp-sidebar").within(() => {
      cy.contains("OFFICE HOURS");
      cy.contains("Fri 3-5 PM EST");
    });
  });

  it("inherits software_list_url from the Resource Group", () => {
    cy.get(".rp-sidebar").contains("View all group software")
      .should("have.attr", "href")
      .and("include", "group.test.example.edu/software");
  });

});

describe("Resource Documentation Page — Gamma (partial data)", () => {

  beforeEach(() => {
    cy.visit("/documentation/resources/test-resource-gamma");
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
  });

  it("renders RP Account Setup CTA in the sidebar", () => {
    // Sidebar uses CIDeR short_name ("Gamma") rather than the long descriptive title.
    cy.get(".rp-sidebar").contains("GET AN ACCOUNT ON GAMMA");
    cy.get(".rp-sidebar").contains("Set up your Gamma account");
  });

  it("jump-to nav only includes sections that exist", () => {
    cy.get(".rp-jump-to").should("exist");
    cy.get(".rp-jump-to").contains("Storage");
    cy.get(".rp-jump-to").should("not.contain.text", "File Transfer");
    cy.get(".rp-jump-to").should("not.contain.text", "Jobs");
  });

  it("renders support sidebar with office hours from its own values (not inherited)", () => {
    cy.get(".rp-sidebar").within(() => {
      cy.contains("Support Portal");
      cy.contains("Tue/Thu 10 AM - 12 PM CST");
      // Gamma isn't in the Test Resource Group, so Group values never apply.
      cy.should("not.contain.text", "Group User Guide");
      cy.should("not.contain.text", "Fri 3-5 PM EST");
    });
  });

  it("QA bot falls back to resource title when not in a group", () => {
    cy.get(".embedded-qa-bot")
      .should("have.attr", "data-resource-context", "test-resource-gamma");
  });

});
