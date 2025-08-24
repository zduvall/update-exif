# EXIF Tool

A simple command-line tool to read and update EXIF metadata on photos, particularly for JPEG files.

## Requirements

- Python 3.13 or later
- [uv](https://github.com/astral-sh/uv) for package management

## Installation

1.  Ensure you have Python 3.13+ and `uv` installed.
2.  Clone the repository and navigate into the project directory.
3.  Create and activate a virtual environment:
    ```sh
    uv venv
    source .venv/bin/activate
    ```
    _Note: On Windows, the activation command is `.venv\Scripts\activate`_
4.  Install the project in editable mode:
    ```sh
    uv pip install -e .
    ```
    This will make the `exif` command available in your shell.

## Usage

The tool provides two main commands: `read` and `update`.

### Reading EXIF Data

To view the EXIF data of a photo:
```sh
exif read <path/to/photo.jpg>
```

### Updating EXIF Data

To update the 'date taken' information:
```sh
exif update <path/to/photo.jpg> "<YYYY:MM:DD HH:MM:SS>"
```

#### Example

```sh
exif update "images/IMG_1234.jpg" "2024:07:22 10:30:00"
```

You can get more information about any command and its arguments with `--help`:

```sh
exif read --help
exif update --help
```
