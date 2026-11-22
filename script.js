const list = document.querySelector("#repo-list");
const status = document.querySelector("#status");

async function loadRepositories() {
	  try {
		      const response = await fetch("./events.json");

		      if (!response.ok) {
			            throw new Error(`Could not load repository data (${response.status})`);
			          }

		      const repositories = await response.json();

		      if (!Array.isArray(repositories) || repositories.length === 0) {
			            status.textContent = "No starred repositories to show yet.";
			            return;
			          }

		      for (const repository of repositories) {
			            const item = document.createElement("li");
			            item.className = "repo";

			            const title = document.createElement("h2");
			            const link = document.createElement("a");
			            link.href = repository.url;
			            link.textContent = `${repository.owner}/${repository.name}`;
			            link.target = "_blank";
			            link.rel = "noopener noreferrer";
			            title.append(link);

			            const description = document.createElement("p");
			            description.textContent = repository.description || "No description provided.";

			            const meta = document.createElement("div");
			            meta.className = "meta";
			            meta.textContent =
				              [repository.language, `? ${repository.stars}`].filter(Boolean).join(" · ");

			            item.append(title, description, meta);
			            list.append(item);
			          }

		      status.textContent = "";
		    } catch (error) {
			        status.textContent = "Could not load repositories. Try again later.";
			        console.error(error);
			      }
}

loadRepositories();

