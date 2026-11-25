# Module 5 — Integration, Deployment & Evaluation

Course: **23CS3AEFWD / 22CS3AEFWD** · BMSCE CSE, 3rd semester  
This module is **end to end**: the UI talks to Express, and Express talks to a database. A new campus issue stays after refresh.

Pick **one** folder. Each is independent — do not mix a client from one track with a server from another.

| Folder | Stack | UI from Module 3 | API + DB from Module 4 |
| --- | --- | --- | --- |
| [`MERN/`](MERN/) | MongoDB, Express, **React**, Node | React SPA | Express + MongoDB |
| [`MEAN/`](MEAN/) | MongoDB, Express, **Angular**, Node | Angular SPA | Express + MongoDB |
| [`MERN_1/`](MERN_1/) | MySQL, Express, **React**, Node | React SPA | Express + MySQL |
| [`MEAN_1/`](MEAN_1/) | MySQL, Express, **Angular**, Node | Angular SPA | Express + MySQL |

Open that folder’s `readme.md` and follow it in order: install the database (if needed) → seed → start **server** (port 3000) → start **client** (5173 or 4200) → click through Home / Issues / Report.

Each track lists **macOS (Terminal)** and **Windows (PowerShell)** commands. Linux students can use the macOS commands. On Windows PowerShell, type `curl.exe` (not `curl`).

Slides: `Module_5_Integration_Deployment_and_Evaluation.pptx`  
Ignore `generate_module5_ppt.py`. That file is only for rebuilding the slides.

## What this module is for

- Experiment **6** from the UI: list, insert, update, and delete issues without curl.
- Connecting the Module 3 SPA to the Module 4 `/api/issues` API.
- Git and GitHub so the team can share the project: account, first check-in, branches, pull requests, and merge. Full steps: [`github.md`](github.md). Hosting on Vercel is **Module 6**.

## What this module does not include

No cloud account is required to run the lab on localhost. Do not run two servers on port 3000 at the same time. To put one of these apps on a public URL, follow [`../Module_6/readme.md`](../Module_6/readme.md).
