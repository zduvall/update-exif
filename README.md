# Update EXIF

Tools for inspecting and updating photo EXIF metadata — available as both a lightweight command-line tool and a cross-platform desktop application.

[![Python](https://img.shields.io/static/v1?label=CLI&message=Python%20%7C%20uv&color=3776AB&style=flat-square&logo=python&logoColor=white)](./cli) [![Electron](https://img.shields.io/badge/GUI-Electron%20%7C%20React-47848F?style=flat-square&logo=electron&logoColor=white)](./ExiEdit)

---

## Projects

| Project                     | Focus                                                                                                                      | Stack                                   |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- |
| **[`cli/`](./cli)**         | Command-line utility to inspect and update photo timestamps (`DateTime`, `DateTimeOriginal`) with timezone offset support. | Python 3.13, Typer, Piexif, uv          |
| **[`ExiEdit/`](./ExiEdit)** | Desktop GUI to visually browse photo directories and manage EXIF metadata in an interactive grid view.                     | Electron, React 19, TypeScript, Mantine |

---

## Quick Start

Detailed setup and usage instructions are available in each subproject's README:

- **CLI** ([`cli/README.md`](./cli/README.md))
- **ExiEdit** ([`ExiEdit/README.md`](./ExiEdit/README.md))
