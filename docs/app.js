const issuesContainer = document.getElementById("issues");

const repo = "OPLM/oplm-feedback";
const apiUrl = `https://api.github.com/repos/${repo}/issues?state=open&per_page=20`;

fetch(apiUrl)
  .then(res => res.json())
  .then(issues => {
    issuesContainer.innerHTML = issues
      .filter(issue => !issue.pull_request)
      .map(issue => `
        <div class="issue">
          <h3>
            <a href="${issue.html_url}" target="_blank">
              ${issue.title}
            </a>
          </h3>
          <p>${issue.body?.slice(0, 140) || ""}...</p>
          <small>
            Labels: ${issue.labels.map(l => l.name).join(", ")}
          </small>
        </div>
      `)
      .join("");
  })
  .catch(err => {
    issuesContainer.innerHTML = "Failed to load issues.";
    console.error(err);
  });
